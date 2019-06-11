using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Formularios.Dados
{
    [Table("formulario", Schema = "public")]
    public class EtdFormulario
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
        [Column("nome")]
        public string Nome { get; set; }

        [InverseProperty("Formulario")]
        public ICollection<EtdCampos> Campos { get; set; }

        [InverseProperty("Formulario")]
        public ICollection<EtdPreenchimento> Preenchimentos { get; set; }

    }
}
