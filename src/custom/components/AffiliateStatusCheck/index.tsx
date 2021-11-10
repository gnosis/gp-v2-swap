import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useActiveWeb3React } from 'hooks/web3'
import NotificationBanner from 'components/NotificationBanner'
import { useReferralAddress, useResetReferralAddress, useUploadReferralDocAndSetDataHash } from 'state/affiliate/hooks'
import { useAppDispatch } from 'state/hooks'
import { hasTrades } from 'utils/trade'
import { retry, RetryOptions } from 'utils/retry'
import { SupportedChainId } from 'constants/chains'
import useParseReferralQueryParam from 'hooks/useParseReferralQueryParam'
import useRecentActivity from 'hooks/useRecentActivity'
import { OrderStatus } from 'state/orders/actions'

type AffiliateStatus = 'NOT_CONNECTED' | 'OWN_LINK' | 'ALREADY_TRADED' | 'ACTIVE' | 'UNSUPPORTED_NETWORK'

const STATUS_TO_MESSAGE_MAPPING: Record<AffiliateStatus, string> = {
  NOT_CONNECTED: 'Affiliate program: Please connect your wallet to participate.',
  OWN_LINK:
    'Affiliate program: Your affiliate code works! Any new user following this link would credit you their trading volume.',
  ALREADY_TRADED:
    'Invalid affiliate code: The currently connected wallet has traded before or is already part of the affiliate program.',
  ACTIVE: 'Valid affiliate code: You can now do your first trade to join the program.',
  UNSUPPORTED_NETWORK: 'Affiliate program: Only Mainnet is supported. Please change the network to participate.',
}

const DEFAULT_RETRY_OPTIONS: RetryOptions = { n: 3, minWait: 1000, maxWait: 3000 }

export default function AffiliateStatusCheck() {
  const appDispatch = useAppDispatch()
  const resetReferralAddress = useResetReferralAddress()
  const uploadReferralDocAndSetDataHash = useUploadReferralDocAndSetDataHash()
  const history = useHistory()
  const location = useLocation()
  const { account, chainId } = useActiveWeb3React()
  const referralAddress = useReferralAddress()
  const referralAddressQueryParam = useParseReferralQueryParam()
  const allRecentActivity = useRecentActivity()
  const [affiliateState, setAffiliateState] = useState<AffiliateStatus | null>()
  const [error, setError] = useState('')
  const isFirstTrade = useRef(false)
  const fulfilledActivity = allRecentActivity.filter((data) => data.status === OrderStatus.FULFILLED)

  const uploadDataDoc = useCallback(async () => {
    if (!chainId || !account || !referralAddress) {
      return
    }

    if (!referralAddress.isValid) {
      setError('The referral address is invalid.')
      return
    }

    if (fulfilledActivity.length >= 1 && isFirstTrade.current) {
      console.log('Entro')
      setAffiliateState(null)
      resetReferralAddress()
      isFirstTrade.current = false
      return
    }

    try {
      // we first validate that the user hasn't already traded
      const userHasTrades = await retry(() => hasTrades(chainId, account), DEFAULT_RETRY_OPTIONS).promise
      if (userHasTrades) {
        setAffiliateState('ALREADY_TRADED')
        return
      }
    } catch (error) {
      console.error(error)
      setError('There was an error validating existing trades. Please try again later.')
      return
    }

    try {
      await retry(() => uploadReferralDocAndSetDataHash(referralAddress.value), DEFAULT_RETRY_OPTIONS).promise

      setAffiliateState('ACTIVE')
      isFirstTrade.current = true
    } catch (error) {
      console.error(error)
      setError('There was an error while uploading the referral document to IPFS. Please try again later.')
    }
  }, [
    chainId,
    account,
    referralAddress,
    resetReferralAddress,
    uploadReferralDocAndSetDataHash,
    fulfilledActivity.length,
  ])

  useEffect(() => {
    if (!referralAddress) {
      return
    }

    setAffiliateState(null)
    setError('')

    if (!account) {
      setAffiliateState('NOT_CONNECTED')
      return
    }

    if (chainId !== SupportedChainId.MAINNET) {
      setAffiliateState('UNSUPPORTED_NETWORK')
      return
    }

    if (referralAddress.value === account) {
      // clean-up saved referral address if the user follows its own referral link
      setAffiliateState('OWN_LINK')

      if (referralAddressQueryParam) {
        history.push('/profile' + location.search)
      }
      return
    }

    uploadDataDoc()
  }, [
    referralAddress,
    account,
    history,
    chainId,
    appDispatch,
    uploadDataDoc,
    resetReferralAddress,
    location.search,
    referralAddressQueryParam,
  ])

  if (error) {
    return (
      <NotificationBanner isVisible changeOnProp={account} level="error">
        Affiliate program error: {error}
      </NotificationBanner>
    )
  }

  if (affiliateState) {
    return (
      <NotificationBanner isVisible changeOnProp={account} level="info">
        {STATUS_TO_MESSAGE_MAPPING[affiliateState]}
      </NotificationBanner>
    )
  }

  return null
}
