var takeSample = function (lastTime, arrivalTimes){
    var timeNow = Date.now()
  
    if(lastTime !== null){
      var interval = timeNow - lastTime
      arrivalTimes.push(interval)
    }
  
    lastTime = timeNow
    return lastTime
  }

module.exports = { takeSample }