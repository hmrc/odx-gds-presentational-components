import { MouseEventHandler, ReactElement } from 'react'

export default interface CookieBannerProps {
  /** [optional] Defines the text shown in the heading, a prefix to service name, default to 'Cookies on' */
  headingText?: string

  /** Defines the text shown in the header */
  serviceName: string

  /** Description shown when no action has been taken */
  standardDescription: ReactElement

  /** Description shown when the accept button has been clicked */
  acceptedDescription: ReactElement

  /** Description shown when the reject button has been clicked */
  rejectedDescription: ReactElement

  /** Function called when the accept button is click  (Setting REACT state is handled by the component) */
  acceptedHandler: MouseEventHandler<HTMLButtonElement>

  /** Function called when the reject button is click  (Setting REACT state is handled by the component) */
  rejectedHandler: MouseEventHandler<HTMLButtonElement>

  /** Text to show on the accept button */
  acceptButtonText: string

  /** Text to show on the reject button */
  rejectButtonText: string

  /** [optional] Text to show on the hide cookie message button */
  hideCookieButtonText?: string

  /** href to pass to the view cookies link */
  cookieLink: string

  /** [optional] Text to show on the view cookies link, default to 'View cookies' */
  cookieLinkText?: string
}
