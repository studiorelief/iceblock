import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Function to convert the month number to the month name
function getMonthName(monthNumber) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return months[monthNumber - 1];
}

function chartFundamental() {
  // Variable globale pour stocker l'instance du graphique
  let chartFundamental = null;

  // Fonction pour récupérer les données JSON
  async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.values;
  }

  // Function to draw the chart with given time range and portfolio filter
  async function drawChartFundamental() {
    const ctx = document.getElementById('chart-Fundamental-Portfolio');
    if (!ctx) return;

    if (chartFundamental) {
      // Si chartFundamental existe déjà, le détruire avant d'en créer un nouveau
      chartFundamental.destroy();
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

    // Filtrer les données pour le portfolio '🧊 Fundamental (simulated)'
    data = data.filter((row) => row[1] === '🧊 Fundamental (simulated)');

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

    Chart.defaults.color = '#00273f';
    Chart.defaults.borderColor = 'rgba(86, 141, 170, 0.1)';
    chartFundamental = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: '🧊 Fundamental',
            data: dataset,
            borderWidth: 2,
            borderColor: 'rgba(13, 39, 63, 0.2)',
            pointRadius: 4, // Set the point radius to a non-zero value
            pointHoverRadius: 4, // Set the point hover radius to a non-zero value
            pointBackgroundColor: 'rgba(13, 39, 63, 0.2)',
            pointBorderWidth: 0,
            pointHitRadius: 4, // Set the point hit radius to a non-zero value
            tension: 0.25,
            fill: true,
            backgroundColor: 'rgba(13, 39, 63, 0.1)',
          },
        ],
      },
      options: {
        plugins: {
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

  drawChartFundamental(); // Call the function to set up the chart
}

export { chartFundamental };
