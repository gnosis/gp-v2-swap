import React from 'react'
import styled from 'styled-components'
import { ExternalLink, TYPE } from 'theme'

import { version as WEB } from '@src/../package.json'
import { version as CONTRACTS } from '@gnosis.pm/gp-v2-contracts/package.json'
import { ChainId } from '@uniswap/sdk'
import { getEtherscanLink } from 'utils'
import { GP_ALLOWANCE_MANAGER_CONTRACT_ADDRESS, GP_SETTLEMENT_CONTRACT_ADDRESS } from 'constants/index'
import { DEFAULT_NETWORK_FOR_LISTS } from 'constants/lists'
import { useActiveWeb3React } from 'hooks'

import github from 'assets/external/github-logo.png'
import etherscan from 'assets/external/etherscan-logo.svg'

function _getContractsUrls(chainId: ChainId, contractAddressMap: typeof GP_SETTLEMENT_CONTRACT_ADDRESS) {
  const contractAddress = contractAddressMap[chainId]
  if (!contractAddress) return '-'
  return getEtherscanLink(chainId, contractAddress, 'address')
}

const LOGO_MAP = {
  github,
  etherscan
}

const VERSIONS: Record<
  string,
  { version: string; href: (chainId: ChainId) => string | { github: string; etherscan: string } }
> = {
  Web: {
    version: 'v' + WEB,
    href() {
      return 'https://github.com/gnosis/gp-swap-ui'
    }
  },
  'Allowance manager contract': {
    version: 'v' + CONTRACTS,
    href(chainId: ChainId) {
      return {
        etherscan: _getContractsUrls(chainId, GP_ALLOWANCE_MANAGER_CONTRACT_ADDRESS),
        github: 'https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/GPv2AllowanceManager.sol'
      }
    }
  },
  'Settlement contract': {
    version: 'v' + CONTRACTS,
    href(chainId: ChainId) {
      return {
        etherscan: _getContractsUrls(chainId, GP_SETTLEMENT_CONTRACT_ADDRESS),
        github: 'https://github.com/gnosis/gp-v2-contracts/blob/main/src/contracts/GPv2Settlement.sol'
      }
    }
  }
}

const versionsList = Object.keys(VERSIONS)

const StyledPolling = styled.div`
  position: fixed;
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  // gap: 0.5rem;

  left: 0;
  bottom: 0;

  padding: 1rem;

  color: ${({ theme }) => theme.version};
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }

  transition: opacity 0.25s ease;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: none;
  `}
`

const VersionsExternalLink = styled(ExternalLink)<{ isUnclickable?: boolean }>`
  ${({ isUnclickable = false }): string | false =>
    isUnclickable &&
    `
      pointer-events: none;
      cursor: none;
  `}
`

const VersionsLinkWrapper = styled(TYPE.small)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const LogoWrapper = styled.img`
  max-width: 1rem;
  margin-left: 0.5rem;
`

const Version = () => {
  const { chainId = DEFAULT_NETWORK_FOR_LISTS } = useActiveWeb3React()
  return (
    <StyledPolling>
      {/* it's hardcoded anyways */}
      {versionsList.map(key => {
        const { href, version } = VERSIONS[key]

        const chainHref = href(chainId)

        return (
          <VersionsLinkWrapper key={key}>
            <strong>{key}</strong>: {version}
            {typeof chainHref === 'string' ? (
              <VersionsExternalLink href={chainHref}>
                <LogoWrapper src={github} />
              </VersionsExternalLink>
            ) : (
              Object.keys(chainHref).map((item, index) => (
                <VersionsExternalLink key={item + '_' + index} href={chainHref[item as 'github' | 'etherscan']}>
                  <LogoWrapper src={LOGO_MAP[item as 'github' | 'etherscan']} />
                </VersionsExternalLink>
              ))
            )}
          </VersionsLinkWrapper>
        )
      })}
    </StyledPolling>
  )
}

export default Version
