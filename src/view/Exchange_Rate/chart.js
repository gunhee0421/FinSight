import React from 'react';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const Chart = ({ labels, datasets, legend }) => {
    return (
        <LineChart
            data={{
                labels: labels,
                datasets: datasets,
                legend: legend
            }}
            width={Dimensions.get('window').width - 16}
            height={400}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={{
                backgroundColor: '#626262FF',
                backgroundGradientFrom: '#3F3F3FFF',
                backgroundGradientTo: '#2c2c2c',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                style: {
                    borderRadius: 16,
                },
                propsForDots: {
                    r: '3',
                    strokeWidth: '1',
                    stroke: '#3F3F3FFF',
                },
            }}
            bezier
            style={{
                marginVertical: 8,
                borderRadius: 16,
            }}
        />
    );
};

export default Chart;