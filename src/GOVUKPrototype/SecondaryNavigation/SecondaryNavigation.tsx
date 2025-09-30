import React, { FC } from 'react'
import { DEFAULT_TITLE, SecondaryNavigationProps } from './SecondaryNavigation.types'

const SecondaryNavigation: FC<SecondaryNavigationProps> = ({
  items,
  labelledBy = '',
  visuallyHiddenTitle = DEFAULT_TITLE,
  classes = '',
  attributes = {}
}: SecondaryNavigationProps) => {
  const ariaProps = labelledBy !== '' ? { 'aria-labelledby': labelledBy } : { 'aria-label': visuallyHiddenTitle }
  const navigationClasses = `x-govuk-secondary-navigation ${classes !== '' ? classes : ''}`.trim()
  const navigationProps = { className: navigationClasses, ...ariaProps, ...attributes }

  return (
    <nav {...navigationProps}>
      <ul className='x-govuk-secondary-navigation__list'>
        {items.map((item, index) => {
          const listItemClasses = {
            className: 'x-govuk-secondary-navigation__list-item' +
              (item.current === true ? ' x-govuk-secondary-navigation__list-item--current' : '')
          }
          const linkClasses = {
            className: 'x-govuk-secondary-navigation__link' +
              (item.classes != null && item.classes !== '' ? ` ${item.classes.trim()}` : '')
          }
          return (
            <li
              key={`${item.text.toLocaleLowerCase()}-${index}`}
              data-testid={`${item.text.toLowerCase()}-${index}`}
              {...listItemClasses}
            >
              <a
                href={item.href}
                aria-current={item.current === true ? 'page' : undefined}
                onClick={item.handleClick}
                {...linkClasses}
              >
                {item.text}
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export { SecondaryNavigation }
