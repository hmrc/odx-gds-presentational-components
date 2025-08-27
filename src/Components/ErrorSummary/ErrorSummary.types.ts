interface ErrorSummaryDetails {
  message: string
  targetFieldId: string
}

export interface ErrorSummaryProps {
  heading?: string
  errorDetails: ErrorSummaryDetails[]
  autoMoveFocus?: boolean
}
