import {EtdFormulario} from './EtdFormulario';
export class EdtCampo {
    Id: number;
    IdFormulario: number;
    Ordem: number;
    Nome: string;
    NomeUtil: string;
    Tipo: string;
    TipoDado: string;
    Tamanho: number;
    Obrigatorio: boolean;
    strOpcoes: string;
    Opcoes: string[];

    Formulario: EtdFormulario;
}
