import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';

@Component({
  selector: 'app-files-outgoing',
  templateUrl: './files-outgoing.component.html',
  styleUrls: ['./files-outgoing.component.css']
})

export class FilesOutgoingComponent implements OnInit {

  constructor(private fileService: FileService, private router: Router) {
  }

  ngOnInit() {

  }

}
