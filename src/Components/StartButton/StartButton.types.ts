import { MouseEventHandler } from "react";

export interface StartButtonProps {
  text?: string
  href: string
  onClick?: MouseEventHandler<HTMLAnchorElement>
}
