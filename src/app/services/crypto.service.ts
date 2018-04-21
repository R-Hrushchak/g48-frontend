import { Injectable } from '@angular/core';

@Injectable()
export class CryptoService {

  keyPairGenerate(): Promise<CryptoKeyPair> {
    const keyDetails = {
      'name': 'RSA-OAEP',
      modulusLength: 2048, // can be 1024, 2048, or 4096
      publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
      'hash': {name: 'SHA-256'}
    };
    return new Promise((resolve, reject) => {
      window.crypto.subtle.generateKey(keyDetails, true, ['encrypt', 'decrypt']).then((key) => {
        resolve(key);
      });
    });
  }

}
