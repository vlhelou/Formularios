import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormularioService } from '../../Services/formulario.service';

@Component({
    selector: 'app-lista100',
    templateUrl: './lista100.component.html',
})
export class Lista100Component implements OnInit {
    Relatorio: any;
    constructor(
        private route: ActivatedRoute,
        private frm: FormularioService) { }

    ngOnInit() {
        this.route.params.subscribe(prm => {
            if (prm.id) {
                this.frm.Ultimos100(prm.id).subscribe(p => {
                    this.Relatorio = p;
                    console.log(this.Relatorio);
                });
            }
        });

    }

}
