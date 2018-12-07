import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MatToolbarModule, MatSidenavModule, MatTableModule, MatButtonModule, MatFormFieldModule,
  MatOptionModule, MatSelectModule, MatInputModule, MatTabsModule, MatCheckboxModule,
  MatDatepickerModule, MatNativeDateModule, MatCardModule, MatIconModule, MatRadioModule } from '@angular/material';
import { HomeComponent } from './pages/home/home.component';
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatButtonModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatTabsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [
    RestApiService,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
