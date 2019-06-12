using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Formularios.api
{
    [Route("api/[controller]")]
    [ApiController]
    public class FormularioController : ControllerBase
    {
        [HttpPost("[action]")]
        public JObject Grava([FromBody] Dados.EtdFormulario item)
        {
            using (var db = new Dados.DB())
            {
                if (item.Id == 0)
                {
                    db.Entry(item).State = EntityState.Added;
                    db.SaveChanges();
                    return JObject.FromObject(item);
                }
                else
                {
                    var localizado = db.Formulario.Find(item.Id);
                    if (localizado == null)
                        throw new Exception("Formulário não localizado");
                    localizado.Nome = item.Nome;
                    db.Update(localizado);
                    db.SaveChanges();
                    return JObject.FromObject(localizado);
                }
            }
        }

        [HttpGet("[action]")]
        public JArray Lista()
        {
            using (var db = new Dados.DB())
            {
                return JArray.FromObject(db.Formulario.ToList());
            }
        }

        [HttpGet("[action]/{id}")]
        public JObject Busca(int id)
        {
            using (var db = new Dados.DB())
            {
                Dados.EtdFormulario localizado = db.Formulario.Where(p => p.Id == id).Include(p => p.Campos).FirstOrDefault();
                if (localizado == null)
                    throw new Exception("Formulário não localizado");
                localizado.Campos = localizado.Campos.OrderBy(p => p.Ordem).ToList();
                return JObject.FromObject(localizado);
            }
        }

        [HttpPost("[action]")]
        public JArray GravaCampo([FromBody] Dados.EtdCampos item)
        {
            using (var db = new Dados.DB())
            {
                if (item.Id == 0)
                {

                    item.Ordem = (int)db.Campo.Where(p => p.IdFormulario == item.IdFormulario).Count() + 1;
                    db.Entry(item).State = EntityState.Added;
                    db.SaveChanges();
                }
                else
                {
                    Dados.EtdCampos localizado = db.Campo.Find(item.Id);
                    if (localizado == null)
                        throw new Exception("item não localizado");
                    localizado.Nome = item.Nome;
                    localizado.Obrigatorio = item.Obrigatorio;
                    localizado.Tipo = item.Tipo;
                    localizado.TipoDado = item.TipoDado;
                    localizado.Tamanho = item.Tamanho;
                    localizado.strOpcoes = item.strOpcoes;
                    db.Update(localizado);
                    db.SaveChanges();

                }
                return JArray.FromObject(db.Campo.Where(p => p.IdFormulario == item.IdFormulario).OrderBy(p => p.Ordem).ToList());
            }

        }

        [HttpGet("[action]/{id}")]
        public JArray ExcluiCampo(int id)
        {
            using (var db = new Dados.DB())
            {
                Dados.EtdCampos localizado = db.Campo.Where(p => p.Id == id).Include(p => p.Formulario).FirstOrDefault();
                if (localizado == null)
                    throw new Exception("campo não localizado");
                Dados.EtdFormulario form = db.Formulario.Where(p => p.Id == localizado.Formulario.Id).Include(p => p.Campos).FirstOrDefault();
                form.Campos.Remove(localizado);
                int ct = 1;
                foreach (var cp in form.Campos.OrderBy(p => p.Ordem))
                {
                    cp.Ordem = ct;
                    ct++;
                }
                db.Update(form);
                db.SaveChanges();
                return JArray.FromObject(form.Campos.OrderBy(p => p.Ordem).ToList());
            }
        }

        [HttpGet("[action]/{id}/{up}")]
        public JArray MoveCampo(int id, bool up)
        {
            using (var db = new Dados.DB())
            {
                Dados.EtdCampos campo = db.Campo.Find(id);
                if (campo == null)
                    throw new Exception("campo não localizado");
                Dados.EtdFormulario form = db.Formulario.Where(p => p.Id == campo.IdFormulario).Include(p => p.Campos).FirstOrDefault();
                if (!up & form.Campos.Max(p => p.Ordem) == campo.Ordem)
                    throw new Exception("o campo já é o último");
                if (up & form.Campos.Min(p => p.Ordem) == campo.Ordem)
                    throw new Exception("O campo já é o primeiro");

                Dados.EtdCampos campoalvo = form.Campos.Where(p => p.Id == campo.Id).FirstOrDefault();
                Dados.EtdCampos campotroca;
                if (up)
                {
                    campotroca = form.Campos.Where(p => p.Ordem == campo.Ordem - 1).FirstOrDefault();
                    campoalvo.Ordem -= 1;
                    campotroca.Ordem += 1;
                }
                else
                {
                    campotroca = form.Campos.Where(p => p.Ordem == campo.Ordem + 1).FirstOrDefault();
                    campoalvo.Ordem += 1;
                    campotroca.Ordem -= 1;
                }
                db.Update(form);
                db.SaveChanges();
                return JArray.FromObject(form.Campos.OrderBy(p => p.Ordem).ToList());
            }
        }

        [HttpPost("[action]")]
        public JObject GravaPreenchimento([FromBody] JObject preenchimento)
        {
            using (var db = new Dados.DB())
            {
                int? id = preenchimento["Id"]?.ToObject<int>();
                JObject conteudo = (JObject)preenchimento["Conteudo"];
                if (id == null || conteudo == null)
                    throw new Exception("valores de preencimento incorretos");
                var formulario = db.Formulario.Find(id);
                if (formulario == null)
                    throw new Exception("id do formulário não localizado");

                Dados.EtdPreenchimento form = new Dados.EtdPreenchimento();
                form.IdFormulario = (int)id;
                form.Hora = DateTime.Now;
                form.IP = Request.HttpContext.Connection.RemoteIpAddress.ToString();
                form.Preenchimento = conteudo.ToString();
                db.Entry(form).State = EntityState.Added;
                db.SaveChanges();
                JObject retorno = JObject.FromObject(form);
                retorno["Formulario"] = JObject.FromObject(formulario);
                return retorno;
            }
        }

        [HttpGet("[action]/{id}")]
        public JObject Ultimos100(int id)
        {
            JObject retorno = new JObject();
            using (var db = new Dados.DB())
            {
                var formulario = db.Formulario.Where(p => p.Id == id).Include(p => p.Campos).FirstOrDefault();
                if (formulario == null)
                    throw new Exception("formulário não localizado");
                System.Text.StringBuilder sql = new System.Text.StringBuilder();
                sql.Append("select id, hora, ip ");

                JArray colunas = new JArray();
                colunas.Add(JObject.Parse("{'header':'Id', 'field':'id'}"));
                colunas.Add(JObject.Parse("{'header':'Hora', 'field':'hora'}"));
                colunas.Add(JObject.Parse("{'header':'IP', 'field':'ip'}"));
                foreach (Dados.EtdCampos campo in formulario.Campos.OrderBy(p => p.Ordem))
                {
                    JObject coluna = new JObject();
                    coluna["header"] = campo.Nome;
                    coluna["field"] = campo.NomeUtil;
                    colunas.Add(coluna);
                    sql.AppendFormat(", preenchimento->\'{0}\' as \"{1}\"", campo.NomeUtil, campo.Nome);
                }

                sql.Append(" from preenchimento order by id desc limit 100");
                retorno["sql"] = sql.ToString();
                retorno["colunas"] = colunas;
                retorno["formulario"] = JObject.FromObject(formulario);
                var valores = db.Preenchimento.Where(p => p.IdFormulario == id).OrderByDescending(p => p.Id).Take(100);
                JArray linhas = new JArray();
                foreach (var vlr in valores)
                {
                    JObject linha = new JObject();
                    linha["id"] = vlr.Id;
                    linha["hora"] = vlr.Hora;
                    linha["ip"] = vlr.IP;
                    JObject valcolunas = JObject.Parse(vlr.Preenchimento);
                    foreach (var campo in formulario.Campos)
                    {
                        try
                        {
                            linha[campo.NomeUtil] = valcolunas[campo.NomeUtil];
                        }
                        catch (Exception ex)
                        {

                        }

                    }
                    linhas.Add(linha);
                }
                retorno["dados"] = linhas;


                return retorno;
            }

        }
    }
}