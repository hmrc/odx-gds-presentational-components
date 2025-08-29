import { TagColour } from './TagColour'

export default interface TagProps {
  /** The text content of the tag */
  text: string

  /** The tag variation as set out by the GDS guidelines - Possible options are:
   * - TagColour.Default,
   * - TagColour.Grey,
   * - TagColour.Green,
   * - TagColour.Turquoise,
   * - TagColour.Blue,
   * - TagColour.LightBlue,
   * - TagColour.Purple,
   * - TagColour.Pink,
   * - TagColour.Red,
   * - TagColour.Orange,
   * - TagColour.Yellow,
   *
   * Defaults to Blue if none selected
   */
  colour?: TagColour
  className?: string
}
