import { DataPoint } from '../interfaces/query-dto';
import moment from 'moment';

interface PlotData {
  labels: string[],
  datasets: [{
    data: number[]
  }]
};

export function getScoresToPlot (dataArray: DataPoint[], smoothWindow: number): PlotData {
  // Get the sequence of scores and smooth the data using a
  // moving-average window with size smoothWindow
  const values = dataArray.map((value) => value.score);
  if (values.length <= 100) smoothWindow = 1;

  const smoothedValues: number[] = []
  let value: number = 0;
  for (let i = smoothWindow; i < values.length; i++) {
    value = values.slice(i-smoothWindow, i).reduce((a,b) => a + b) / smoothWindow;
    smoothedValues.push(+value.toFixed(2));
  }

  // Get 6 labels for the plot's x-axis
  const interval: number = Math.floor(values.length / 5);
  const dates: string[] = [];
  let i: number = 0;
  while (i < 5) {
    dates.push(dataArray[i * interval].date);
    i++;
  }

  // Conditionally format dates using moment.js
  dates.forEach((date, index) => {
    dates[index] = moment(date).fromNow()
      .replace('a few seconds', 'now')
      .replace('a minute ago', '1min')
      .replace(' minutes', 'min')
      .replace('an hour ago', '1h')
      .replace(' hours', 'h')
      .replace('a day ago', '1d')
      .replace(' days', 'd')
      .replace('a month ago', '1mo')
      .replace(' months ago', 'mo')
      .replace('a year ago', '1yr')
      .replace(' years', 'yr')
      .replace(' ago', '') + `${index === dates.length - 1 ? ' ago' : ''}`;
  });

  return {
    labels: dates,
    datasets: [{data: smoothedValues}]
  };
};