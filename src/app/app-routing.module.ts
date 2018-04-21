import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FilesOutgoingComponent } from './files-outgoing/files-outgoing.component';
import { FilesIncomingComponent } from './files-incoming/files-incoming.component';
import { AuthGuardService } from './services/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainComponent } from './main/main.component';

const appRoutes: Routes = [
  {
    path: 'dashboard',
    component: LandingPageComponent
  },
  {
    path: 'app',
    component: MainComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'files-incoming',
        component: FilesIncomingComponent,
        canActivate: [AuthGuardService]
      },
      {
        path: 'files-outgoing',
        component: FilesOutgoingComponent,
        canActivate: [AuthGuardService]
      }
    ]
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: LandingPageComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
