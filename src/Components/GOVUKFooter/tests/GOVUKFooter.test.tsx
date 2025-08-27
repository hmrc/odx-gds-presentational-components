import React from 'react'
import { cleanup, render, screen } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import '@testing-library/jest-dom'
import GOVUKFooter from '../GOVUKFooter'
import { FooterColumn, LicenceStatement } from '../GOVUKFooter.types'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const contentWithSimpleLinks: FooterColumn[] = [
  {
    links: [
      { linkText: 'Link 1', linkHref: '/link1' },
      { linkText: 'Link 2', linkHref: '/link2' },
      { linkText: 'Link 3', linkHref: '/link3' }
    ]
  }
]

const contentWithSecondaryNavigation: FooterColumn[] = [
  {
    header: 'Column One',
    columnClass: 'govuk-grid-column-two-thirds',
    listClass: 'govuk-footer__list--columns-2',
    links: [
      { linkText: 'Link 1', linkHref: '/link1' },
      { linkText: 'Link 2', linkHref: '/link2' },
      { linkText: 'Link 3', linkHref: '/link3' },
      { linkText: 'Link 4', linkHref: '/link4' },
      { linkText: 'Link 5', linkHref: '/link5' },
      { linkText: 'Link 6', linkHref: '/link6' }
    ]
  },
  {
    header: 'Column Two',
    columnClass: 'govuk-grid-column-one-third',
    links: [
      { linkText: 'Link 7', linkHref: '/link7' },
      { linkText: 'Link 8', linkHref: '/link8' },
      { linkText: 'Link 9', linkHref: '/link9' }
    ]
  }
]

const licence: LicenceStatement = {
  textStart: 'All content is available under the ',
  linkText: 'Open Government Licence v3.0, ',
  linkHref: '/link',
  textEnd: 'except where otherwise stated'
}

const supportText = 'Support links'
const copyrightText = '© Crown copyright'
const newTabtext = 'Opens link in a new tab'

/****************
 * SNAPSHOTS AND AXE
 ****************/
snapshotAndAxeTest(
  'Default footer Snapshot',
  <GOVUKFooter
    licenceDeclaration={licence}
    copyrightLinkText={copyrightText}
    opensInNewTabText={newTabtext}
    brandRefresh={false}
  />
)

snapshotAndAxeTest(
  'Footer with simple links Snapshot',
  <GOVUKFooter
    footerContent={contentWithSimpleLinks}
    licenceDeclaration={licence}
    supportLinksText={supportText}
    copyrightLinkText={copyrightText}
    opensInNewTabText={newTabtext}
    brandRefresh={false}
  />
)

snapshotAndAxeTest(
  'Footer with secondary navigation Snapshot',
  <GOVUKFooter
    footerContent={contentWithSecondaryNavigation}
    licenceDeclaration={licence}
    copyrightLinkText={copyrightText}
    opensInNewTabText={newTabtext}
    brandRefresh={false}
  />
)

/****************
 * ASSERTIONS
 ****************/

describe('Given that I am using the GDS Footer component', () => {
  describe('when no footerContent is passed', () => {
    it('should not render any footer content links', () => {
      render(
        <GOVUKFooter
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      const footerContentSection = screen.queryByTestId('footer-content')
      expect(footerContentSection).toBeNull()
    })
  })

  describe('when rendering with simple links', () => {
    it('should display the links in an inline list', () => {
      render(
        <GOVUKFooter
          footerContent={contentWithSimpleLinks}
          licenceDeclaration={licence}
          supportLinksText={supportText}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      contentWithSimpleLinks[0].links.forEach(link => {
        const linkElement = screen.getByText(link.linkText)
        expect(linkElement).toBeInTheDocument()
        expect(linkElement).toHaveAttribute('href', link.linkHref)
        expect(linkElement).toHaveClass('govuk-footer__link')
      })
    })
  })

  describe('when rendering with secondary navigation', () => {
    it('should display the links in columns with headers', () => {
      render(
        <GOVUKFooter
          footerContent={contentWithSecondaryNavigation}
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      contentWithSecondaryNavigation.forEach(content => {
        if (content.header !== undefined) {
          const headerElement = screen.getByText(content.header)
          expect(headerElement).toBeInTheDocument()
          expect(headerElement).toHaveClass('govuk-footer__heading govuk-heading-m')
        }
      })

      contentWithSecondaryNavigation.forEach(content => {
        content.links.forEach(link => {
          const linkElement = screen.getByText(link.linkText)
          expect(linkElement).toBeInTheDocument()
          expect(linkElement).toHaveAttribute('href', link.linkHref)
          expect(linkElement).toHaveClass('govuk-footer__link')
        })
      })
    })
  })

  describe('when brandRefresh is set to false', () => {
    it('should not display the crown logo', () => {
      render(
        <GOVUKFooter
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      const crownLogo = screen.queryByRole('presentation')
      expect(crownLogo).not.toBeInTheDocument()
    })
  })

  describe('when brandRefresh is set to true', () => {
    it('should display the crown logo', () => {
      render(
        <GOVUKFooter
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh
        />
      )

      const crownLogo = screen.queryByRole('presentation')
      expect(crownLogo).toBeInTheDocument()
    })
  })

  describe('when rendering the licensing statement', () => {
    it('should display the licensing text and link', () => {
      render(
        <GOVUKFooter
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      // Check the licensing textStart and textEnd within the span
      const licenceDescription = screen.getByText((content, element) => {
        return (
          element?.tagName === 'SPAN' &&
                    content.includes(licence.textStart) &&
                    content.includes(licence.textEnd)
        )
      })
      expect(licenceDescription).toBeInTheDocument()

      // Check the licensing link specifically
      const licenceLink = screen.getByRole('link', { name: licence.linkText.trim() })
      expect(licenceLink).toBeInTheDocument()
      expect(licenceLink).toHaveAttribute('href', licence.linkHref)
      expect(licenceLink).toHaveClass('govuk-footer__link')
    })
  })

  describe('when supportLinksText is not passed', () => {
    it('should not render the visually hidden header', () => {
      render(
        <GOVUKFooter
          footerContent={contentWithSimpleLinks}
          licenceDeclaration={licence}
          copyrightLinkText={copyrightText}
          opensInNewTabText={newTabtext}
          brandRefresh={false}
        />
      )

      const hiddenHeader = screen.queryByText(supportText)
      expect(hiddenHeader).toBeNull()
    })
  })
})
