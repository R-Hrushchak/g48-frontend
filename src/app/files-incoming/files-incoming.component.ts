import { Component, OnInit } from '@angular/core';
import { FileService } from '../services/file.service';
import { CryptoService } from '../services/crypto.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-files-incoming',
  templateUrl: './files-incoming.component.html',
  styleUrls: ['./files-incoming.component.css']
})

export class FilesIncomingComponent implements OnInit {

  files: any[];

  constructor(private cryptoService: CryptoService, private fileService: FileService, private userService: UserService) {
  }

  private handleData(file) {
    return JSON.parse(file.attributes.message);
  }

  setData(data: any[]) {
    this.files = data['data'];

    for (let index in this.files) {
      this.files[index] = this.handleData(this.files[index]);
    }

  }

  getData() {
    const fileService = this.fileService;
    const userService = this.userService;
    const cryptoService = this.cryptoService;

    this.fileService.getFiles().then(result => this.setData(result));
    ;
  }

  ngOnInit() {
    this.files = [{attributes: {message: 'Medical History'}}];
    this.getData();
  }

}
