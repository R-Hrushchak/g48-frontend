import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpModule } from '@angular/http';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FileDropModule } from 'ngx-file-drop';
import { UserService } from './services/user.service';
import { FileService } from './services/file.service';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FilesIncomingComponent } from './files-incoming/files-incoming.component';
import { FilesOutgoingComponent } from './files-outgoing/files-outgoing.component';


@NgModule({
  declarations: [
    AppComponent, UserProfileComponent, FilesIncomingComponent, FilesOutgoingComponent
  ],
  imports: [
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FileDropModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [UserService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
