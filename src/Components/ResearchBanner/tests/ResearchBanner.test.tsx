import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ResearchBanner } from '../ResearchBanner'
import '@testing-library/jest-dom'

describe('ResearchBanner component', () => {
  const requiredProps = {
    header: 'Help make GOV.UK better',
    signupLink: 'https://example.com',
    signupText: 'Sign up to take part in research (opens in new tab)'
  }

  it('should render the banner with header and signup link', () => {
    render(
      <ResearchBanner
        {...requiredProps}
        hideButton={false}
        hideButtonText='Hide message'
        hideButtonAriaText='Hide message. I do not want to take part in research'
      />
    )

    expect(screen.getByText('Help make GOV.UK better')).toBeInTheDocument()
    expect(screen.getByText('Sign up to take part in research (opens in new tab)')).toBeInTheDocument()
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com')
  })

  it('should display the close button when hideButton is false', () => {
    render(
      <ResearchBanner
        {...requiredProps}
        hideButton={false}
        hideButtonText='Hide message'
        hideButtonAriaText='Hide message. I do not want to take part in research'
      />
    )

    expect(screen.getByRole('button', { name: /hide message/i })).toBeInTheDocument()
  })

  it('should not display the close button when hideButton is true', () => {
    render(
      <ResearchBanner
        {...requiredProps}
        hideButton
      />
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should call handleHideButtonClick when the close button is clicked', () => {
    const handleHideButtonClick = jest.fn()

    render(
      <ResearchBanner
        {...requiredProps}
        hideButton={false}
        hideButtonText='Hide message'
        hideButtonAriaText='Hide message. I do not want to take part in research'
        handleHideButtonClick={handleHideButtonClick}
      />
    )

    const button = screen.getByRole('button', { name: /hide message/i })
    fireEvent.click(button)
    expect(handleHideButtonClick).toHaveBeenCalled()
  })

  it('should render visually hidden text in dom for accessibility', () => {
    render(
      <ResearchBanner
        {...requiredProps}
        hideButton={false}
        hideButtonText='Hide message'
        hideButtonAriaText='Hide message. I do not want to take part in research'
      />
    )

    expect(screen.getByText('Hide message. I do not want to take part in research')).toBeInTheDocument()
  })

  it('should open the signup link in a new tab', () => {
    render(
      <ResearchBanner
        {...requiredProps}
        hideButton
      />
    )

    const link = screen.getByRole('link')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('should match the snapshot', () => {
    const { asFragment } = render(
      <ResearchBanner
        {...requiredProps}
        hideButton={false}
        hideButtonText='Hide message'
        hideButtonAriaText='Hide message. I do not want to take part in research'
      />
    )

    expect(asFragment()).toMatchSnapshot()
  })
})
