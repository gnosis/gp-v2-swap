import { Trans } from '@lingui/macro'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { CurrencyAmount, Currency, Percent, TradeType } from '@uniswap/sdk-core'

import { Field } from 'state/swap/actions'
import { TYPE } from 'theme'
import { computeSlippageAdjustedAmounts } from 'utils/prices'
import { getMinimumReceivedTooltip } from 'utils/tooltips'

import { AutoColumn } from 'components/Column'
import QuestionHelper from 'components/QuestionHelper'
import { RowBetween, RowFixed } from 'components/Row'
import TradeGp from 'state/swap/TradeGp'
import { DEFAULT_PRECISION } from 'constants/index'

// computes price breakdown for the trade
export function computeTradePriceBreakdown(trade?: TradeGp | null): {
  /*priceImpactWithoutFee: Percent | undefined;*/ realizedFee: CurrencyAmount<Currency> | undefined | null
} {
  // This is needed because we are using Uniswap pools for the price calculation,
  // thus, we need to account for the LP fees the same way as Uniswap does.
  // const { priceImpactWithoutFee } = computeTradePriceBreakdownUni(trade)

  return {
    // priceImpactWithoutFee,
    realizedFee:
      trade?.tradeType === TradeType.EXACT_INPUT
        ? trade?.outputAmountWithoutFee?.subtract(trade.outputAmount)
        : trade?.fee?.feeAsCurrency,
  }
}

export const FEE_TOOLTIP_MSG =
  'On CowSwap you sign your order (hence no gas costs!). The fees are covering your gas costs already.'

export default function TradeSummary({ trade, allowedSlippage }: { trade: TradeGp; allowedSlippage: Percent }) {
  const theme = useContext(ThemeContext)
  // const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const { /*priceImpactWithoutFee,*/ realizedFee } = React.useMemo(() => computeTradePriceBreakdown(trade), [trade])
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)

  return (
    <AutoColumn gap="8px">
      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={12} fontWeight={400} color={theme.text2}>
            {/* Liquidity Provider Fee */}
            Fee
          </TYPE.black>
          <QuestionHelper text={FEE_TOOLTIP_MSG} />
        </RowFixed>
        <TYPE.black textAlign="right" fontSize={12} color={theme.text1}>
          {realizedFee ? `${realizedFee.toSignificant(DEFAULT_PRECISION)} ${realizedFee.currency.symbol}` : '-'}
        </TYPE.black>
      </RowBetween>

      {/* <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={12} fontWeight={400} color={theme.text2}>
              <Trans>Route</Trans>
            </TYPE.black>
          </RowFixed>
          <TYPE.black textAlign="right" fontSize={12} color={theme.text1}>
            <SwapRoute trade={trade} />
          </TYPE.black>
        </RowBetween> */}

      {/* <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={12} fontWeight={400} color={theme.text2}>
              <Trans>Price Impact</Trans>
            </TYPE.black>
          </RowFixed>
          <TYPE.black textAlign="right" fontSize={12} color={theme.text1}>
            <FormattedPriceImpact priceImpact={priceImpact} />
          </TYPE.black>
        </RowBetween> */}

      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={12} fontWeight={400} color={theme.text2}>
            {trade.tradeType === TradeType.EXACT_INPUT ? <Trans>Minimum received</Trans> : <Trans>Maximum sent</Trans>}
          </TYPE.black>
          <QuestionHelper text={getMinimumReceivedTooltip(allowedSlippage, isExactIn)} />
        </RowFixed>

        <TYPE.black textAlign="right" fontSize={12} color={theme.text1}>
          {/* {trade.tradeType === TradeType.EXACT_INPUT
                ? `${trade.minimumAmountOut(allowedSlippage).toSignificant(6)} ${trade.outputAmount.currency.symbol}`
                : `${trade.maximumAmountIn(allowedSlippage).toSignificant(6)} ${trade.inputAmount.currency.symbol}`} */}
          {isExactIn
            ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(DEFAULT_PRECISION)} ${
                trade.outputAmount.currency.symbol
              }` ?? '-'
            : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(DEFAULT_PRECISION)} ${
                trade.inputAmount.currency.symbol
              }` ?? '-'}
        </TYPE.black>
      </RowBetween>

      <RowBetween>
        <RowFixed>
          <TYPE.black fontSize={12} fontWeight={400} color={theme.text2}>
            <Trans>Slippage tolerance</Trans>
          </TYPE.black>
        </RowFixed>
        <TYPE.black textAlign="right" fontSize={12} color={theme.text1}>
          {allowedSlippage.toFixed(2)}%
        </TYPE.black>
      </RowBetween>
    </AutoColumn>
  )
}
