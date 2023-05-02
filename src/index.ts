import Chart from 'chart.js/auto';

import { loadModelViewerScript } from '$utils/modal-viewer';

window.Webflow ||= [];
window.Webflow.push(() => {
  // load modalviewser
  loadModelViewerScript()
    .then(() => {
      console.log('Model viewer script loaded successfully');
    })
    .catch((error) => {
      console.error('Error loading model viewer script:', error);
    });

  // Chart JS example

  /* // Chart 1
  const ctx1 = document.querySelector<HTMLCanvasElement>('[data-element=chart-1]');
  if (!ctx1) return;
  new Chart(ctx1, {
    type: 'bar',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });

  // Chart 2
  const data = [
    { year: 2010, count: 10 },
    { year: 2011, count: 20 },
    { year: 2012, count: 15 },
    { year: 2013, count: 25 },
    { year: 2014, count: 22 },
    { year: 2015, count: 30 },
    { year: 2016, count: 28 },
  ];
  const ctx2 = document.querySelector<HTMLCanvasElement>('[data-element=chart-2]');
  if (!ctx2) return;

  new Chart(ctx2, {
    type: 'bar',
    data: {
      labels: data.map((row) => row.year),
      datasets: [
        {
          label: 'Acquisitions by year',
          data: data.map((row) => row.count),
        },
      ],
    },
  }); */

  // Chart 3

  const ctx3 = document.querySelector<HTMLCanvasElement>('[data-element=chart-3]').getContext('2d');
  if (!ctx3) return;

  Chart.defaults.color = '#00273f';
  Chart.defaults.borderColor = '#fff';

  const gradientBg = ctx3.createLinearGradient(0, 0, '400', '400');
  // x0 = starting point of the gradient in the canvas horizontal (left)
  // y0 = starting point vertical (top)
  // x1 = ending point (right)
  // y1 = (bottom)

  gradientBg.addColorStop(0, '#81e5fe');
  gradientBg.addColorStop(0.7, '#00273f');
  gradientBg.addColorStop(1, '#00273f');

  new Chart(ctx3, {
    type: 'line',
    data: {
      labels: ['01-04', '02-04', '03-04', '04-04', '05-04', '06-04', '07-04'],
      datasets: [
        {
          label: 'Live Performance',
          data: [12, 19, 3, 5, 2, 3, 5],
          borderWidth: 2,
          borderColor: '#81E5FE',
          pointRadius: 5,
          pointHoverRadius: 7.5,
          pointBackgroundColor: '#00273f',
          pointBorderWidth: 1,
          pointHitRadius: 15,
          tension: 0.5,
          fill: true,
          backgroundColor: gradientBg,
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
          min: -5,
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

  // Chart 4
  const ctx4 = document.querySelector<HTMLCanvasElement>('[data-element=chart-4]');
  if (!ctx4) return;
  new Chart(ctx4, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
});
