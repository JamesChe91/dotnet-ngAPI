using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Threading.Tasks;
using Midas.Models;
using Dapper;
namespace Midas.Repository
{
    public class EmpleadoRepository : IProductRepository
    {
        private string _connectionString;
        private IDbConnection _connection { get { return new SqlConnection(_connectionString); } }
        public EmpleadoRepository()
        {
            _connectionString = @"Server=JRENDON;Database=RH_SOMOS_ST;User Id=SA;Password=PRAXEDES;";
        }

        public void Add(Empleado emp)
        {
            using (IDbConnection dbConnection = _connection)
            {
                string Squery = "INSERT INTO EMP (EMPLEADO,NOMBRE,APELLIDO,DOCTO_IDENT,ESTADO,F_NACE)"
                                + " VALUES(@EMPLEADO,@NOMBRE,@APELLIDO,@DOCTO_IDENT,@ESTADO,@F_NACE)";
                dbConnection.Open();
                dbConnection.Execute(Squery, emp);
            }
        }

        public IEnumerable<Empleado> GetAll()
        {
            using (IDbConnection dbConnection = _connection)
            {
                dbConnection.Open();
                return dbConnection.Query<Empleado>("SELECT TOP 50 EMPLEADO,NOMBRE,APELLIDO,DOCTO_IDENT,ESTADO,CONVERT(VARCHAR(10),F_NACE,103)F_NACE FROM EMP WHERE ISNULL(ESTADO,'')='R'");
            }
        }

        public Empleado GetByID(string Sempleado)
        {
            using (IDbConnection dbConnection = _connection)
            {
                string Squery = "SELECT EMPLEADO,NOMBRE,APELLIDO,DOCTO_IDENT,ESTADO,CONVERT(VARCHAR(10),F_NACE,103)F_NACE FROM EMP"
                               + " WHERE EMPLEADO = @EMPLEADO";
                dbConnection.Open();
                return dbConnection.QueryFirstOrDefault<Empleado>(Squery, new { EMPLEADO = Sempleado });
            }
        }

        public void Delete(string Sempleado)
        {
            using (IDbConnection dbConnection = _connection)
            {
                string Squery = "DELETE FROM EMP"
                             + " WHERE EMPLEADO = @EMPLEADO";
                dbConnection.Open();
                dbConnection.Execute(Squery, new { EMPLEADO = Sempleado });
            }
        }

        public void Update(Empleado emp)
        {
            using (IDbConnection dbConnection = _connection)
            {
                string Squery = @"UPDATE EMP SET EMPLEADO = @EMPLEADO,NOMBRE = @NOMBRE,APELLIDO = @APELLIDO,DOCTO_IDENT = @DOCTO_IDENT,ESTADO = @ESTADO, F_NACE=@F_NACE";
                dbConnection.Open();
                dbConnection.Query(Squery, emp);
            }
        }
    }
}