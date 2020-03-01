using Microsoft.EntityFrameworkCore;
using ReactASPCrud.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ReactASPCrud.Contexts
{
    public class ApplicationContext : DbContext
    {
      
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
      
        }

        public DbSet<Vehiculo> Vehiculos { get; set; }


    }
}
