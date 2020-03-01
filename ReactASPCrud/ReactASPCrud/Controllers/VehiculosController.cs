using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using ReactASPCrud.Contexts;
using ReactASPCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;


namespace ReactASPCrud.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("ReactPolicy")]
    public class VehiculosController : ControllerBase
    {
        private readonly ApplicationContext context;

        public VehiculosController(ApplicationContext context)
        {
            this.context = context;
        }


        [HttpGet]
        public ActionResult<IEnumerable<Vehiculo>> Get()
        {
            return context.Vehiculos.ToList();
        }

        [HttpGet("{id}", Name = "ObtenerVehiculo")]
        public ActionResult<Vehiculo> Get(int id)
        {
            var vehiculo = context.Vehiculos.FirstOrDefault(x => x.Id == id);

            if (vehiculo == null)
            {
                return NotFound();
            }

            return vehiculo;
        }

        [HttpPost]
        public ActionResult Post([FromBody] Vehiculo vehiculo)
        {
            context.Add(vehiculo);
            context.SaveChanges();

            return new CreatedAtRouteResult("ObtenerVehiculo", new { id = vehiculo.Id }, vehiculo);
        }

        [HttpPut("{id}")]
        public ActionResult Put(int id, [FromBody] Vehiculo value)
        {
            if (value.Id != id)
            {
                return BadRequest();
            }

            context.Entry(value).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public ActionResult<Vehiculo> Delete(int id)
        {
            var vehiculo = context.Vehiculos.FirstOrDefault(x => x.Id == id);

            if (vehiculo == null)
            {
                return NotFound();
            }

            context.Vehiculos.Remove(vehiculo);
            context.SaveChanges();

            return vehiculo;
        }

    }
}
