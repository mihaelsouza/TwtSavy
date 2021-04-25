import { DataPoint } from './query-dto';
import { WordFrequencyDTO } from './word.frequency-dto';

interface LooseObj {
  [key: string]: any,
  positive: {
    [key: string]: number
  },
  negative: {
    [key: string]: number
  },
};

// List of common english words to avoid, from the NLTK python library
const enStopWordsNLTK = [
  'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours', 'yourself',
  'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers', 'herself', 'it', 'its', 'itself',
  'they', 'them', 'their', 'theirs', 'themselves', 'what', 'which', 'who', 'whom', 'this', 'that',
  'these', 'those', 'am', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had',
  'having', 'do', 'does', 'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as',
  'until', 'while', 'of', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through',
  'during', 'before', 'after', 'above', 'below', 'to', 'from', 'up', 'down', 'in', 'out', 'on', 'off',
  'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how',
  'all', 'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will', 'just', 'don', 'should', 'now'
];

export function generateWordClouds (timeSeries: DataPoint[]): WordFrequencyDTO {
  const cache: LooseObj = {
    positive: {},
    negative: {}
  };

  let words: string[];
  let cacheCase: string;
  timeSeries.forEach((data) => {
    if (data.score >= .7 || data.score <= .3) {
      cacheCase = data.score >= .7 ? 'positive' : 'negative';
      words = data.text.split(' ');

      words.forEach((word) => {
        if (!enStopWordsNLTK.includes(word)) cache[cacheCase][word] ? cache[cacheCase][word]++ : cache[cacheCase][word] = 1;
      });
    }
  });

  // Filter out any instances of single words and sort the resulting arrays
  const positives =
    Object.entries(cache.positive)
      .filter((item) => item[1] > 1)
      .sort((a,b) => b[1] - a[1]);

  const negatives =
    Object.entries(cache.negative)
      .filter((item) => item[1] > 1)
      .sort((a,b) => b[1] - a[1]);

  return {
    positive: positives,
    negative: negatives,
  };
};