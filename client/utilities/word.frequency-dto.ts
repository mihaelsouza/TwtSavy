export interface WordFrequencyDTO {
  positive: [string, number][],
  negative: [string, number][]
}

export const wordFrequencyInitialState = {
  positive: [['', 0]],
  negative: [['', 0]],
};