import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import { getScoresToPlot } from '../utilities/getScoresToPlot';

interface Props {
};

const TimeSeriesChart: React.FC<Props> = () => {
  const queryResults = useAppSelector(state => state.queryResult);
  const data = getScoresToPlot(queryResults.timeSeries, 10)
  const color = queryResults.overallSentiment === 'positive' ?
    'green'
  :
    queryResults.overallSentiment === 'negative' ?
      'red'
    :
      'grey'

  return (
    <View>
      <Text style={styles.text}>Sentiment Score over Time</Text>
      <LineChart
        // Data descriptors
        data={data}
        fromZero={true}
        bezier

        // Screen descriptors
        width={Dimensions.get("window").width * .85} // from react-native
        height={230}
        yAxisInterval={Math.floor(queryResults.timeSeries.length / 5)}
        chartConfig={{
          backgroundGradientFrom: "#FFF",
          backgroundGradientTo: "#FFF",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          fillShadowGradient:  color,
          propsForDots: {r: '0',},
          propsForLabels: {},
          strokeWidth: 2
        }}

        style={styles.chartView}
      />
    </View>
  )
}

export default TimeSeriesChart;

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Raleway-Regular',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 18
  },
  chartView: {
    borderRadius: 10,
    marginLeft: -15,
    marginBottom: -10,
  }
});