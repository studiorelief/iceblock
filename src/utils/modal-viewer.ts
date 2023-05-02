function loadModelViewerScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load model-viewer script'));
    document.head.appendChild(script);
  });
}

export { loadModelViewerScript };
