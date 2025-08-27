import React, { useEffect, useState, useRef } from "react";
import type { Meta, StoryObj } from "@storybook/react";
import StoryPhaseBannerDecorator, { StoryPhaseBannerStyles } from '../../../../.storybook/decorators/StoryPhaseBanner'
import { fn } from '@storybook/test'
import { Modal } from "../Modal";
import { Button } from "../..";

const meta: Meta<typeof Modal> = {
  title: "HMRC Design System Components/Modal",
  component: Modal,
  parameters: {
    docs: {
      story: {
        height: "500px",
      },
    },
  },
  argTypes: {
    onClose: { action: "onClose" },
  },
  args: {
    children: (
      <>
        <div>
          <h1 id="hmrc-timeout-heading" className="govuk-heading-m push--top">
            You're about to be signed out
          </h1>
          <p
            className="govuk-body hmrc-timeout-dialog__message"
            aria-hidden="true"
          >
            For your security, we will sign you out in{" "}
            <span
              id="hmrc-timeout-countdown"
              className="hmrc-timeout-dialog__countdown"
            >
              2 minutes
            </span>
            .
          </p>
          <p
            id="hmrc-timeout-message"
            className="govuk-visually-hidden screenreader-content"
            aria-live="assertive"
          >
            For your security, we will sign you out in 2 minutes.
          </p>
          <button id="hmrc-timeout-keep-signin-btn" className="govuk-button" onClick={fn()}>
            Stay signed in
          </button>
          <div className="hmrc-timeout-dialog__link-wrapper">
            <a
              id="hmrc-timeout-sign-out-link"
              className="govuk-link hmrc-timeout-dialog__link"
              href=""
            >
              Sign out
            </a>
          </div>
        </div>
      </>
    ),
  }
};

export default meta;

export const Default: StoryObj<typeof Modal> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Info,
      message: `This example is a static example, and modal content will not countdown as would be expected for a Timeout Modal.
      All modal content is expected to be managed by the user`
    }
  },
  decorators: [ StoryPhaseBannerDecorator ],
  args: {
    ariaTitleId: "hmrc-timeout-heading"
  }
};

export const InteractiveVariant: StoryObj<typeof Modal> = {
  parameters: {
    StoryPhaseBannerDecorator: {
      style: StoryPhaseBannerStyles.Info,
      message: `All modal content is expected to be managed by the user. The content in this example has been provided as an example of expected usage`
    }
  },
  decorators: [StoryPhaseBannerDecorator],
  args: {
    ariaTitleId: "hmrc-timeout-heading",
  },
  render: (args) => {
    const [showModal, setShowModal] = useState(false)
    const [timeoutStart, setTimeoutStart] = useState(-1)
    const [timeLeftText, setTimeLeftText] = useState('')
    const [deletedAnswers, setDeletedAnswers] = useState(false)
    const [intervalId, setIntervalId] = useState<any>('')
    const timeoutSecs = 125

    function timeTotext(time) {
      if(time > 60) {
        return `${Math.floor(time/60)} minute${Math.floor(time/60) > 1 ? 's' : ''}`
      }
      else {
        return `${time} second${(time) > 1 ? 's' : ''}`
      }
    }

    function timeRemainingContent(start) {
      console.log('calling timeout remining content')
      if(start > 0) {
      const timeLeftInMs = (timeoutSecs * 1000) - (new Date(Date.now()).getTime() - start)
      const timeLeftInSecs = Math.floor(timeLeftInMs / 1000)
        if(timeLeftInSecs > 0){
          return timeTotext(timeLeftInSecs)
        }
       else {
          setShowModal(false)
          setDeletedAnswers(true)
          return ''
        }
      }
    }

    useEffect(() => {
      if(showModal) {
        timeRemainingContent(timeTotext(timeoutSecs))
        setTimeoutStart(new Date(Date.now()).getTime())
      } else {
        setIntervalId('')
        setTimeLeftText('')
        clearInterval(intervalId)
      }
    }, [showModal])

    useEffect(() => {
      if(timeoutStart > 0) {
        clearInterval(intervalId)
        setIntervalId(setInterval(() => {
          setTimeLeftText(timeRemainingContent(timeoutStart))
        }, 1000))
      }
      return () => {clearInterval(intervalId)}
    }, [timeoutStart])


   return (
      <>
      {!deletedAnswers && <>
          <Button text='Show Modal' onClick={() => {
              setShowModal(true)
            }
          } />
          <p className="govuk-body">You will be able to close the modal with either the Escape Key, or by clicking the `Delete your answers` Link</p>
        </>
      }
      {deletedAnswers && <>
          <div><p className="govuk-body">We have deleted your answers.</p></div>
          <Button text='Reset interactive story (This will clear this screen and allow you to toggle the modal again)' onClick={() => setDeletedAnswers(false)} />
        </>
      }
      { showModal && timeLeftText !== '' && <Modal onClose={() => {setShowModal(false)}} ariaTitleId={'hmrc-timeout-heading hmrc-timeout-message'}>
        <>
        <div>
          <h1 id="hmrc-timeout-heading" className="govuk-heading-m push--top">
            For your security
          </h1>
          <p
            className="govuk-body hmrc-timeout-dialog__message"
            aria-hidden="true"
          >
            We will delete your answers in{" "}
            <span
              id="hmrc-timeout-countdown"
              className="hmrc-timeout-dialog__countdown"
            >
              {timeLeftText}
            </span>
            .
          </p>
          <p
            id="hmrc-timeout-message"
            className="govuk-visually-hidden screenreader-content"
            aria-live="polite"
          >
            For your security, we will delete your answers in {timeLeftText}.
          </p>
          <button id="hmrc-timeout-keep-signin-btn" className="govuk-button">
            Continue checking what help you can get with childcare costs
          </button>
          <div className="hmrc-timeout-dialog__link-wrapper">
            <a
              id="hmrc-timeout-sign-out-link"
              className="govuk-link hmrc-timeout-dialog__link"
              href="?lang=English"
              onClick={(event) => {
                event.preventDefault()
                setDeletedAnswers(true)
                setShowModal(false)
              }}
            >
              Delete your answers
            </a>
          </div>
        </div>
      </>

      </Modal> }
      </>
    )
  }
};
