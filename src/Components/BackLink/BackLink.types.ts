import { MouseEventHandler } from 'react'

export interface BackLinkProps {
  text: string
  inverse?: boolean
  href?: string | URL
  handleBackLink?: MouseEventHandler<HTMLAnchorElement>
}

export class InvalidHrefError extends Error {
  constructor (message = 'Invalid URL provided. A valid URL must be provided.') {
    super(message)
    this.name = 'InvalidHrefError'
  }
}

export class ValidatedBackLinkProps {
  readonly text: string
  readonly inverse: boolean
  readonly href: string
  readonly handleBackLink?: MouseEventHandler<HTMLAnchorElement>

  constructor (props: BackLinkProps) {
    this.text = props.text
    this.inverse = props.inverse ?? false
    this.handleBackLink = props.handleBackLink
    this.href = this.resolveHref(props.href)
  }

  private resolveHref (value?: string | URL): string {
    if (value === undefined || value === '#') {
      return '#'
    }
    try {
      const url = typeof value === 'string' ? new URL(value) : value
      return url.toString()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      throw new Error(
        `Invalid URL provided. A valid URL must be provided. Original error: ${errorMessage}`
      )
    }
  }
}
