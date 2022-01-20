import { ClaimType } from 'state/claim/hooks'
import { calculatePercentage } from 'state/claim/hooks/utils'
import { TokenLogo, InvestAvailableBar } from 'pages/Claim/styled'
import { ClaimWithInvestmentData } from 'pages/Claim/types'
import CowProtocolLogo from 'components/CowProtocolLogo'
import { formatSmart } from 'utils/format'
import { ONE_HUNDRED_PERCENT } from 'constants/misc'
import { AMOUNT_PRECISION, PERCENTAGE_PRECISION } from 'constants/index'

export type Props = { claim: ClaimWithInvestmentData }

export function InvestSummaryRow(props: Props): JSX.Element | null {
  const { claim } = props

  const { isFree, type, price, currencyAmount, vCowAmount, cost, investmentCost } = claim

  const symbol = isFree ? '' : (currencyAmount?.currency?.symbol as string)

  const formattedCost =
    formatSmart(investmentCost, AMOUNT_PRECISION, { thousandSeparator: true, isLocaleAware: true }) || '0'

  const percentage = investmentCost && cost && calculatePercentage(investmentCost, cost)
  const remainingPercentage = percentage && ONE_HUNDRED_PERCENT.subtract(percentage)

  return (
    <tr>
      <td>
        {isFree ? (
          <>
            <CowProtocolLogo size={42} />
            <span>
              <b>{ClaimType[type]}</b>
            </span>
          </>
        ) : (
          <>
            <TokenLogo symbol={symbol} size={42} />
            <CowProtocolLogo size={42} />
            <span>
              <b>Buy vCOW</b>
              <i>with {symbol}</i>
            </span>
          </>
        )}
      </td>

      <td>
        <i>{formatSmart(vCowAmount) || '0'} vCOW</i>

        {!isFree && (
          <span>
            <b>Investment amount:</b>{' '}
            <i>
              {formattedCost} {symbol}
            </i>
            <InvestAvailableBar percentage={Number(percentage?.toFixed(2))} />
            {percentage?.lessThan(ONE_HUNDRED_PERCENT) && (
              <small>
                Note: You <b>will not be able</b> to invest the remaining{' '}
                {formatSmart(remainingPercentage, PERCENTAGE_PRECISION) || '0'}% after claiming.
              </small>
            )}
          </span>
        )}
      </td>

      <td>
        {!isFree && (
          <span>
            <b>Price:</b>{' '}
            <i>
              {formatSmart(price) || '0'} vCoW per {symbol}
            </i>
          </span>
        )}
        <span>
          <b>Cost:</b> <i>{isFree ? 'Free!' : `${formattedCost} ${symbol}`}</i>
        </span>
        <span>
          <b>Vesting:</b>
          <i>{type === ClaimType.Airdrop ? 'No' : '4 years (linear)'}</i>
        </span>
      </td>
    </tr>
  )
}
