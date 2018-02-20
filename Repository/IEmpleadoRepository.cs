using System.Collections.Generic;
using Midas.Models;
namespace Midas.Repository
{
    public interface IProductRepository
    {
        void Add(Empleado emp);
        IEnumerable<Empleado> GetAll();
        IEnumerable<Empleado> GetAllByPage(int PageIndex, int PageSize);
        Empleado GetByID(string Sempleado);
        void Delete(string Sempleado);
        void Update(Empleado emp);
    }
}