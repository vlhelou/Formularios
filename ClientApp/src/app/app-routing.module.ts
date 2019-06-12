import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './Components/principal/principal.component';
import { CadastroFormularioComponent } from './Components/cadastro-formulario/cadastro-formulario.component';
import { Lista100Component } from './Components/lista100/lista100.component';
const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PrincipalComponent },
    { path: 'cadastro', component: CadastroFormularioComponent },
    { path: 'cadastro/:id', component: CadastroFormularioComponent },
    { path: 'lista100/:id', component: Lista100Component },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
