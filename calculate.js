var calculate = function(arrivalTimes){
    var intervalMean = arrivalTimes.reduce((a, b) => a+b) / arrivalTimes.length
    var averageArrivalRate = 1000 / intervalMean 
    console.log(arrivalTimes)
    console.log("Media del intervalo: ", intervalMean)
    console.log("Tasa media de llegada de: ",averageArrivalRate, " transacciones por segundo.")
  }

module.exports = { calculate }