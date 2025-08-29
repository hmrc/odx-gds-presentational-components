type ResearchBannerCommonProps = {
  header: string;
  signupLink: string;
  signupText: string;
  handleHideButtonClick?: () => void;
};
 
type WithHideButton = ResearchBannerCommonProps & {
  hideButton: false;
  hideButtonText: string;
  hideButtonAriaText: string;
};
 
type WithoutHideButton = ResearchBannerCommonProps & {
  hideButton: true;
};
 
export type ResearchBannerProps = WithHideButton | WithoutHideButton;