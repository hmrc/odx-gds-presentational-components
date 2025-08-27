import { classBuilder } from '..'

it('Should concatenate the given list of class names into single string, separated by single space', () => {
  const result = classBuilder(['abc', 'def', 'ghi'])

  expect(result).toBe('abc def ghi')
})

it('Should return the class string without any excess white space, if empty or null values are passed', () => {
  const result = classBuilder(['abc', undefined, 'def', '', 'ghi', null])

  expect(result).toBe('abc def ghi')
})
