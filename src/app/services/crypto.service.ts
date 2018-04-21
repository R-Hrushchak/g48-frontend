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

  private ab2str(buf: ArrayBuffer): String {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  private str2ab(str: String): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 bytes for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  getKeyAES(key: CryptoKey, password: String): PromiseLike<CryptoKey> {
    return window.crypto.subtle.importKey(
      'raw',
      this.str2ab(password),
      {
        name: 'PBKDF2'
      },
      false,
      ['deriveKey']
    )
      .then(function (baseKey) {
        return window.crypto.subtle.deriveKey(
          {
            'name': 'PBKDF2',
            'salt': new ArrayBuffer(8),
            'iterations': 1000,
            'hash': 'SHA-256'
          },
          baseKey,
          {'name': 'AES-CBC', 'length': 128},
          true,
          ['encrypt', 'decrypt']
        );
      });
  }

}
