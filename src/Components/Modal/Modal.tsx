import React, { FC, useEffect, useRef } from 'react'
import FocusTrap from 'focus-trap-react'
import { ModalProps } from './Modal.types'

const Modal: FC<ModalProps> = (props: ModalProps) => {
  const { children, onClose, ariaTitleId } = props

  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (modalRef.current != null) {
      modalRef.current.focus()
    }
  }, [])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <>
      <FocusTrap>
        <div
          ref={modalRef}
          id='hmrc-timeout-dialog'
          tabIndex={-1}
          role='dialog'
          aria-modal='true'
          className='hmrc-timeout-dialog'
          aria-labelledby={ariaTitleId}
          onKeyDown={handleKeyDown}
        >
          {children}
        </div>
      </FocusTrap>
      <div id='hmrc-timeout-overlay' className='hmrc-timeout-overlay' />
    </>
  )
}

export { Modal }
