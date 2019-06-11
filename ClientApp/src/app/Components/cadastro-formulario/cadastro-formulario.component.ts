import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, Validators, FormGroup } from '@angular/forms';

import { FormularioService } from '../../Services/formulario.service';
import { EtdFormulario } from '../../Types/EtdFormulario';
import { EdtCampo } from 'src/app/Types/EtdCampo';

@Component({
    selector: 'app-cadastro-formulario',
    templateUrl: './cadastro-formulario.component.html',
})
export class CadastroFormularioComponent implements OnInit {
    Selecionado: EtdFormulario;
    UltimaOrdem: number;
    FrmCampo = new FormGroup({
        Id: new FormControl(0),
        IdFormulario: new FormControl(0),
        Ordem: new FormControl(0),
        Nome: new FormControl('', [Validators.required]),
        Tipo: new FormControl('subjetivo', [Validators.required]),
        TipoDado: new FormControl('text', [Validators.required]),
        Tamanho: new FormControl(100),
        Obrigatorio: new FormControl(true, [Validators.required]),
        strOpcoes: new FormControl('')
    });

    constructor(
        private route: ActivatedRoute,
        private frm: FormularioService) { }

    ngOnInit() {
        this.route.params.subscribe(prm => {
            if (prm.id) {
                this.frm.Busca(prm.id).subscribe(p => {
                    this.Selecionado = p;
                    this.CalulaUltimaOrdem();
                });
            } else {
                this.Selecionado = new EtdFormulario();
                this.Selecionado.Id = 0;
            }
        });
    }

    SalvaForm(): void {
        this.frm.Grava(this.Selecionado).subscribe(p => {
            this.frm.Busca(p.Id).subscribe(q => {
                this.Selecionado = q;
                this.CalulaUltimaOrdem();
            });
        });
    }

    ResetaFormCampo(): void {
        this.FrmCampo.reset({
            Id: 0,
            IdFormulario: 0,
            Ordem: 0,
            Nome: '',
            Tipo: 'subjetivo',
            TipoDado: 'text',
            Tamanho: 100,
            Obrigatorio: true,
            strOpcoes: ''
        });
    }

    GravaCampo(): void {
        this.FrmCampo.controls.IdFormulario.setValue(this.Selecionado.Id);
        this.frm.GravaCampo(this.FrmCampo.value).subscribe(p => {
            this.Selecionado.Campos = p;
            this.CalulaUltimaOrdem();
            this.ResetaFormCampo();
        });
    }

    AjustaFormCampo(item: EdtCampo): void {
        this.FrmCampo.reset({
            Id: item.Id,
            IdFormulario: item.IdFormulario,
            Ordem: item.Ordem,
            Nome: item.Nome,
            Tipo: item.Tipo,
            Tamanho: item.Tamanho,
            Obrigatorio: item.Obrigatorio,
            strOpcoes: item.strOpcoes
        });
    }

    ExcluiCampo(id: number): void {
        this.frm.ExcluiCampo(id).subscribe(p => {
            this.Selecionado.Campos = p;
            this.CalulaUltimaOrdem();
            this.ResetaFormCampo();
        });
    }

    MoveCampo(id: number, up: boolean) {
        this.frm.MoveCampo(id, up).subscribe(p => {

            this.Selecionado.Campos = p;
            this.CalulaUltimaOrdem();
            this.ResetaFormCampo();
        });

    }

    private CalulaUltimaOrdem() {
        this.UltimaOrdem = 0;
        let x = 0;
        this.Selecionado.Campos.forEach(function (item) {
            // console.log(item.Ordem);
            x = item.Ordem;
        });
        this.UltimaOrdem = x;
    }

}
