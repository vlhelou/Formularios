import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrincipalComponent } from './Components/principal/principal.component';
import { CadastroFormularioComponent } from './Components/cadastro-formulario/cadastro-formulario.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: PrincipalComponent },
    { path: 'cadastro', component: CadastroFormularioComponent },
    { path: 'cadastro/:id', component: CadastroFormularioComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
