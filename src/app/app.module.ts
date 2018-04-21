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
import { AuthHttpService } from './services/auth-http.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { CryptoService } from './services/crypto.service';
import { PublicKeyService } from './services/public-key.service';
import { PrivateKeyService } from './services/private-key.service';


@NgModule({
  declarations: [
    AppComponent, LoginComponent, UserProfileComponent, FilesIncomingComponent, FilesOutgoingComponent
  ],
  imports: [
    NgbModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    FileDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [AuthHttpService, AuthService, AuthGuardService, CryptoService, PublicKeyService, PrivateKeyService, UserService, FileService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
