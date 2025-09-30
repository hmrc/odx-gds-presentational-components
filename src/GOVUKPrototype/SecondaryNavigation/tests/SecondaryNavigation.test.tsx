import React from 'react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { SecondaryNavigation } from '../SecondaryNavigation'
import { secondaryNavigationAttributes, secondaryNavigationItemsWithClasses, secondaryNavigationItemsDefault, ITEMS_TEXT } from './SecondaryNavigationStub'
import { render, screen, fireEvent } from '@testing-library/react'

/****************
 * SNAPHOTS AND AXE
 ****************/

snapshotAndAxeTest('Secondary Navigation Component Default',
  <SecondaryNavigation
    items={secondaryNavigationItemsDefault}
  />)

snapshotAndAxeTest('Secondary Navigation Component With Custom Props',
  <SecondaryNavigation
    items={secondaryNavigationItemsWithClasses}
    labelledBy='main-nav'
    visuallyHiddenTitle='Secondary Navigation Menu'
    classes='govuk-!-margin-bottom-5'
    attributes={secondaryNavigationAttributes}
  />)

/****************
 * ASSERTIONS
 ****************/

describe('SecondaryNavigation', () => {
  describe('Given a SecondaryNavigation component with items', () => {
    beforeEach(() => {
      render(
        <SecondaryNavigation
          items={secondaryNavigationItemsDefault}
        />
      )
    })

    it('Should display all items', () => {
      ITEMS_TEXT.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('Should highlight the element with current set to true', () => {
      const currentItems = screen.getAllByRole('listitem').filter(item =>
        item.classList.contains('x-govuk-secondary-navigation__list-item--current')
      )
      expect(currentItems).toHaveLength(1)
      expect(screen.getByTestId('overview-0')).toHaveClass('x-govuk-secondary-navigation__list-item--current')
    })

    it('Should render aria-label as \'Secondary menu\' when no custom label is provided', () => {
      expect(screen.getByRole('navigation')).toHaveAttribute('aria-label', 'Secondary menu')
    })
  })

  describe('Given a SecondaryNavigation component with custom properties', () => {
    describe('When \'visuallyHiddenTitle\' is provided', () => {
      it('Should render aria-label with custom label value on the navigation element', () => {
        render(
          <SecondaryNavigation
            items={secondaryNavigationItemsDefault}
            visuallyHiddenTitle='Secondary Navigation Menu'
          />
        )

        const nav = screen.getByRole('navigation')
        expect(nav).toHaveAttribute('aria-label', 'Secondary Navigation Menu')
        expect(nav).not.toHaveAttribute(' aria-labelledBy')
      })
    })

    describe('When \'labelledBy\' is provided', () => {
      it('Should render aria-labelledBy to reference an existing visible heading by ID on the navigation element', () => {
        render(
          <SecondaryNavigation
            items={secondaryNavigationItemsDefault}
            labelledBy='secondary-nav'
          />
        )

        const nav = screen.getByRole('navigation')
        expect(nav).toHaveAttribute('aria-labelledBy', 'secondary-nav')
        expect(nav).not.toHaveAttribute(' aria-label')
      })
    })

    describe('When \'classes\' for SecondaryNavigationProps is provided', () => {
      it('Should merge the new class with the existing classes on the navigation element', () => {
        render(
          <SecondaryNavigation
            items={secondaryNavigationItemsDefault}
            classes='govuk-!-margin-bottom-5'
          />
        )

        const nav = screen.getByRole('navigation')
        expect(nav).toHaveClass('x-govuk-secondary-navigation govuk-!-margin-bottom-5')
      })
    })

    describe('When \'classes\' for SecondaryNavigationItems is provided', () => {
      it('Should merge the new class with the existing classes on the link element', () => {
        render(
          <SecondaryNavigation
            items={secondaryNavigationItemsWithClasses}
          />
        )

        ITEMS_TEXT.forEach(label => {
          expect(screen.getByText(label)).toHaveClass('x-govuk-secondary-navigation__link govuk-link govuk-heading-s')
        })
      })
    })

    describe('When \'attributes\' for SecondaryNavigationProps is provided', () => {
      it('Should add attributes for each property on the navigation element', () => {
        render(
          <SecondaryNavigation
            items={secondaryNavigationItemsDefault}
            attributes={secondaryNavigationAttributes}
          />
        )

        const nav = screen.getByRole('navigation')
        expect(nav).toHaveAttribute('data-tracking-type', 'Outbound')
        expect(nav).toHaveAttribute('data-tracking-target', 'Page not working properly')
      })
    })

    describe('When \'handleClick\' for SecondaryNavigationProps is provided', () => {
      it('Should call handleClick when a navigation item is clicked', () => {
        const handleClick = jest.fn()

        const items = [
          { text: 'Settings', href: '#', handleClick }
        ]

        render(
          <SecondaryNavigation
            items={items}
          />
        )

        fireEvent.click(screen.getByText('Settings'))

        expect(handleClick).toHaveBeenCalled()
      })
    })
  })
})
