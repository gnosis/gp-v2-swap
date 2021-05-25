import React from 'react'
import { Code, MessageCircle /*PieChart*/ } from 'react-feather'

import MenuMod, { MenuItem, InternalMenuItem, MenuFlyout as MenuFlyoutUni, StyledMenuButton } from './MenuMod'
import { useCloseModals, useToggleModal } from 'state/application/hooks'
import styled from 'styled-components'
import { Separator as SeparatorBase } from 'components/swap/styleds'
import { CONTRACTS_CODE_LINK, DISCORD_LINK } from 'constants/index'

import { ApplicationModal } from '@src/state/application/actions'

export const StyledMenu = styled(MenuMod)`
  hr {
    margin: 15px 0;
  }
`

export const MenuButton = styled.button`
  color: ${({ theme }) => theme.text2};
  background: none;
  border: none;
  font-size: 1rem;
  text-align: left;

  font-weight: 500;

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }

  :hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
    background: #afcbda;
    border-radius: 6px;
  }
`

const Policy = styled(InternalMenuItem).attrs(attrs => ({
  ...attrs,
  target: '_blank'
}))`
  font-size: 0.8em;
  text-decoration: underline;
`

const MenuFlyout = styled(MenuFlyoutUni)`
  min-width: 11rem;
  box-shadow: 0 0 100vh 100vw rgb(0 0 0 / 25%);
  top: calc(100% + 16px);
  order: 1;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: initial;
    bottom: calc(100% + 32px);
  `}

  ${({ theme }) => theme.mediaWidth.upToSmall`
    top: 0;
    left: 0;
    position: fixed;
    height: 100vh;
    width: 100vw;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    overflow-y: auto;
  `};

  > a {
    transition: background 0.2s ease-in-out;
    display: flex;
    align-items: center;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      flex: 0 1 auto;
      padding: 16px;
      font-size: 18px;
        svg {
          width: 18px;
          height: 18px;
          object-fit: contain;
          margin: 0 8px 0 0;
        }
    `};

    > span {
      display: flex;
      align-items: center;
    }

    > span > svg {
      margin: 0 8px 0 0;
    }
  }
  > a:hover {
    background: ${({ theme }) => theme.disabled};
    border-radius: 6px;
  }
`

export const Separator = styled(SeparatorBase)`
  background-color: ${({ theme }) => theme.disabled};
  margin: 0.3rem auto;
  width: 90%;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: 100%;
    margin: 24px auto;
  `};
`

export const CloseMenu = styled.button`
  display: grid;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.disabled};
  border: 0;
  color: ${({ theme }) => theme.black};
  height: 36px;
  position: sticky;
  top: 0;
  cursor: pointer;
  border-radius: 6px;
  justify-content: center;
  padding: 0;
  margin: 0 0 8px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    height: 48px;
    border-radius: 0;
    justify-content: flex-end;
  `};

  &::after {
    content: '✕';
    display: block;
    font-size: 20px;
    margin: 0;

    ${({ theme }) => theme.mediaWidth.upToSmall`
      margin: 0 14px 0 0;
      font-size: 24px;
    `};
  }
`

export function Menu() {
  const close = useCloseModals()
  const openCowGameModal = useToggleModal(ApplicationModal.COW_GAME)

  return (
    <StyledMenu>
      <MenuFlyout>
        <CloseMenu onClick={close} />
        <InternalMenuItem to="/faq" onClick={close}>
          <Code size={14} />
          FAQ
        </InternalMenuItem>
        {/* <MenuItem id="link" href={DUNE_DASHBOARD_LINK}>
          <PieChart size={14} />
          Stats
        </MenuItem> */}
        <MenuItem id="link" href={CONTRACTS_CODE_LINK}>
          <span onClick={close}>
            <Code size={14} />
            Code
          </span>
        </MenuItem>
        <MenuItem id="link" href={DISCORD_LINK}>
          <span onClick={close}>
            <MessageCircle size={14} />
            Discord
          </span>
        </MenuItem>

        <MenuButton id="link" onClick={openCowGameModal}>
          <span onClick={close}>🐮 Game</span>
        </MenuButton>

        <Separator />
        <Policy to="/terms-and-conditions" onClick={close}>
          Terms and conditions
        </Policy>
        {/* 
        <Policy to="/privacy-policy">Privacy policy</Policy>
        <Policy to="/cookie-policy">Cookie policy</Policy> 
        */}
      </MenuFlyout>
    </StyledMenu>
  )
}

export default Menu
