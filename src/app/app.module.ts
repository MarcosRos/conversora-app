import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule ,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConversorComponent } from './components/conversor/conversor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//PrimeNG
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CardModule } from 'primeng/card';
import { RadioButtonModule } from 'primeng/radiobutton';
import { FieldsetModule } from 'primeng/fieldset';
import { SlideMenuModule } from 'primeng/slidemenu';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [
    AppComponent,
    ConversorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,BrowserAnimationsModule, FormsModule, ReactiveFormsModule, ButtonModule,InputTextModule,ToggleButtonModule,CardModule,RadioButtonModule,FieldsetModule,SlideMenuModule,AccordionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
