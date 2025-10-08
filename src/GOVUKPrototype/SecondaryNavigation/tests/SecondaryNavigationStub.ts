import { SecondaryNavigationItems } from '../SecondaryNavigation.types'

const secondaryNavigationItemsDefault: SecondaryNavigationItems[] = [
  {
    text: 'Overview',
    href: '#',
    current: true,
    handleClick: () => {}
  },
  {
    text: 'Staff list',
    href: '#',
    handleClick: () => {}
  },
  {
    text: 'Projects',
    href: '#',
    handleClick: () => {}
  },
  {
    text: 'Settings',
    href: '#',
    handleClick: () => {}
  }
]

const secondaryNavigationItemsWithClasses: SecondaryNavigationItems[] = [
  {
    text: 'Overview',
    href: '#',
    classes: 'govuk-link govuk-heading-s',
    handleClick: () => {}
  },
  {
    text: 'Staff list',
    href: '#',
    current: true,
    classes: 'govuk-link govuk-heading-s',
    handleClick: () => {}
  },
  {
    text: 'Projects',
    href: '#',
    classes: 'govuk-link govuk-heading-s',
    handleClick: () => {}
  },
  {
    text: 'Settings',
    href: '#',
    classes: 'govuk-link govuk-heading-s',
    handleClick: () => {}
  }
]

const secondaryNavigationAttributes: React.HTMLAttributes<HTMLElement> & {
  [K in `data-${string}`]?: string;
} = {
  'data-tracking-type': 'Outbound',
  'data-tracking-target': 'Page not working properly'
}

export const ITEMS_TEXT = ['Overview', 'Staff list', 'Projects', 'Settings']

export {
  secondaryNavigationItemsDefault,
  secondaryNavigationItemsWithClasses,
  secondaryNavigationAttributes
}
