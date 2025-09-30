import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SignoutComponent } from '../Signout'

describe('Given a Signout Component', () => {
  const defaultProps = {
    heading: 'Security Heading',
    signInHandler: jest.fn(),
    buttonText: 'Sign In',
    signOutText: 'We saved your answer',
    extraContent: <span data-testid='child'>Child Node</span>
  }

  it('When renders with heading and button', () => {
    render(<SignoutComponent {...defaultProps} />)
    expect(screen.getByText('Security Heading')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  it('when calls signInHandler on button click', () => {
    render(<SignoutComponent {...defaultProps} />)
    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }))
    expect(defaultProps.signInHandler).toHaveBeenCalled()
  })

  it('when it renders saved answer message', () => {
    render(<SignoutComponent {...defaultProps} />)
    expect(screen.getByText('We saved your answer')).toBeInTheDocument()
  })

  it('when renders extraContent', () => {
    render(<SignoutComponent {...defaultProps} />)
    expect(screen.getByTestId('child')).toBeInTheDocument()
  })
})
