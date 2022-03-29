import { ExternalLink as ExternalLinkTheme } from 'theme'
import styled from 'styled-components/macro'
import { Content } from 'components/Page'
import { transparentize } from 'polished'

export const ExternalLinkFaq = styled(ExternalLinkTheme)`
  color: ${({ theme }) => theme.text1};
  text-decoration: underline;
  font-weight: normal;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: ${({ theme }) => theme.textLink};
  }
`

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 160px auto;
  flex-direction: column;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: flex;
    flex-flow: column wrap;
  `}

  #table-container {
    margin: auto;
    max-width: 100%;

    > table {
      width: 100%;
      border-spacing: 1px;
      color: ${({ theme }) => theme.text1};

      > thead {
        background: ${({ theme }) => theme.tableHeadBG};
      }

      > tbody > tr {
        background: ${({ theme }) => theme.tableRowBG};
      }

      > tbody > tr > td > span[role='img'] {
        font-size: 18px;
      }

      th,
      td {
        text-align: left;
        padding: 6px 12px;

        &:not(:first-child) {
          text-align: center;
        }
      }

      th {
        padding: 16px 12px;
      }
    }
  }

  h2 {
    color: ${({ theme }) => theme.primary1};
  }

  > div:not(:first-child) {
    margin: 2rem 0;
  }

  ${Content} {
    > div > ul {
      margin: 12px 0 24px;
      padding: 0 0 0 20px;
      color: ${({ theme }) => theme.primary1};
      line-height: 1.2;
    }

    > div > ul > li {
      margin: 0 0 12px;
    }

    > h3 {
      margin: 0;

      ::before {
        border-top: none;
      }
    }
  }

  ol > li {
    margin-bottom: 0.5rem;
  }
`

export const PageIndex = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-bottom: 1px solid ${({ theme }) => theme.text1};
`

export const Menu = styled.div`
  display: flex;
  flex-flow: column wrap;
  font-size: 16px;
  font-weight: bold;
  line-height: 1;
  margin: 0 24px 0 0;
  color: ${({ theme }) => theme.text1};
  height: max-content;
  position: sticky;
  top: 0;
  width: 100%;
  padding: 38px 0 0;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
    position: relative;
  `}

  > ul {
    display: flex;
    flex-flow: column wrap;
    list-style: none;
    margin: 0;
    padding: 0;
    font-size: inherit;

    &.expanded {
    }
  }

  > ul > li {
    width: 100%;
  }

  > ul > li > a {
    margin: 4px 0;
    padding: 12px;
    border-radius: 6px;
    width: 100%;
    text-decoration: none;
    color: inherit;
    opacity: 0.65;
    transition: opacity 0.2s ease-in-out;
    display: block;

    &:hover,
    &.active {
      opacity: 1;
    }
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    > ul.expanded {
      background: ${({ theme }) => transparentize(0.9, theme.text1)};
      border-radius: 16px;
      padding: 24px 48px 24px 24px;
    }

    > ul:not(.expanded) > li > a:not(.active) {
      display: none;
    }

    > ul:not(.expanded) > li > a.active {
      display: flex;
      font-size: 18px;
      flex-flow: column wrap;
      justify-content: center;
      align-items: flex-start;
      background: ${({ theme }) => transparentize(0.9, theme.text1)};
      border-radius: 16px;
      padding: 24px 48px 24px 24px;
      position: relative;

      &::before {
        content: "FAQ";
        display: block;
        font-size: 14px;
        text-transform: uppercase;
        margin: 0 0 4px;
        font-weight: normal;
        opacity: 0.65;
      }

      &::after {
        content: "+";
        position: absolute;
        right: 24px;
        font-size: 32px;
      }
    }
  `}
`
