import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CryptoService } from '../services/crypto.service';
import { PrivateKeyService } from '../services/private-key.service';
import { PublicKeyService } from '../services/public-key.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  userForm: FormGroup;

  encryptionPassword: string;

  constructor(private userService: UserService,
              private cryptoService: CryptoService,
              private privateKeyService: PrivateKeyService,
              private publicKeyService: PublicKeyService,
              private router: Router, private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      email: null,
      password: null
    });
  }

  updateEncryptionKey() {
    this.cryptoService.keyPairGenerate()
      .then(keyPair => this.parseKeyPair(keyPair));
  }

  parseKeyPair(keyPair: CryptoKeyPair) {
    crypto.subtle.exportKey('jwk', keyPair.publicKey)
      .then(key => this.publicKeyService.createEncryptionKey({key: JSON.stringify(key)}));

    this.cryptoService.protectKey(keyPair.privateKey, this.encryptionPassword)
      .then(keys => this.privateKeyService
        .createEncryptionKey({key: JSON.stringify(keys.protectedPrivateKey), aes_key: JSON.stringify(keys.aesKey)}));
  }

  ngOnInit() {
    this.encryptionPassword = 'test';
  }

}
