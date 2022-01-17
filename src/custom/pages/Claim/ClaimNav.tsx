import { useMemo } from 'react'
import { ButtonSecondary } from 'components/Button'
import { shortenAddress } from 'utils'
import { TopNav, ClaimAccount, ClaimAccountButtons } from './styled'
import { ClaimCommonTypes } from './types'
import { useClaimDispatchers, useClaimState } from 'state/claim/hooks'
import { ClaimStatus } from 'state/claim/actions'
import Identicon from 'components/Identicon'

type ClaimNavProps = Pick<ClaimCommonTypes, 'account' | 'handleChangeAccount'>

export default function ClaimNav({ account, handleChangeAccount }: ClaimNavProps) {
  const { activeClaimAccount, activeClaimAccountENS, claimStatus, investFlowStep } = useClaimState()
  const { setActiveClaimAccount } = useClaimDispatchers()

  const isAttempting = useMemo(() => claimStatus === ClaimStatus.ATTEMPTING, [claimStatus])

  if (!activeClaimAccount) return null

  return (
    <TopNav>
      <ClaimAccount>
        <div>
          <Identicon account={activeClaimAccount} size={46} />
          <p>{activeClaimAccountENS ? activeClaimAccountENS : shortenAddress(activeClaimAccount)}</p>
        </div>

        <ClaimAccountButtons>
          {!!account && account !== activeClaimAccount && (
            <ButtonSecondary disabled={isAttempting} onClick={() => setActiveClaimAccount(account)}>
              Change account to connected wallet
            </ButtonSecondary>
          )}

          {investFlowStep < 2 && (
            <ButtonSecondary disabled={isAttempting} onClick={handleChangeAccount}>
              Change account
            </ButtonSecondary>
          )}
        </ClaimAccountButtons>
      </ClaimAccount>
    </TopNav>
  )
}
