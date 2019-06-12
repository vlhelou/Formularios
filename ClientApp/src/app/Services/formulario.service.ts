import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

import { EtdFormulario } from '../Types/EtdFormulario';
import { EdtCampo } from '../Types/EtdCampo';

const httpOptions: any = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const PathUrl = environment.root + 'api/formulario/';

@Injectable({
    providedIn: 'root'
})
export class FormularioService {

    constructor(private http: HttpClient) { }

    Grava(item: EtdFormulario): Observable<any> {
        const url: string = PathUrl + 'Grava';
        return this.http.post<EtdFormulario>(url, item, httpOptions);
    }

    Lista(): Observable<EtdFormulario[]> {
        const url: string = PathUrl + 'Lista';
        return this.http.get<EtdFormulario[]>(url);
    }

    Busca(id: number): Observable<EtdFormulario> {
        const url: string = PathUrl + `Busca/${id}`;
        return this.http.get<EtdFormulario>(url);
    }

    GravaCampo(item: EdtCampo): Observable<any> {
        const url: string = PathUrl + 'GravaCampo';
        return this.http.post<EdtCampo[]>(url, item, httpOptions);
    }

    ExcluiCampo(id: number): Observable<EdtCampo[]> {
        const url: string = PathUrl + `ExcluiCampo/${id}`;
        return this.http.get<EdtCampo[]>(url);
    }

    MoveCampo(id: number, up: boolean): Observable<EdtCampo[]> {
        const url: string = PathUrl + `MoveCampo/${id}/${up}`;
        return this.http.get<EdtCampo[]>(url);
    }

    GravaPreenchimento(id: number, conteudo: any): Observable<any> {
        const url: string = PathUrl + `GravaPreenchimento`;
        const prm = { Id: id, Conteudo: conteudo };
        return this.http.post<any>(url, prm, httpOptions);
    }

    Ultimos100(id: number): Observable<any> {
        const url: string = PathUrl + `Ultimos100/${id}`;
        return this.http.get<any>(url);
    }

}
