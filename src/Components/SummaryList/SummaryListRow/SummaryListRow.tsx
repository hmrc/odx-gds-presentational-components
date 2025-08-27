import React, { FC } from 'react'
import SummaryListRowProps from './SummaryListRow.types'
// import '../../styles.scss';

const SummaryListRow: FC<SummaryListRowProps> = (props: SummaryListRowProps) => {
  const { label, value, actions } = props

  return (
    <div className='govuk-summary-list__row'>
      <dt className='govuk-summary-list__key'>{label}</dt>

      <dd className='govuk-summary-list__value'>
        {value}
      </dd>
      {(actions != null) && actions.length > 0 &&
        <dd className='govuk-summary-list__actions'>
          {actions.length === 1
            ? <a className='govuk-link' href='#' {...(actions[0].linkAttributes)} onClick={actions[0].handleClick}>{actions[0].content}</a>
            : (
              <ul>
                {actions.map((action) => {
                  return (
                    <li className='govuk-summary-list__actions-list-item' key={action.content?.toString()}>
                      <a className='govuk-link' href='#' {...(action.linkAttributes)} onClick={action.handleClick}>{action.content}</a>
                    </li>
                  )
                })}
              </ul>)}

        </dd>}
    </div>
  )
}

export { SummaryListRow }
