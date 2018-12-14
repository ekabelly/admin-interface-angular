import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

//modules
import { AppRoutingModule } from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

//services
import { DataService } from './services/data.service';

//component
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { LogoWrapperComponent } from './side-nav/logo-wrapper/logo-wrapper.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { EventsComponent } from './content/events/events.component';
import { PaginationComponent } from './pagination/pagination.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { PaginationPipe } from './pipes/pagination.pipe';
import { EventDetailsComponent } from './content/event-details/event-details.component';
import { EditEventComponent } from './content/events-details/edit-event/edit-event.component';
import { VolunteersComponent } from './content/events-details/volunteers/volunteers.component';


// angular material
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatInputModule } from "@angular/material";
import { MatCardModule } from '@angular/material/card';
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PaginationComponent,
    SideNavComponent,
    LogoWrapperComponent,
    ErrorPageComponent,
    EventsComponent,
    SpinnerComponent,
    PaginationPipe,
    EventDetailsComponent,
    EditEventComponent,
    VolunteersComponent,
    TestComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    //angular material
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule
  ],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [
    DataService,
    //angular material
    MatDatepickerModule,
    MatInputModule, 
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
