// src/services/DeviceFingerprintService.js
import Fingerprint2 from 'fingerprintjs2';

export default {
  async generateDeviceFingerprint() {
    return new Promise((resolve, reject) => {
      if (window.requestIdleCallback) {
        requestIdleCallback(() => {
          Fingerprint2.get((components) => {
            const values = components.map((component) => component.value);
            const deviceFingerprint = Fingerprint2.x64hash128(values.join(''), 31);
            resolve(deviceFingerprint);
          });
        });
      } else {
        setTimeout(() => {
          Fingerprint2.get((components) => {
            const values = components.map((component) => component.value);
            const deviceFingerprint = Fingerprint2.x64hash128(values.join(''), 31);
            resolve(deviceFingerprint);
          });
        }, 500);
      }
    });
  },
};
