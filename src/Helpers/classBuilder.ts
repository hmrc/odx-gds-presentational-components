export function classBuilder (classStrings: Array<string | null | undefined>): string {
  const filteredList = classStrings.filter((classString) => {
    return (classString !== null && classString !== undefined && classString !== '')
  })
  return filteredList.join(' ').trim()
}
