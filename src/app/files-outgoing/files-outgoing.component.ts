import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';
import { UserService } from '../services/user.service';
import { CryptoService } from '../services/crypto.service';
import { User } from '../entities/user';

@Component({
  selector: 'app-files-outgoing',
  templateUrl: './files-outgoing.component.html',
  styleUrls: ['./files-outgoing.component.css']
})

export class FilesOutgoingComponent implements OnInit {

  recipient: string;

  data: string;

  constructor(private cryptoService: CryptoService, private fileService: FileService, private userService: UserService) {
  }

  sendData() {
    const fileService = this.fileService;
    const userService = this.userService;
    const cryptoService = this.cryptoService;
    const recipientName = this.recipient;
    const data = this.data;

    userService.getUser(recipientName).then(function (recipient) {
      const publicKeyJSON = JSON.parse(recipient.public_key.key).key;
      crypto.subtle.importKey('jwk',
        JSON.parse(publicKeyJSON),
        {
          name: 'RSA-OAEP',
          hash: {name: 'SHA-256'},
        },
        false,
        ['encrypt']
      ).then(function (publicKey) {
        console.log(publicKey);
        crypto.subtle.encrypt({
            name: 'RSA-OAEP',
          },
          publicKey,
          cryptoService.str2ab(data),
        ).then(function (encryptedData) {
          const dataToStore = cryptoService.ab2str(encryptedData);
          const recipientId = recipient.user.id;
          fileService.createEncryptedFile(recipientId, {message: JSON.stringify(dataToStore)});
        });
      });
    });
  }

  ngOnInit() {
    this.recipient = 'test';
    this.data = 'Information to save';
  }

}
