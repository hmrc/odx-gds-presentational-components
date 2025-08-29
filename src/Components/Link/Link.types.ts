import { AnchorHTMLAttributes } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  // When false, will not show the links visited state. Defaults to true
  showVisitedState?: Boolean
  // When true, renders the link in white, useful if rendering against a dark background
  invertColour?: Boolean
  // When true, will apply suggested attributes to reduce the risk of 'reverse tabnabbing'
  opensInNewTab?: Boolean
  // When true, will render link without the underline
  noUnderline?: Boolean
}
