import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FormularioService } from '../../Services/formulario.service';
import { EtdFormulario } from '../../Types/EtdFormulario';

@Component({
    selector: 'app-principal',
    templateUrl: './principal.component.html',
    providers: [FormularioService]
})

export class PrincipalComponent implements OnInit {
    Lista: EtdFormulario[] = [];
    Execucoes: any[] = [];
    Formulario: EtdFormulario;
    FrmGroup: FormGroup;
    ShowForm = false;
    constructor(private form: FormularioService) { }

    ngOnInit() {
        this.form.Lista().subscribe(p => this.Lista = p);
    }

    CriaForm(id: number): void {
        this.form.Busca(id).subscribe(p => {
            this.Formulario = p;
            const grupo = {};
            this.Formulario.Campos.forEach(campo => {
                grupo[campo.NomeUtil] = new FormControl('');
            });
            this.FrmGroup = new FormGroup(grupo);
            this.ShowForm = true;
        });
    }


    ZeraForm(): void {
        const grupo = {};
        this.Formulario.Campos.forEach(campo => {
            grupo[campo.NomeUtil] = new FormControl('');
        });
        this.FrmGroup = new FormGroup(grupo);
        this.ShowForm = true;
    }

    GravaForm(): void {
        this.form.GravaPreenchimento(this.Formulario.Id, this.FrmGroup.value).subscribe(p => {
            this.Execucoes.push(p);
            this.ZeraForm();
        });

    }
}
