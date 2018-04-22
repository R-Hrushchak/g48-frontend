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

  ab2str(buf: ArrayBuffer): string {
    return String.fromCharCode.apply(null, new Uint16Array(buf));
  }

  str2ab(str: string): ArrayBuffer {
    const buf = new ArrayBuffer(str.length * 2); // 2 key for each char
    const bufView = new Uint16Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }

  getKeyAES(password: string) {
    const stringToArrayBuffer = this.str2ab;
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

  protectKey(keyToProtect: CryptoKey, password) {
    const stringToArrayBuffer = this.str2ab;
    const arrayBufferToString = this.ab2str;

    return this.getKeyAES(password).then(function (aesKey) {
      // this.cryptoService.crypto.subtle.exportKey('jwk', aesKey)

      return crypto.subtle.exportKey('jwk', keyToProtect)
        .then(function (exportedPrivateKey) {
          return window.crypto.subtle.encrypt(
            {
              name: 'AES-CBC',
              iv: window.crypto.getRandomValues(new Uint8Array(16)),
            },
            aesKey,
            stringToArrayBuffer(JSON.stringify(exportedPrivateKey))
          )
            .then(function (encryptedKey) {
              return crypto.subtle.exportKey('jwk', aesKey)
                .then(function (exportedAESKey) {
                  return {protectedPrivateKey: arrayBufferToString(encryptedKey).valueOf(), aesKey: exportedAESKey};
                });
            });
        });
    });
  }

}
