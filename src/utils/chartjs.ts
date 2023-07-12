import Chart from 'chart.js/auto';

// Chart 3
function ChartJs() {
  const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element=chart-3]').getContext('2d');
  if (!ctx3) return;

  Chart.defaults.color = '#00273f';
  Chart.defaults.borderColor = 'rgba(86, 141, 170, 0.1)';
  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['01-04', '02-04', '03-04', '04-04', '05-04', '06-04', '07-04'],
      datasets: [
        {
          label: 'Live Performance',
          data: [20, 4, 3, 5, 2, 3, 5],
          borderWidth: 2,
          borderColor: '#568DAA',
          pointRadius: 5,
          pointHoverRadius: 7.5,
          pointBackgroundColor: '#568daa',
          pointBorderWidth: 1,
          pointHitRadius: 15,
          tension: 0,
          fill: true,
          backgroundColor: 'rgba(86, 141, 170, 0.2)',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          min: 0,
          ticks: {
            callback: (value) => {
              return `${value} %`;
            },
          },
        },
      },
      /*       animations: {
        tension: {
          duration: 500,
          easing: 'linear',
          from: 1,
          to: 1,
          loop: true,
        },
      }, */
    },
  });

  /* // Chart 4
  const ctx4 = document.querySelector<HTMLCanvasElement>('[data-element=chart-4]');
  if (!ctx4) return;

  Chart.defaults.color = '#00273f';
  Chart.defaults.borderColor = '#fff';
  new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['Janv', 'Fev', 'Mar'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3],
          borderWidth: 1,
          fill: true,
          backgroundColor: '#00000029',
        },
      ],
    },
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  }); */
}

export { ChartJs };
