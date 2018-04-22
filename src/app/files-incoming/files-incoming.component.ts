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
    let parsedJSON = JSON.parse(file.attributes.message);
    parsedJSON['message_decrypted'] = 'Information to save';
    parsedJSON['message'] = '⽠᜷鋔崷ⱽ뫜〺襐⮆堳엕⍖♔刃팒�繖ត漄禲✥纭땷䢿఻較㧣循윱卝ﭔ鞴㱷褍吏佀쀵悛拇錅繰삌⒗�䡠䌷�ꆼ릲⬢�釒牗䳓䖊Ꝗ홪ᆼ찗懶പ㐕Ǐ᫱訒㨛귤鍴벬暭縰ࣤ�靔譪褂秹趴鷴ꗰើⰳ촕醙௧킯埧藕윊辁ు鶬㉍꯺�ή苪僱꺗뙿燊깭裘䐆툗ᴥ鿬㚟⅏귶孱璉Ⴑᨉ䥸ﴵ특ﴉ';
    return parsedJSON;
  }

  /*
    private handleData(file) {
      let parsedJSON = JSON.parse(file.attributes.message);
      parsedJSON['message_decrypted'] = 'Information to save';

      parsedJSON['message'] = parsedJSON['message'].substr(1, parsedJSON['message'].length - 2);

      // decrypt message

      const fileService = this.fileService;
      const userService = this.userService;
      const cryptoService = this.cryptoService;

      const privateKeyJSON = localStorage.getItem('private_key');

      crypto.subtle.importKey('jwk',
        JSON.parse(privateKeyJSON),
        {
          name: 'RSA-OAEP',
          hash: {name: 'SHA-256'},
        },
        false,
        ['decrypt']
      ).then(function (privateKey) {
        crypto.subtle.decrypt({
            name: 'RSA-OAEP',
          },
          privateKey,
          cryptoService.str2ab(parsedJSON['message'])
        )
          .then(function (result) {
            console.log(cryptoService.ab2str(result));
            parsedJSON['message_decrypted'] = result;
          });
      });

      return parsedJSON;
    }
*/
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
  }

  ngOnInit() {
    this.files = [{attributes: {message: 'Medical History'}}];
    this.getData();
  }

}
