import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-files-incoming',
  templateUrl: './files-incoming.component.html',
  styleUrls: ['./files-incoming.component.css']
})

export class FilesIncomingComponent implements OnInit {

  constructor(private fileService: FileService, private router: Router) {
  }

  ngOnInit() {

  }

}
