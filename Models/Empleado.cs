using Dapper;
namespace Midas.Models
{
    public class Empleado
    {
        public string EMPLEADO { get; set; }
        public string NOMBRE { get; set; }
        public string APELLIDO { get; set; }
        public string DOCTO_IDENT { get; set; }
        public string ESTADO { get; set; }
        public string F_NACE { get; set; }
    }
}