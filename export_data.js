const fs = require('fs');

const exportToCSV = function(data){
    const dataCSV = data.join('\n')
    fs.writeFileSync('datos.csv', dataCSV);
}

module.exports = {exportToCSV}