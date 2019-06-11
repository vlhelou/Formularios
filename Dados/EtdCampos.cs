using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace Formularios.Dados
{
    [Table("campos", Schema = "public")]
    public class EtdCampos
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("idformulario")]
        public int IdFormulario { get; set; }
        [Column("ordem")]
        public int Ordem { get; set; }
        [Column("nome")]
        public string Nome { get; set; }
        public string NomeUtil {  get
            {
                Regex rgx = new Regex("[^a-zA-Z0-9-]");
                return rgx.Replace(Nome, "");
            }
        }
        [Column("tipo")]
        public string Tipo { get; set; }

        [Column("tipodado")]
        public string TipoDado { get; set; }

        [Column("tamanho")]
        public int? Tamanho { get; set; }
        [Column("obrigatorio")]
        public bool Obrigatorio { get; set; }
        [Column("opcoes")]
        public string strOpcoes { get; set; }

        public string[] Opcoes => strOpcoes.Split(';');

        [JsonIgnore]
        [ForeignKey("IdFormulario")]
        public EtdFormulario Formulario { get; set; }
    }
}
