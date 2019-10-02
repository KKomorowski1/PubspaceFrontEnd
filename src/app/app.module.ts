import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavigationComponent} from './navigation/navigation.component';
import {FeedbackComponent} from './feedback/feedback.component';
import {PubsComponent} from './pubs/pubs.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatRadioModule} from "@angular/material";
import {registerLocaleData} from '@angular/common';
import localePl from '@angular/common/locales/pl';
import {provideConfig} from 'socialloginConfig';

import {
  SocialLoginModule,
  AuthServiceConfig,
} from 'angular5-social-login';
import {MatCardModule} from "@angular/material/card";

registerLocaleData(localePl);

const appRoutes: Routes = [
  {
    path: 'pubs',
    component: PubsComponent
  },
  {
    path: 'feedback',
    component: FeedbackComponent
  },
  {
    path: '',
    component: PubsComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FeedbackComponent,
    PubsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(appRoutes, {enableTracing: true}),
    FormsModule,
    HttpClientModule,
    MatRadioModule,
    SocialLoginModule,
    MatCardModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'pl'
    },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
