import React, { ReactNode } from 'react'
import { cleanup, render } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../testHelpers'
import { ConditionalWrapper } from '..'
import '@testing-library/jest-dom'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)

const testWrapper = <div data-testid='test-wrapper' />
const testWrapperFunc = (child: ReactNode): ReactNode => {
  return React.cloneElement(testWrapper, { children: child })
}
const testChild = <div data-testid='test-child' />

/****************
 * SNAPHOTS
 ****************/
snapshotAndAxeTest('True condition, conditional wrapper', <ConditionalWrapper
  condition
  wrapper={(child: ReactNode) => {
    React.cloneElement(testWrapper, { Children: child })
  }}
  childrenToWrap={testChild}
                                                          />)

snapshotAndAxeTest('True condition, conditional wrapper', <ConditionalWrapper
  condition={false}
  wrapper={(child: ReactNode) => {
    React.cloneElement(testWrapper, { Children: child })
  }}
  childrenToWrap={testChild}
                                                          />)

/****************
 * ASSERTIONS
 ****************/

it('should wrap given children in wrapper if the condition resolves to true', () => {
  const { getByTestId } = render(
    <ConditionalWrapper
      condition
      wrapper={testWrapperFunc}
      childrenToWrap={testChild}
    />
  )

  expect(getByTestId('test-wrapper').children[0]).toHaveAttribute('data-testid', 'test-child')
})

it('should render only children if the condition resolves to false', () => {
  const { queryByTestId } = render(
    <ConditionalWrapper
      condition={false}
      wrapper={testWrapperFunc}
      childrenToWrap={testChild}
    />
  )

  expect(queryByTestId('test-wrapper')).toBeFalsy()
  expect(queryByTestId('test-child')).toBeTruthy()
})
