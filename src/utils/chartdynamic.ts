import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Function to convert the month number to the month name
function getMonthName(monthNumber) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ];
  return months[monthNumber - 1];
}

function chartDynamic() {
  // Variable globale pour stocker l'instance du graphique
  let chartDynamic = null;

  // Fonction pour récupérer les données JSON
  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
  }

  // Function to draw the chart with given time range and portfolio filter
  async function drawChartDynamic() {
    const ctx = document.getElementById('chart-Dynamic-Portfolio');
    if (!ctx) return;

    if (chartDynamic) {
      // Si chartDynamic existe déjà, le détruire avant d'en créer un nouveau
      chartDynamic.destroy();
    }

    let data = await fetchData(
      'https://sheets.googleapis.com/v4/spreadsheets/1VEie24sYE2Mzs7TUHrHZ8QMSSieJQ1-N1nGkML0Ulzs/values/pnl_website_data!A1:C5000?key=AIzaSyDfx3berSA6lDP_UOQjarrvVO-sWr08Jhw'
    );

    if (!data) {
      console.error('Failed to fetch data');
      return;
    }

    // Triez les données par date
    data.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

    // Filtrer les données pour le portfolio '🧊 Dynamic'
    data = data.filter((row) => row[1] === '🧊 Dynamic');

    // Filtrer les données pour les 3 derniers mois
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - 3);
    data = data.filter((row) => new Date(row[0]) >= cutoffDate);

    // Group and calculate monthly averages
    const groupedData = data.reduce((acc, row) => {
      const date = new Date(row[0]);
      const monthYearKey = `${date.getMonth() + 1}-${date.getFullYear()}`; // Crée une clé au format MM-YYYY

      // Si la clé n'existe pas encore, créez un nouvel objet pour le mois
      if (!acc[monthYearKey]) {
        acc[monthYearKey] = {
          sum: parseFloat(row[2]),
          count: 1,
        };
      } else {
        // Si la clé existe déjà, ajoutez la valeur actuelle à la somme et augmentez le compteur
        acc[monthYearKey].sum += parseFloat(row[2]);
        acc[monthYearKey].count++;
      }

      return acc;
    }, {});

    // Calculez les moyennes mensuelles et créez les tableaux de labels et de données pour le graphique
    const labels = [];
    const dataset = [];

    for (const [key, value] of Object.entries(groupedData)) {
      const [month, year] = key.split('-');
      const monthName = getMonthName(parseInt(month));
      labels.push(`${monthName} ${year.slice(2)}`);
      // Multipliez par 100 et conservez 2 chiffres après la virgule
      dataset.push(((value.sum / value.count) * 100).toFixed(2));
    }

    const gradient = ctx.getContext('2d').createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, 'rgba(74, 183, 240, 0.2)');
    gradient.addColorStop(1, 'rgba(74, 183, 240, 0.05)');

    Chart.defaults.color = '#00273f';
    Chart.defaults.borderColor = 'rgba(86, 141, 170, 0.1)';
    chartDynamic = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Dynamic ',
            data: dataset,
            borderWidth: 2,
            borderColor: '#568DAA',
            pointRadius: 5,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: '#568daa',
            pointBackgroundColor: '#96F7FF',
            pointBorderWidth: 2,
            pointHitRadius: 15,
            tension: 0.25,
            fill: 'start',
            backgroundColor: gradient,
          },
        ],
      },
      options: {
        layout: {
          padding: {
            top: 32, // Ajoute un padding en haut de 20px
            right: 32, // Vous pouvez également ajouter des paddings à droite, à gauche et en bas si nécessaire
            bottom: 0,
            left: 0,
          },
        },
        plugins: {
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || '';
                if (label) {
                  label += ': ';
                }
                if (context.parsed.y !== null) {
                  label += context.parsed.y + '%';
                }
                return label;
              },
            },
          },
          legend: {
            display: false,
          },
          datalabels: {
            // Add the datalabels configuration object
            align: 'top', // Set the position of the data labels
            color: '#00273f', // Set the color of the data labels
            formatter: (value) => {
              // Format the data label content
              return `${value}%`; // Add any additional formatting if needed
            },
          },
        },
        animation: {
          duration: 0,
          easing: 'linear',
        },
        scales: {
          y: {
            grid: {
              display: false, // Ajoutez cette ligne pour supprimer les grilles horizontales
            },
            min: undefined,
            ticks: {
              display: false, // Hide the Y-axis tick labels
            },
          },
        },
      },
      plugins: [ChartDataLabels], // Add the datalabels plugin to the chart
    });
  }

  drawChartDynamic(); // Call the function to set up the chart
}

export { chartDynamic };
