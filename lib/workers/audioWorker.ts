import { MusicTrackType } from '../types';

self.addEventListener('message', (event: MessageEvent<MusicTrackType>) => {
  fetch(event.data.path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.arrayBuffer();
    })
    .then((arrayBuffer) => {
      self.postMessage({ action: 'loaded', buffer: arrayBuffer, track: event.data });
    })
    .catch((error) => {
      self.postMessage({ action: 'loadError', error: error.message, track: event.data });
    });
});
