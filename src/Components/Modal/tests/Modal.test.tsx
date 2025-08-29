import React from 'react'
import '@testing-library/jest-dom'
import { cleanup, render, screen, fireEvent } from '@testing-library/react'
import { snapshotAndAxeTest } from '../../../testHelpers'
import { Modal } from '../Modal'
import { Button } from '../..'

/****************
 * SET UP
 ****************/
// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup)
const onCloseMock = jest.fn()

const testChildJSX = (
  <>
    <h1 id='title'>Child</h1>
    <p>JSX nodes</p>
    <div>
      Modal Content
      <Button text='Stay logged in' onClick={() => {}} />
    </div>
  </>
)

/****************
 * SNAPHOTS
 ****************/

snapshotAndAxeTest(
  'Default Modal',
  <Modal onClose={onCloseMock} ariaTitleId='title'>
    {testChildJSX}
  </Modal>
)

/****************
 * ASSERTIONS
 ****************/
describe('Given I am using the Modal', () => {
  let onCloseMock: jest.Mock

  beforeEach(() => {
    onCloseMock = jest.fn()
  })

  describe('When the modal is showing', () => {
    beforeEach(() => {
      render(
        <Modal onClose={onCloseMock} ariaTitleId='title'>
          {testChildJSX}
        </Modal>
      )
    })

    it('Renders given children, inside the modal', () => {
      const modalElement = screen.getByRole('dialog')
      const renderedContent = render(testChildJSX)
      expect(modalElement.innerHTML).toBe(renderedContent.container.innerHTML)
    })

    it('Should move browser focus to the modal', () => {
      const modalElement = screen.getByRole('dialog')
      expect(modalElement).toHaveFocus()
    })

    it('Should call onClose when the Escape key is pressed', () => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Escape' })
      expect(onCloseMock).toHaveBeenCalledTimes(1)
    })

    it('Should not call onClose when any key other than Escape is pressed', () => {
      fireEvent.keyDown(screen.getByRole('dialog'), { key: 'Shift' })
      expect(onCloseMock).toHaveBeenCalledTimes(0)
    })
  })
})
