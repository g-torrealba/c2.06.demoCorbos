/** Precio de ropa
 * Para calcular la ganancia que se asignará a la venta de una ropa, simplemente
 * se incrementa el 20% del costo de la prenda
 * Para el caso de ropa íntima se tiene: la ganancia es el 30% del costo si es de hombre
 * y 40% si es de mujer. Las camisas escolares tienen un descuento según la talla (S: 5%, M: 7%, L:10%)
 * Se tienen los siguientes datos de una ropa: nombre, costo, tipo(1=general, 2=íntima, 3=escolar) y sexo ('M'-'F')
 * Se requiere calcular el precio de venta de la ropa, usando herencia
 * Para la tienda determinar: 1. total ganancia, 2. porcentaje de ventas de camisas escolares
 * Ej:
 * nombre costo tipo sexo talla super.precio() descuento() precio() ganancia()
 * Blumer  10    2    'F'   -      12.0             -       14.0        4.0
 * Kinder  10    3     -    S      12.0            0.6      11.4        1.4
 * Sexto   10    3     -    L      12.0            1.2      10.8        0.8
 * Medias  10    2    'M'   -      12.0             -       13.0        3.0
 * R.1 totalGanancia(): $49.2 - $40.0 = $9.2
 * R.2 porcentajeVentasEscolares(): 50%
 */
class Cl_mRopa {
   constructor(nombre = "", costo, tipo) {
      this.nombre = nombre;
      this.costo = costo;
      this.tipo = tipo;
   }

   ganancia() {
      return this.costo * 0.2;
   }

   precio() {
      return this.costo + this.ganancia() - this.descuento();
   }

   descuento() {
      return 0;
   }
}

class Cl_mIntimo extends Cl_mRopa {
   constructor(nombre = "", costo, sexo) {
      super(nombre, costo);
      this.sexo = sexo;
   }

   ganancia() {
      return this.costo * (this.sexo === "M" ? 0.3 : 0.4);
   }
}

class Cl_mEscolar extends Cl_mRopa {
   constructor(nombre = "", costo, tipo, talla) {
      super(nombre, costo, tipo);
      this.talla = talla;
   }

   descuento() {
      if (this.talla === "S") {
         return (this.costo + this.ganancia()) * 0.05;
      } else if (this.talla === "M") {
         return (this.costo + this.ganancia()) * 0.07;
      } else {
         return (this.costo + this.ganancia()) * 0.1;
      }
   }
}

class Cl_mTienda {
   constructor() {
      this.acumPrecios =
         this.acumCostos =
         this.cntEscolares =
         this.cntTotal =
            0;
   }

   procesarRopa(r) {
      this.cntTotal++;
      this.acumPrecios += r.precio();
      this.acumCostos += r.costo;
      if (r.tipo === 3) this.cntEscolares++;
   }

   totalGanancia() {
      return (this.acumPrecios - this.acumCostos).toFixed(2);
   }

   porcentajeVentasEscolares() {
      if (this.cntEscolares === 0) return 0;
      else return (this.cntEscolares / this.cntTotal) * 100;
   }
}

let tienda = new Cl_mTienda();
let persona1 = new Cl_mIntimo("Blumer", 10, "F");
tienda.procesarRopa(persona1);
let persona2 = new Cl_mEscolar("Kinder", 10, 3, "S");
tienda.procesarRopa(persona2);
let persona3 = new Cl_mEscolar("Sexto", 10, 3, "L");
tienda.procesarRopa(persona3);
let persona4 = new Cl_mIntimo("Medias", 10, "M");
tienda.procesarRopa(persona4);

let salida = document.getElementById("app");
salida.innerHTML = "Resultados:";
salida.innerHTML += "<br>Precio persona 1= " + persona1.precio();
salida.innerHTML += "<br>Precio persona 2= " + persona2.precio();
salida.innerHTML += "<br>Precio persona 3= " + persona3.precio();
salida.innerHTML += "<br>Precio persona 4= " + persona4.precio();
salida.innerHTML += "<br>";
salida.innerHTML +=
   "<br>Total ganancia de la tienda= " + tienda.totalGanancia();
salida.innerHTML +=
   "<br>Porcentaje de ventas de camisas escolares= " +
   tienda.porcentajeVentasEscolares() +
   "%";
