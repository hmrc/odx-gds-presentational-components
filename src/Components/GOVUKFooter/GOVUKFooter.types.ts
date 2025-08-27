export interface FooterProps {
  /** Content to be displayed in the footer, including links and optional headers/columns */
  footerContent?: FooterColumn[]

  /** The licencing statement to be displayed for the service. */
  licenceDeclaration: LicenceStatement

  /** Hidden text to be displayed above links rendered in a simple list */
  supportLinksText?: string

  /** Text to be displayed with Crown copyright link */
  copyrightLinkText: string

  /** Hidden text to be displayed with links that open in a new tab. Needed for accessibility */
  opensInNewTabText: string

  /** Controls whether the new crown logo is displayed or not */
  brandRefresh: boolean
}

export interface FooterColumn {
  header?: string
  columnClass?: string
  listClass?: string
  links: FooterLinks[]
}

interface FooterLinks {
  linkText: string
  linkHref: string
}

export interface LicenceStatement {
  textStart: string
  linkText: string
  linkHref: string
  textEnd: string
}
