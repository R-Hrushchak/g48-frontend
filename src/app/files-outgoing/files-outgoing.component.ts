import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { UserService } from '../services/user.service';
import { CryptoService } from '../services/crypto.service';

@Component({
  selector: 'app-files-outgoing',
  templateUrl: './files-outgoing.component.html',
  styleUrls: ['./files-outgoing.component.css']
})

export class FilesOutgoingComponent implements OnInit {

  recipientId: string;

  data: string;

  constructor(private cryptoService: CryptoService, private fileService: FileService, private userService: UserService) {
  }

  sendData() {
    const cryptoService = this.cryptoService;
    const dataToEncrypt = this.data;
    // getPublicKey
    const recipientPublicKeyStored = localStorage.getItem('public_key'); // replace with Rest API taken by username
    if (recipientPublicKeyStored === null) {
      return console.log('cant get public key from storage');
    }

    const recipientPublicKey = JSON.parse(recipientPublicKeyStored);

    crypto.subtle.importKey('jwk',
      recipientPublicKey,
      {
        name: 'RSA-OAEP',
        hash: {name: 'SHA-256'},
      },
      false,
      ['encrypt']
    ).then(function (publicKey) {
      crypto.subtle.encrypt({
          name: 'RSA-OAEP',
        },
        publicKey,
        cryptoService.str2ab(dataToEncrypt),
      ).then(function (encryptedData) {
        console.log(cryptoService.ab2str(encryptedData));
      });
    });
  }

  ngOnInit() {
    this.recipientId = 'test';
    this.data = 'Information to save';
  }

}
