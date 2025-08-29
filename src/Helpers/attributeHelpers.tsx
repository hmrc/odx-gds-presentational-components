function makeHintId (identifier: string): string {
  return `${identifier}-hint`
}

function makeErrorId (identifier: string): string {
  return `${identifier}-error`
}

export { makeErrorId, makeHintId }
