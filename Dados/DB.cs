using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Formularios.Dados
{
    public class DB : DbContext
    {
        public static string StrCnn;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql(StrCnn);
        }


        public virtual DbSet<EtdCampos> Campo { get; set; }
        public virtual DbSet<EtdFormulario> Formulario { get; set; }
        public virtual DbSet<EtdPreenchimento> Preenchimento { get; set; }
    }
}
