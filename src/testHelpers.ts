import renderer from 'react-test-renderer'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom'
import { ReactElement } from 'react'

const snapshotAndAxeTest = (testName: string, component: ReactElement): void => {
  expect.extend(toHaveNoViolations)

  test(`${testName} Snapshot`, () => {
    const tree = renderer
      .create(component).toJSON()
    expect(tree).toMatchSnapshot()
  })

  test(`${testName} pass axe`, async () => {
    const { container } = render(component)
    expect(await axe(container)).toHaveNoViolations()
  })
}

export { snapshotAndAxeTest }
