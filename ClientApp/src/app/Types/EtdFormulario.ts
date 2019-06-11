import { EdtCampo } from './EtdCampo';
import { EdtPreenchimento } from './EtdPreenchimento';

export class EtdFormulario {
    Id: number;
    Nome: string;

    Campos: EdtCampo[];
    Preenchimentos: EdtPreenchimento[];

}
