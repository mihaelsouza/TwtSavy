import { DataPoint } from '../interfaces/query-dto';
import { WordFrequencyDTO } from '../interfaces/word.frequency-dto';

interface LooseObj {
  positive: {
    [key: string]: number
  },
  negative: {
    [key: string]: number
  },
};

// List of common english words to avoid, from the NLTK python library
const enStopWordsNLTK: string[] = [
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

function cleanWord (word: string): string {
  if (enStopWordsNLTK.includes(word)) return ''; // Stopwords
  if (word.match(/^[#@&]/)) return ''; // Hashtags, mentions and HTML special characters
  if (word.match(/^https?/)) return ''; // Links

  return word.replace(/[^\w]/, '');
}

export function generateWordClouds (timeSeries: DataPoint[]): WordFrequencyDTO {
  const cache: LooseObj = {
    positive: {},
    negative: {}
  };

  let words: string[];
  let cacheCase: 'positive' | 'negative';
  let positiveCount: number = 0;
  let positiveArray: string[] = [];
  let negativeCount: number = 0;
  let negativeArray: string[] = [];
  timeSeries.forEach((data) => {
    if (data.score >= .7 || data.score <= .3) {
      cacheCase = data.score >= .7 ? 'positive' : 'negative';
      words = data.text.split(' ');
      data.score >= .7 ?
        positiveCount++ &&
        positiveArray.push(data.text)
      :
        negativeCount++ &&
        negativeArray.push(data.text);

      words.forEach((word) => {
        word = cleanWord(word.toLowerCase()); // To simplify comparisons
        if (word != '') cache[cacheCase][word] ? cache[cacheCase][word]++ : cache[cacheCase][word] = 1;
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
    positive: {
      words: positives.map((item) => item[0]),
      values: positives.map((item) => item[1]),
      frequency: Math.round(positiveCount * 100 / timeSeries.length),
    },
    negative: {
      words: negatives.map((item) => item[0]),
      values: negatives.map((item) => item[1]),
      frequency: Math.round(negativeCount * 100 / timeSeries.length),
    },
  };
};