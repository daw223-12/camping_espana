import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


import { TextFieldModule, CdkTextareaAutosize  } from '@angular/cdk/text-field';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarkerService } from './services/marker.service';
import { ShapeService } from './services//shape.service';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { MapPageComponent } from './pages/map-page/map-page.component';
import { UserPageComponent } from './pages/user-page/user-page.component';
import { HeaderComponent } from './components/header/header.component';
import { MapComponent } from './components/map/map.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { ReviewComponent } from './components/review/review.component';
import { ReviewContainerComponent } from './components/review-container/review-container.component';
import { NumberRequestsComponent } from './components/number-requests/number-requests.component';
import { UserComponent } from './components/user/user.component';
import { UsersFollowedComponent } from './components/users-followed/users-followed.component';
import { UsersSearchComponent } from './components/users-search/users-search.component';
import { UsersSearchPopupComponent } from './components/users-search-popup/users-search-popup.component';
import { ReviewEditPopupComponent } from './components/review-edit-popup/review-edit-popup.component';
import { ReviewNewPopupComponent } from './components/review-new-popup/review-new-popup.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MapPageComponent,
    UserPageComponent,
    HeaderComponent,
    MapComponent,
    FooterComponent,
    NotFoundPageComponent,
    LoginFormComponent,
    RegisterFormComponent,
    ReviewComponent,
    ReviewContainerComponent,
    UserComponent,
    NumberRequestsComponent,
    UsersFollowedComponent,
    UsersSearchComponent,
    UsersSearchPopupComponent,
    ReviewEditPopupComponent,
    ReviewNewPopupComponent,
  ],
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatToolbarModule,
    MatDividerModule,
    MatTooltipModule,
    MatExpansionModule,
    MatDialogModule,
    MatSliderModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    TextFieldModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [MarkerService, ShapeService, CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
