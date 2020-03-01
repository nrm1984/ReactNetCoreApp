using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ReactASPCrud.Models
{
    public class Vehiculo
    {
        public int Id { get; set; }
        public int Pedido { get; set; }
        [Required]
        public string Bastidor { get; set; }
        public string Matricula { get; set; }
        public string Modelo { get; set; }
 
        [DisplayFormat(ApplyFormatInEditMode = true, DataFormatString = "{dd/MM/yyyy}")]
        public DateTime FechaEntrega { get; set; }

    }
}
