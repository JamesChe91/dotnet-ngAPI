using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Midas.Repository;
using Midas.Models;

namespace pruebaConcepto.Controllers
{
    [Route("api/[controller]")]
    public class EmpleadoController : Controller
    {
        private readonly EmpleadoRepository empleadoRepository;
        public EmpleadoController()
        {
            empleadoRepository = new EmpleadoRepository();
        }
        // GET: api/values
        [HttpGet]
        public IEnumerable<Empleado> Get()
        {
            return empleadoRepository.GetAll();
        }

        // GET api/values/5
        [HttpGet("{Sempleado}")]
        public Empleado Get(string Sempleado)
        {
            return empleadoRepository.GetByID(Sempleado);
        }

        // POST api/values
        [HttpPost]
        public IActionResult Post([FromBody]Empleado emp)
        {
            if (ModelState.IsValid)
                empleadoRepository.Add(emp);
            return new CreatedAtActionResult("Create", "Empleado", "aaa", new { id = emp.EMPLEADO });
        }

        // PUT api/values/5
        [HttpPut("{Sempleado}")]
        public void Put([FromRoute]string Sempleado, [FromBody]Empleado emp)
        {
            emp.EMPLEADO = Sempleado;
            if (ModelState.IsValid)
                empleadoRepository.Update(emp);
        }

        // DELETE api/values/5
        [HttpDelete("{Sempleado}")]
        public IActionResult Delete([FromRoute]string Sempleado)
        {
            empleadoRepository.Delete(Sempleado);
            return new CreatedAtActionResult("Delete", "Empleado", "aaa", new { id = Sempleado });
        }


        [HttpGet("{PageIndex}/{PageSize}")]
        public IEnumerable<Empleado> GetAllByPage([FromRoute]int PageIndex, [FromRoute] int PageSize)
        {
            return empleadoRepository.GetAllByPage(PageIndex, PageSize);
        }

    }
}