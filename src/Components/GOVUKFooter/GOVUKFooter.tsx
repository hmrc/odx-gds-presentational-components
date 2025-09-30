import React, { FC } from 'react'
import { FooterProps, FooterColumn } from './GOVUKFooter.types'
import CrownLogo from '../Icons/CrownLogo'
import OpenGovernmentLicenceLogo from '../Icons/OpenGovernmentLicenceLogo'

const GOVUKFooter: FC<FooterProps> = (props: FooterProps) => {
  const { footerContent, licenceDeclaration, supportLinksText, copyrightLinkText, opensInNewTabText, brandRefresh } = props

  // if user does not need secondary navigation functionality
  const renderSimpleLinks = (footerContent: FooterColumn[], supportLinksText: string, opensInNewTabText: string): JSX.Element => (
    <div className='govuk-footer__meta-item govuk-footer__meta-item--grow' data-testid='footer-content'>
      {supportLinksText !== undefined ? <h2 className='govuk-visually-hidden'>{supportLinksText}</h2> : null}
      <ul className='govuk-footer__inline-list'>
        {footerContent.map((content, index) =>
          content.links.map((link, linkIndex) => (
            <li key={`${index}-${linkIndex}`} className='govuk-footer__inline-list-item'>
              <a
                href={link.linkHref}
                className='govuk-footer__link'
                target='_blank'
                rel='noreferrer noopener'
              >
                {link.linkText}
                <span className='govuk-visually-hidden'>{opensInNewTabText}</span>
              </a>
            </li>
          ))
        )}
      </ul>
    </div>
  )

  const renderSecondaryNavigation = (footerContent: FooterColumn[], opensInNewTabText: string): JSX.Element => (
    <div className='govuk-footer__navigation' data-testid='footer-content'>
      {footerContent.map((content, index) => (
        <div key={index} className={`govuk-footer__section ${content.columnClass ?? ''}`}>
          <h2 className='govuk-footer__heading govuk-heading-m'>{content.header}</h2>
          <ul className={`govuk-footer__list ${content.listClass ?? ''}`}>
            {content.links.map((link, linkIndex) => (
              <li key={linkIndex} className='govuk-footer__list-item'>
                <a
                  href={link.linkHref}
                  className='govuk-footer__link'
                  target='_blank'
                  rel='noreferrer noopener'
                >
                  {link.linkText}
                  <span className='govuk-visually-hidden'>{opensInNewTabText}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )

  return (
    <footer className='govuk-footer ' role='contentinfo'>
      <div className='govuk-width-container '>
        {brandRefresh ? <CrownLogo /> : ''}

        <div className='govuk-footer__meta'>
          <div className='govuk-footer__meta-item govuk-footer__meta-item--grow'>
            {(footerContent != null) && (
              <>
                {footerContent.some(content => content.columnClass)
                  ? (
                    <>
                      {renderSecondaryNavigation(footerContent, opensInNewTabText)}
                      <hr className='govuk-footer__section-break' />
                    </>
                    )
                  : renderSimpleLinks(footerContent, (supportLinksText ?? ''), opensInNewTabText)}
              </>
            )}
            <OpenGovernmentLicenceLogo />
            <span className='govuk-footer__licence-description'>
              {licenceDeclaration.textStart}
              <a
                className='govuk-footer__link'
                href={licenceDeclaration.linkHref}
                rel='license'
              >
                {licenceDeclaration.linkText}
              </a>
              {licenceDeclaration.textEnd}
            </span>
          </div>
          <div className='govuk-footer__meta-item'>
            <a
              className='govuk-footer__link govuk-footer__copyright-logo'
              href='https://www.nationalarchives.gov.uk/information-management/re-using-public-sector-information/uk-government-licensing-framework/crown-copyright/'
              target='_blank'
              rel='noreferrer noopener'
            >
              {copyrightLinkText}
              <span className='govuk-visually-hidden'> {opensInNewTabText}</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default GOVUKFooter
