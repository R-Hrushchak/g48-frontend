import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { FilesOutgoingComponent } from './files-outgoing/files-outgoing.component';
import { FilesIncomingComponent } from './files-incoming/files-incoming.component';

const appRoutes: Routes = [
  {
    path: 'profile',
    component: UserProfileComponent
  },
  {
    path: 'files-incoming',
    component: FilesIncomingComponent
  },
  {
    path: 'files-outgoing',
    component: FilesOutgoingComponent
  },
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: UserProfileComponent}
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
