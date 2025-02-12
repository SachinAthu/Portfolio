self.addEventListener('message', (event) => {
  fetch(event.data)
    .then((response) => response.arrayBuffer())
    .then((arrayBuffer) => {
      self.postMessage({ action: 'loaded', buffer: arrayBuffer });
    })
    .catch((error) => {
      self.postMessage({ action: 'loadError', error: error.message });
    });
});
