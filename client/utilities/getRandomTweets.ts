import { DataPoint } from '../interfaces/query-dto';

function generateRandomIndex (range: number): Function {
  const memory: number[] = [];
  const getIndex = () => {
    const value: number = Math.floor(Math.random() * range);
    console.log(memory)
    if (memory.includes(value)) getIndex();
    else {
      memory.push(value);
      return value;
    }
  };

  return getIndex;
}

export function getArrayOfTweets (
  timeSeries: DataPoint[], caseToAnalyze: string
): {key: number, tweet: string}[] {
  const validTweets: string[] = [];
  timeSeries.forEach((item) => {
    if (caseToAnalyze === 'positive' && item.score >= .7) validTweets.push(item.text);
    else if (caseToAnalyze === 'negative' && item.score <= .3) validTweets.push(item.text);
    else {};
  });

  const flatListDataArray: {key: number, tweet: string}[] = [];
  const getIndex = generateRandomIndex(validTweets.length);
  let i: number = 0, index: number;
  while (i < 10 && i < validTweets.length - 1) {
    validTweets.length > 10 ? index = getIndex() : index = i;
    if (validTweets[index]) {
      flatListDataArray.push({
        key: i,
        tweet: validTweets[index]
      });
    }

    i++;
  }

  return flatListDataArray;
};