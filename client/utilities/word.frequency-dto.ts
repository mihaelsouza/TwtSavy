export interface WordFrequencyDTO {
  positive: {
    words: string[],
    values: number[],
    frequency: number
  },
  negative: {
    words: string[],
    values: number[],
    frequency: number
  },
}

export const wordFrequencyInitialState = {
  positive: {
    words: ['',],
    values: [0,],
    frequency: 0
  },
  negative: {
    words: ['',],
    values: [0,],
    frequency: 0
  },
};