const {init} = require('./provider')
const {calculate} = require('./calculate')
const { generateChart } = require('./chart')
const {exportToCSV} = require('./export_data')

var sampleTimeMinutes = process.argv[2]
var arrivalTimes = []
var sampleTime  = sampleTimeMinutes * 60 * 1000

init(arrivalTimes)
setTimeout(() => {
  calculate(arrivalTimes)
  exportToCSV(arrivalTimes)
  generateChart(arrivalTimes, 20)
  process.exit()
}, sampleTime)
