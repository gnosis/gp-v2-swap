import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components/macro'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { ChevronDown } from 'react-feather'
import { CurrencyAmount, Token } from '@uniswap/sdk-core'
import { Txt } from 'assets/styles/styled'
import CowProtocolLogo from 'components/CowProtocolLogo'
import { formatMax, formatSmart } from 'utils/format'
import { AMOUNT_PRECISION } from '@src/custom/constants'

type VCOWDropdownProps = {
  balance?: CurrencyAmount<Token>
}

export default function VCOWDropdown({ balance }: VCOWDropdownProps) {
  const [open, setOpen] = useState(false)
  const toggle = useCallback(() => setOpen((open) => !open), [])
  const node = useRef<HTMLDivElement>(null)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    <Wrapper ref={node}>
      <DropdownWrapper onClick={toggle}>
        <span style={{ marginRight: '2px' }}>
          <VCOWBalance>
            <CowProtocolLogo size={46} />
            <ProfileFlexCol>
              <Txt fs={14}>Balance</Txt>
              <Txt fs={18} title={`${formatMax(balance)} vCOW`}>
                <strong>
                  {formatSmart(balance, AMOUNT_PRECISION, { thousandSeparator: true, isLocaleAware: true }) ?? '0'} vCOW
                </strong>
              </Txt>
            </ProfileFlexCol>
          </VCOWBalance>
        </span>
        <ChevronDown size={16} style={{ marginTop: '2px' }} strokeWidth={2.5} />
      </DropdownWrapper>
      {open && <MenuFlyout>TOTAL BALANCE</MenuFlyout>}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  display: inline;
  margin-right: 0.4rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    justify-self: end;
  `};

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin: 0 0.5rem 0 0;
    width: initial;
    text-overflow: ellipsis;
    flex-shrink: 1;
  `};
`

const MenuFlyout = styled.span`
  background-color: ${({ theme }) => theme.bg4};
  border: 1px solid ${({ theme }) => theme.bg0};

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.3rem;
  display: flex;
  flex-direction: column;
  font-size: 1rem;
  position: absolute;
  right: 0;
  top: 4.5rem;
  z-index: 100;
  min-width: 300px;
  ${({ theme }) => theme.mediaWidth.upToMedium`;
    min-width: 145px
  `};

  > {
    padding: 12px;
  }
`
/* const MenuItem = css`
  align-items: center;
  background-color: transparent;
  border-radius: 12px;
  color: ${({ theme }) => theme.text2};
  cursor: pointer;
  display: flex;
  flex: 1;
  flex-direction: row;
  font-size: 16px;
  font-weight: 400;
  justify-content: start;
  :hover {
    text-decoration: none;
  }
` */

export const DropdownWrapper = styled.button`
  align-items: center;
  /*  background-color: ${({ theme }) => theme.bg4}; */
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.bg0};
  color: ${({ theme }) => theme.text1};
  display: inline-flex;
  flex-direction: row;
  font-weight: 700;
  font-size: 12px;
  height: 100%;
  margin: 0 0.4rem;
  padding: 0.2rem 0.4rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    border: 1px solid ${({ theme }) => theme.bg3};
  }
`

export const VCOWBalance = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  min-width: 215px;
  height: 56px;
  justify-content: center;
  border-radius: 12px;
  padding: 8px;
  ${({ theme }) => theme.neumorphism.boxShadow};
  background-color: ${({ theme }) => theme.bg7};
`

export const ProfileFlexCol = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  flex-direction: column;

  span {
    padding: 0 8px;
  }
`