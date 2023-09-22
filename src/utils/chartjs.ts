import Chart from 'chart.js/auto';

// Variable globale pour stocker l'instance du graphique
let myChart = null;

// Fonction pour récupérer les données JSON
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data.values;
}

// Function to draw the chart with given time range and portfolio filter
async function drawChart(timeRangeValue, portfolioFilterValue) {
  const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element=chart-3]').getContext('2d');
  if (!ctx3) return;

  if (myChart) {
    // Si myChart existe déjà, le détruire avant d'en créer un nouveau
    myChart.destroy();
  }

  let data = await fetchData(
    'https://sheets.googleapis.com/v4/spreadsheets/1VEie24sYE2Mzs7TUHrHZ8QMSSieJQ1-N1nGkML0Ulzs/values/pnl_website_data!A1:C5000?key=AIzaSyDfx3berSA6lDP_UOQjarrvVO-sWr08Jhw'
  );

  // Triez les données par date
  data.sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime());

  // Filtrer les données en fonction de la valeur de portfolioFilterValue
  const portfolioMap = {
    'Innovation Portfolio': '🧊 Innovation',
    'Vision Portfolio': '🧊 Vision',
    'Dynamic Portfolio': '🧊 Dynamic',
    'Fundamental Portfolio': '🧊 Fundamental (simulated)',
  };

  data = data.filter((row) => row[1] === portfolioMap[portfolioFilterValue]);

  // Filtrer les données en fonction de la valeur de timeRangeValue
  if (timeRangeValue !== 'all') {
    const cutoffDate = new Date();
    cutoffDate.setMonth(cutoffDate.getMonth() - parseInt(timeRangeValue));
    data = data.filter((row) => new Date(row[0]) >= cutoffDate);
  }

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
    labels.push(key);
    // Multipliez par 100 et conservez 2 chiffres après la virgule
    dataset.push(((value.sum / value.count) * 100).toFixed(2));
  }

  // Mois tooltip
  const moisFrancais = [
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

  // Name tooltip
  const nameMapping = {
    '🧊 Innovation': 'Innovation ',
    '🧊 Vision': 'Vision ',
    '🧊 Dynamic': 'Dynamic ',
    '🧊 Fundamental (simulated)': 'Fundamental ',
  };

  const gradient = ctx3.createLinearGradient(0, 0, 0, 200);
  gradient.addColorStop(0, 'rgb(74, 183, 240, 0.2)');
  gradient.addColorStop(1, 'rgb(74, 183, 240,0.05)');

  Chart.defaults.color = '#00273f';
  Chart.defaults.borderColor = 'rgba(86, 141, 170, 0.1)';
  myChart = new Chart(ctx3, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: portfolioMap[portfolioFilterValue],
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
      plugins: {
        tooltip: {
          callbacks: {
            title: function (tooltipItems) {
              const originalTitle = tooltipItems[0].label;
              const [monthIndex, year] = originalTitle.split('-');
              const monthName = moisFrancais[parseInt(monthIndex) - 1]; // -1 car les indices de tableau commencent à 0
              return `${monthName} ${year}`;
            },
            label: function (context) {
              let label = nameMapping[context.dataset.label] || context.dataset.label;
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
      },
      animation: {
        duration: 500,
        easing: 'linear',
      },
      scales: {
        y: {
          grid: {
            display: false, // Ajoutez cette ligne pour supprimer les grilles horizontales
          },
          min: undefined,
          ticks: {
            callback: (value) => {
              return `${value}%`; // Ajoutez un signe de pourcentage à la fin de chaque valeur
            },
          },
        },
      },
    },
  });
}

async function ChartJs() {
  let timeRangeValue = 'all'; // Initial time range value
  let portfolioFilterValue = 'Fundamental Portfolio'; // Initial portfolio filter value

  const timeRangeRadios = document.getElementsByName('range');
  const portfolioFilterRadios = document.getElementsByName('portfolio');

  for (const radio of timeRangeRadios) {
    radio.addEventListener('change', function () {
      timeRangeValue = this.value;
      drawChart(timeRangeValue, portfolioFilterValue);
    });
  }

  for (const radio of portfolioFilterRadios) {
    radio.addEventListener('change', function () {
      portfolioFilterValue = this.value;
      drawChart(timeRangeValue, portfolioFilterValue);
    });
  }

  drawChart(timeRangeValue, portfolioFilterValue); // Draw the initial chart
}

export { ChartJs };
