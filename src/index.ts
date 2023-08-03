import { chartDynamic } from '$utils/chartdynamic';
import { chartFundamental } from '$utils/chartfundamental';
import { chartInnovation } from '$utils/chartinnovation';
import { ChartJs } from '$utils/chartjs';
import { chartVision } from '$utils/chartvision';
import { updateAverages } from '$utils/dataCms';
import { loadAttributesScript } from '$utils/fs-attributes';
import { jqueryCC } from '$utils/jquery';
import { loadModelViewerScript } from '$utils/modal-viewer';

window.Webflow ||= [];
window.Webflow.push(() => {
  // Added console.log statement
  console.log('Hello World');

  // Load jQuery
  jqueryCC();

  // Load ChartJS
  ChartJs();

  // Load chart for CMS
  chartInnovation();
  chartVision();
  chartDynamic();
  chartFundamental();

  // Load static data for CMS
  updateAverages();

  // load modalviewser
  loadModelViewerScript();

  // Load Finsweet Attributes scripts
  Promise.all([
    loadAttributesScript(
      'https://cdn.jsdelivr.net/npm/@finsweet/attributes-accordion@1/accordion.js'
    ),
    loadAttributesScript(
      'https://cdn.jsdelivr.net/npm/@finsweet/attributes-inputactive@1/inputactive.js'
    ),
    loadAttributesScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-modal@1/modal.js'),
    loadAttributesScript(
      'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsfilter@1/cmsfilter.js'
    ),
    loadAttributesScript(
      'https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmsstatic@1/cmsstatic.js'
    ),
    loadAttributesScript('https://cdn.jsdelivr.net/npm/@finsweet/attributes-cmstabs@1/cmstabs.js'),
  ])
    .then(() => {
      console.log('All Finsweet Attributes scripts loaded');
    })
    .catch((error) => {
      console.error(error);
    });
});
