import React, { useEffect, useState } from 'react'
import Chart from 'react-google-charts'

const LineChart = ({ historicalData, currencySymbol = '$' }) => {
  const [data, setData] = useState([["Date", "Price"]])

  useEffect(() => {
    if (!historicalData?.prices) return

    const sortedPrices = historicalData.prices.sort((a, b) => a[0] - b[0])

    const chartData = [["Date", "Price"]]

    sortedPrices.forEach(([timestamp, price]) => {
      chartData.push([new Date(timestamp), Number(price)])
    })

    setData(chartData)
  }, [historicalData])

  return (
    <Chart
      chartType="LineChart"
  data={data}
  width="100%"
  height="300px"
  options={{
    hAxis: { title: "Date", format: "MMM dd" },
    vAxis: { title: `Price (${currencySymbol})`, minValue: 0 },
    legend: "none",
    pointSize: 5,
    chartArea: { left: 60, right: 20, top: 30, bottom: 70 }, // <-- adds padding
    focusTarget: "category", // tooltip stays inside chart
    tooltip: { isHtml: true }, // clean tooltip inside chart
      }}
    />
  )
}

export default LineChart
