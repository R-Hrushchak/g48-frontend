<<<<<<< HEAD
import { Component } from '@angular/core';
=======
///<reference path="../../../node_modules/@angular/core/src/metadata/directives.d.ts"/>
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from '../services/file.service';
>>>>>>> aa5a3fddeb379b496c69cd4e6f9a4b4daf6fa404

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
<<<<<<< HEAD
export class LandingPageComponent {

  constructor() {
=======

export class LandingPageComponent implements OnInit {

  constructor(private fileService: FileService, private router: Router) {
  }

  ngOnInit() {

>>>>>>> aa5a3fddeb379b496c69cd4e6f9a4b4daf6fa404
  }

}
