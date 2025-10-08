
export interface SecondaryNavigationItems {
  text: string
  href: string
  current?: boolean
  classes?: string
  handleClick?: React.MouseEventHandler<HTMLAnchorElement>
}

export interface SecondaryNavigationProps {
  items: SecondaryNavigationItems[]
  labelledBy?: string
  visuallyHiddenTitle?: string
  classes?: string
  attributes?: React.HTMLAttributes<HTMLElement>
}

export const DEFAULT_TITLE = 'Secondary menu'
