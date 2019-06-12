import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PrincipalComponent } from './Components/principal/principal.component';
import { CadastroFormularioComponent } from './Components/cadastro-formulario/cadastro-formulario.component';

import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { Lista100Component } from './Components/lista100/lista100.component';

@NgModule({
    declarations: [
        AppComponent,
        PrincipalComponent,
        CadastroFormularioComponent,
        Lista100Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientModule,
        ReactiveFormsModule,
        DropdownModule, TableModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
