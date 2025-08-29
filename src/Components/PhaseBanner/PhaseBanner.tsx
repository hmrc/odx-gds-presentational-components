import React, { FC } from "react";
import { PhaseBannerProps } from './PhaseBanner.types'

export const PhaseBanner: FC<PhaseBannerProps> = ({ children, type }) => {
  return (
    <div className='govuk-phase-banner'>
      <p className='govuk-phase-banner__content'>
        <strong className='govuk-tag govuk-phase-banner__content__tag'>
          {type === 'Alpha' ? 'Alpha' : 'Beta'}
        </strong>
        <span className='govuk-phase-banner__text'>
          {children}
        </span>
      </p>
    </div>
  );
};
