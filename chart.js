const Chart = require('chart.js');
const fs = require('fs');

function generateChart(data, numIntervalos) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const intervalo = Math.ceil((max - min) / numIntervalos);
    const histograma = Array(numIntervalos).fill(0);

    data.forEach(dato => {
        const indice = Math.floor((dato -min) / intervalo);
        histograma[indice]++;
    });

    const intervalosLabels = [];
    for (let i = 0; i < numIntervalos; i++) {
        const from = min + i * intervalo;
        const to = min + (i + 1) * intervalo;
        intervalosLabels.push(`${from}-${to}`);
    }

    const config = {
        type: 'bar',
        data: {
            labels: intervalosLabels,
            datasets: [{
                label: 'Frecuencia',
                data: histograma,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Frecuencia'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Intervalos [ms]'
                    }
                }
            }
        },
        plugins: {
            datalabels: {
                color: 'black',
                anchor: 'end',
                align: 'top',
                formatter: function(value, context) {
                    return value;
                }
            }
        }
    }

    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Gráfico de Dispersión</title>
        <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    </head>
    <style>
        #chart-container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        canvas {
            max-width: 80%; /* Ajusta el tamaño máximo del canvas */
            max-height: 80%; /* Ajusta el tamaño máximo del canvas */
            border: 1px solid black; /* Añade un borde para mayor claridad */
        }
    </style>
    <body>
        <div id="chart-container">
            <canvas id="myChart"></canvas>
        </div>
        <script>
            var ctx = document.getElementById('myChart').getContext('2d');
            var myChart = new Chart(ctx, ${JSON.stringify(config)});
        </script>
    </body>
    </html>
    `;

    fs.writeFileSync('scatter_plot.html', html);
}

module.exports = { generateChart }


