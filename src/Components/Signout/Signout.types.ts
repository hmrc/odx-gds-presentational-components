export interface SignoutProps {
  heading: string
  signOutText?: string
  signInHandler: (e: React.MouseEvent<HTMLButtonElement>) => void
  buttonText: string
  extraContent?: React.ReactNode
}
