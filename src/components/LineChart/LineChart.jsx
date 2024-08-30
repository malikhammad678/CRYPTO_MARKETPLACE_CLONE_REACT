import React, { useEffect, useState } from 'react';
import Chart from 'react-google-charts';

const LineChart = ({ historicalData }) => {
    const [data, setData] = useState([["Date", "Price"]]);

    useEffect(() => {
        if (historicalData && historicalData.prices) {
            let dataCopy = [["Date", "Price"]];
            historicalData.prices.forEach(item => {
                dataCopy.push([new Date(item[0]).toLocaleDateString().slice(0,-5), item[1]]);
            });
            setData(dataCopy);
        }
    }, [historicalData]);

    return (
        <Chart
            chartType='LineChart'
            data={data}
            height="250px"
            width="600px"
            options={{ legend: { position: 'bottom' } }}
        />
    );
}

export default LineChart;
