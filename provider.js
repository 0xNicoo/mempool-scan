require('dotenv').config();
var ethers = require("ethers");
const {takeSample} = require('./sample')
var url = `wss://clean-dry-uranium.quiknode.pro/${process.env.API_KEY}/`

var init = async function (arrivalTimes) {
    var customWsProvider = new ethers.providers.WebSocketProvider(url)
    var lastTime = null

    customWsProvider.on("pending", (tx) => {
  
      customWsProvider.getTransaction(tx).then(function (transaction) {
        lastTime = takeSample(lastTime, arrivalTimes)
        console.log(transaction)
      })
  
    })
  
    customWsProvider._websocket.on("error", async () => {
      console.log(`Unable to connect to ${ep.subdomain} retrying in 3s...`);
      setTimeout(init, 3000)
    });
    
    customWsProvider._websocket.on("close", async (code) => {
      console.log(
        `Connection lost with code ${code}! Attempting reconnect in 3s...`
      )
      customWsProvider._websocket.terminate()
      setTimeout(init, 3000)
    })
  }

module.exports = { init }