import { Component } from '@angular/core';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {

  decimal!: string
  octal!: string
  hexa!: string
  binNat!: string
  gray!: string
  johnson!: string
  ascii!: string

  bcoN!: string
  bcoG!: string
  bcoJ!: string

  bcdN!: string
  bcdG!: string
  bcdJ!: string

  bchN!: string
  bchG!: string
  bchJ!: string

  paridad: boolean = false
  bitParidad!: string
  haming!: string
  hamingCorrecto!: string
  hamingIncorrecto: boolean = false

  ubicaciones: any[] = [
    { name: 'Prefijo', key: 'P' },
    { name: 'Central', key: 'C' },
    { name: 'Sufijo', key: 'S' }
  ];
  selectedUbicacion: any = 'P'
  tipos = [
    {
      label: 'Binario Natural',
      icon: 'pi pi-fw bi bi-tree-fill',
      command: () => {
        this.selectedTipo = "N";
      }
    },
    {
      label: 'Gray',
      icon: 'pi pi-fw pi-pencil',
      command: () => {
        this.selectedTipo = "G";
      }
    },
    {
      label: 'Johnson',
      icon: 'pi pi-fw pi-user',
      command: () => {
        this.selectedTipo = "J";
      }
    },
    {
      label: 'BCD',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Natural',
          icon: 'bi bi-tree-fill',
          command: () => {
            this.selectedTipo = "BCDN";
          }
        },
        {
          label: 'Johnson',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.selectedTipo = "BCDJ";
          }
        },
        {
          label: 'Gray',
          icon: 'pi pi-fw pi-calendar-times',
          command: () => {
            this.selectedTipo = "BCDG";
          }
        }
      ]
    },
    {
      label: 'BCO',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Natural',
          icon: 'bi bi-tree-fill',
          command: () => {
            this.selectedTipo = "BCON";
          }
        },
        {
          label: 'Johnson',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.selectedTipo = "BCOJ";
          }
        },
        {
          label: 'Gray',
          icon: 'pi pi-fw pi-calendar-times',
          command: () => {
            this.selectedTipo = "BCOG";
          }
        }
      ]
    },
    {
      label: 'BCH',
      icon: 'pi pi-fw pi-table',
      items: [
        {
          label: 'Natural',
          icon: 'bi bi-tree-fill',
          command: () => {
            this.selectedTipo = "BCHN";
          }
        },
        {
          label: 'Johnson',
          icon: 'pi pi-fw pi-user',
          command: () => {
            this.selectedTipo = "BCHJ";
          }
        },
        {
          label: 'Gray',
          icon: 'pi pi-fw pi-calendar-times',
          command: () => {
            this.selectedTipo = "BCHG";
          }
        }
      ]
    },
  ];
  selectedTipo: any = null

  constructor() { }

  transformar(op: string) {
    switch (op) {
      case "decimal":
        var dec = Number(this.decimal)
        this.octal = dec.toString(8)
        this.hexa = dec.toString(16).toUpperCase()
        this.binNat = dec.toString(2)
        this.gray = this.binaryToGray(this.binNat)

        this.ascii = String.fromCharCode(dec)
        this.bitParidad = this.insertarBitParidad(this.binNat, this.paridad, this.selectedUbicacion)

        break;
      case "octal":

        break;
      case "hexa":

        break;
      case "binNat":

        break;
      case "gray":

        break;
      case "johnson":

        break;
    }
  }

  calcularHaming() {
    var valorUsado = ""
    switch (this.selectedTipo) {
      case "N":
        valorUsado = this.binNat
        break;
    }

    var size = valorUsado.length
    var band = false;
    var p = 0
    while (band == false) {
      if (Math.pow(2, p) >= p + size + 1)
        band = true
      else
        p++
    }
    var valorAux = []
    var l = size - 1
    for (var k = 0; k < size; k++) {

      valorAux[k] = valorUsado[l]
      l--;
    }
    //arreglo: Map<"string",Array<number>>; //
    var numero = new Array<string>()
    var posicionesP = new Array<number>()
    for (var i = 0; i <= p - 1; i++) {
      posicionesP.push(Math.pow(2, i))
    }
    var f = 0
    l = 0
    for (var j = 0; j < size + p; j++) {
      if (j == posicionesP[f] - 1) {
        numero.push("P")
        f++;
      }
      else {
        numero.push(valorAux[l])
        l++
      }

    }
    console.log(posicionesP)
    console.log(numero)


    var ubicacionesP = new Array<number>()

    for (var i = 0; i < numero.length; i++) {
      if (numero[i] == "P") {
        ubicacionesP.push(i + 1)
      }
    }

    console.log(ubicacionesP)

    var proteccionesP = new Array<any>()
    for (var i = 0; i < ubicacionesP.length; i++) {
      for (var j = i + 1; j < ubicacionesP.length; j++) {
        var num = ubicacionesP[i] + ubicacionesP[j]
        console.log("i vale " + i)
        console.log("j vale " + j)
        console.log("num vale " + num)

        if (proteccionesP.filter(element => element.posicion == i).length != 0 || proteccionesP.filter(element => element.posicion == j).length != 0) {
          if (proteccionesP.filter(element => element.posicion == i).length != 0) {
            var index = proteccionesP.findIndex(element => element.posicion == i)
            console.log("a " + index)
            proteccionesP[index].proteccion.push(num)
          }
          if (proteccionesP.filter(element => element.posicion == j).length != 0) {
            var index = proteccionesP.findIndex(element => element.posicion == j)
            console.log("B" + index)
            proteccionesP[index].proteccion.push(num)
          }
        }
        else {
          console.log("c")
          proteccionesP.push({ posicion: i, proteccion: [num] })
          proteccionesP.push({ posicion: j, proteccion: [num] })
        }
      }








      /*//proteccionesP.push({posicion: suma,proteccion: []})

      
      //var index = proteccionesP.findIndex(element => element.posicion == suma)

      for(var j = 0; j < ubicacionesP.length;j++ ){
      proteccionesP[index].proteccion.push(ubicacionesP[j])
      }

      proteccionesP.forEach(element => {
        element.proteccion.push(suma)
      });
      
        

*/



    };

    console.log("LOL")

    proteccionesP.push({ posicion: ubicacionesP[ubicacionesP.length - 1] , proteccion: []})
    
    /*for (i = 0; i < ubicacionesP.length; i++) {
      proteccionesP[ubicacionesP[ubicacionesP.length - 1]].proteccion.push(proteccionesP[i].posicion)
    }
    /*var suma = 0
    proteccionesP.forEach(element => {
      suma += element.posicion
    });*/

    console.log(proteccionesP)



  }

  calcularParidad() {
    this.bitParidad = this.insertarBitParidad(this.binNat, this.paridad, this.selectedUbicacion)
  }

  limpiar() { }

  binaryToGray(a: string) {
    var size = a.length
    var num = a[0]
    for (var i = 1; i < size; i++) {
      var aux = Number(a[i - 1]) + Number(a[i])
      if (aux == 2 || aux == 0)
        num = num + (0).toString()
      else
        num = num + (1).toString()
    }
    return num
  }

  insertarBitParidad(a: string, par: boolean, lugar: string) {
    var completo = ""
    var agregar = ""
    var contador = 0
    if (a.length % 2 == 0) {
      for (var i = 0; i < a.length; i++) {
        var aux = Number(a[i])
        if (aux == 1)
          contador = contador + 1
      }
      if (par == true) {
        if (contador % 2 == 0)
          agregar = (0).toString()
        else
          agregar = (1).toString()
      }
      else {
        if (contador % 2 == 0)
          agregar = (1).toString()
        else
          agregar = (0).toString()
      }

      if (lugar == "P")
        completo = " | " + agregar + " | " + a
      else if (lugar == "C") {
        var pos = Number(a.length / 2)
        var st1 = a.slice(0, pos)
        var st2 = a.slice(pos, a.length)
        completo = st1 + " | " + agregar + " | " + st2
      }
      else
        completo = a + " | " + agregar + " | "
    }
    else
      completo = "Proximamente"
    return completo
  }
}
