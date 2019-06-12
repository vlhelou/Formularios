using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace Formularios.Dados
{
    [Table("preenchimento", Schema = "public")]
    public class EtdPreenchimento
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("idformulario")]
        public int IdFormulario { get; set; }

        [Column("hora")]
        public DateTime Hora { get; set; } = DateTime.Now;

        [Column("preenchimento", TypeName = "jsonb")]
        public string Preenchimento { get; set; }

        [Column("ip")]
        public string IP { get; set; }

        [JsonIgnore]
        [ForeignKey("IdFormulario")]
        public EtdFormulario Formulario { get; set; }

    }
}
