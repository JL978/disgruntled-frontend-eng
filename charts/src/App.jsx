import { useState } from 'react'
import './App.css'
import * as d3 from 'd3'
import { motion } from 'framer-motion'

const years = [2022, 2021, 2020]

const yearsData = {
  2022: {
    quarterSales: [49441, 37000,91000, 49000],
    total: 226441,
    increasePercentage: 78.3,
    start: 30000,
    end: 53000,
    color: '#468a70',
    rgb: '70, 138, 112' 
  },
  2021: {
    quarterSales: [30000, 27000, 46000, 29000],
    total: 132000,
    increasePercentage: 11.9,
    start: 20000,
    end: 32000,
    color: "#197886",
    rgb: '25, 120, 134'
  },
  2020: {
    quarterSales: [25000, 15000, 43000, 30538],
    total: 113538,
    increasePercentage: 10.34,
    start: 20000,
    end: 32000,
    color: "#7236a8",
    rgb: '114, 54, 168'
  }
}

const chartDimensions = {
  width: 500,
  height: 180,
  margin: {
    top: 0,
    right: 0,
    bottom: 20,
    left: 0,
  }
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  // no decimal digits
  minimumFractionDigits: 0,
})

function App() {
  const [selectedYear, setSelectedYear] = useState(2021)

  const fullData = [yearsData[selectedYear].start, ...yearsData[selectedYear].quarterSales, yearsData[selectedYear].end]

  const xScale = d3
    .scaleLinear()
    .domain([0, fullData.length - 1])
    .range([0, 500])
  
  const yScale = d3
    .scaleLinear()
    .domain([d3.min(fullData) - 20000, d3.max(fullData) + 20000])
    .range([0, 200])

  const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y((d) => yScale(d))
    .curve(d3.curveCardinal)

  

  return (
    <>
    <div className="card">
      <div className="header">
        <div className="info">
          <div className="title" style={{color: yearsData[selectedYear].color}}>
            {selectedYear} Sales
          </div>
          <div className="total">
            {currencyFormatter.format(yearsData[selectedYear].total)}
          </div>
          <div className="percent" style={{color: yearsData[selectedYear].color }}>
            {yearsData[selectedYear].increasePercentage}%
          </div>
        </div>
        <div className="years">
          {years.map((year) => (
            <button
              key={year}
              className={selectedYear === year ? 'selected' : ''}
              style={{ 
                color: selectedYear !== year ? "white" : yearsData[year].color ,
                filter: selectedYear !== year ? "" : `drop-shadow(0 0 5px ${yearsData[year].color})`
              }}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
      <div 
        className="overlay" 
        style={{
          background: `linear-gradient(180deg, rgba(${yearsData[selectedYear].rgb}, 0) 0%, ${yearsData[selectedYear].color} 100%`
        }}
      />
      <div className="chart">
        <svg 
          height={chartDimensions.height + chartDimensions.margin.top + chartDimensions.margin.bottom}
          width={chartDimensions.width + chartDimensions.margin.left + chartDimensions.margin.right}
          >
          {/* <g> */}
            <motion.path 
              // d={line(fullData)} 
              animate={{
                d: line(fullData),
                stroke: yearsData[selectedYear].color,
                style: {
                  filter: `drop-shadow(0 0 5px ${yearsData[selectedYear].color})`
                }
              }}
              fill="none" 
              strokeWidth="3" 
            />
            {yearsData[selectedYear].quarterSales.map((d, i) => (
            <motion.g
                key={i}
                animate={{
                  y: yScale(d),
                  x: xScale(i + 1)
                }}
            >
              <text 
                style={{fill: 'white', fontWeight: "bold", fontSize: "12px"}}
                textAnchor="middle"
                transform='translate(0, -10)'
              >
                  {currencyFormatter.format(d)}
              </text>
              <circle
                r="4"
                fill={yearsData[selectedYear].color}
              />
            </motion.g>
            ))}
            {["Q1", "Q2", "Q3", "Q4"].map((d, i) => (
<g transform={`translate(${xScale(i + 1)}, ${chartDimensions.height + 5})`} key={i}>
              <rect 
                width="30"
                height="24"
                fill="#212121"
                transform='translate(-15, -17)'
                rx="5"
              />
              <text style={{fill: yearsData[selectedYear].color, fontWeight:"bold", fontSize: 12}} textAnchor="middle">
                {d}
              </text>
</g>
            ))}
          {/* </g> */}
        </svg>
      </div>
    </div>
    </>
  )
}

export default App
