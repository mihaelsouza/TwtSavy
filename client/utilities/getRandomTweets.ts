import { DataPoint } from '../interfaces/query-dto';

function generateRandomIndex (range: number): Function {
  const memory: number[] = [];
  const getIndex = () => {
    const value: number = Math.floor(Math.random() * range)
    if (value in memory) {
      memory.push(value);
      getIndex();
    } else return value;
  };

  return getIndex;
}

export function getArrayOfTweets (
  timeSeries: DataPoint[], caseToAnalyze: string
): {key: number, tweet: string}[] {
  const validTweets: string[] = [];
  timeSeries.forEach((item) => {
    caseToAnalyze === 'positive' ?
      item.score >= .7 ? validTweets.push(item.text) : {}
    :
      item.score <= .3 ? validTweets.push(item.text) : {}
  });

  const flatListDataArray: {key: number, tweet: string}[] = [];
  const getIndex = generateRandomIndex(validTweets.length);
  let i: number = 0, index: number;
  while (i < 10 && i < validTweets.length) {
    validTweets.length < 10 ? index = getIndex() : index = i;
    flatListDataArray.push({
      key: i,
      tweet: validTweets[index].replace(/\bhttps?:\/\/.*/,'')
    });
    i++;
  }

  return flatListDataArray;
};