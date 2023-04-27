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
  haming: string = ""
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
    if (this.haming == "") {
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
      //var posicionesP = new Array<number>()
      var ubicacionesP = new Array<number>()
      for (var i = 0; i <= p - 1; i++) {
        ubicacionesP.push(Math.pow(2, i))
      }
      var f = 0
      l = 0
      for (var j = 0; j < size + p; j++) {
        if (j == ubicacionesP[f] - 1) {
          numero.push("P")
          f++;
        }
        else {
          numero.push(valorAux[l])
          l++
        }
      }
      //
      /*for (var i = 0; i < numero.length; i++) {
        if (numero[i] == "P") {
          ubicacionesP.push(i + 1)
        }
      }*/
      //console.log(posicionesP)
      console.log(ubicacionesP)
      var proteccionesP = new Array<any>()
      for (var i = 0; i < ubicacionesP.length; i++) {
        for (var j = i + 1; j < ubicacionesP.length; j++) {
          var num = ubicacionesP[i] + ubicacionesP[j]
          console.log("i vale " + i)
          console.log("j vale " + j)
          console.log("num vale " + num)

          if (proteccionesP.filter(element => element.posicion == i + 1).length != 0 || proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
            if (proteccionesP.filter(element => element.posicion == i + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == i + 1)
              console.log("a " + index)
              proteccionesP[index].proteccion.push(num)
            }
            if (proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == j + 1)
              console.log("B" + index)
              proteccionesP[index].proteccion.push(num)
            }
          }
          else {
            console.log("c")
            proteccionesP.push({ posicion: i + 1, proteccion: [num] })
            proteccionesP.push({ posicion: j + 1, proteccion: [num] })
          }
        }
      };
      console.log("LOL")
      proteccionesP.push({ posicion: ubicacionesP[ubicacionesP.length - 1], proteccion: [] })
      var suma = 0
      proteccionesP.forEach(element => {
        suma += element.posicion
      });
      console.log(suma)
      for (var j = 0; j < ubicacionesP.length - 1; j++) {
        proteccionesP[proteccionesP.length - 1].proteccion.push(proteccionesP[j].posicion + proteccionesP[proteccionesP.length - 1].posicion)
      }
      proteccionesP.forEach(element => {
        element.proteccion.push(suma)
      });
      console.log(proteccionesP)
      var contador = 0
      var agregar = ""
      proteccionesP.forEach(element => {
        element.proteccion.forEach((value: any) => {
          if (numero[value - 1] == (1).toString()) {
            console.log(true)
            contador++
          }
        });

        if (this.paridad == true) {
          if (contador % 2 == 0)
            agregar = (0).toString()
          else
            agregar = (1).toString()
        }
        else {
          if (contador % 2 != 0)
            agregar = (0).toString()
          else
            agregar = (1).toString()
        }
        console.log(contador)
        numero[element.posicion - 1] = agregar
        contador = 0
      });
      console.log(numero)
      this.haming = ""
      for (var j = numero.length - 1; j >= 0; j--) {
        this.haming += numero[j]
      }
    }
    else {
      var size = this.haming.length
      var band = false
      var p = 0
      while (band == false) {
        if (Math.pow(2, p) >= size + 1) {
          band = true;
        }
        else
          p++
      }
      //size = size -p

      var posicionesP = new Array<number>()
      for (var i = 0; i <= p - 1; i++) {
        posicionesP.push(Math.pow(2, i))
      }
      console.log(posicionesP)
      console.log("size: " + size)
      console.log("P : " + p)

      var numero = new Array<string>()
      var proteccionesP = new Array<any>()
      for (var i = 0; i < posicionesP.length; i++) {
        for (var j = i + 1; j < posicionesP.length; j++) {
          var num = posicionesP[i] + posicionesP[j]
          console.log("i vale " + i)
          console.log("j vale " + j)
          console.log("num vale " + num)

          if (proteccionesP.filter(element => element.posicion == i + 1).length != 0 || proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
            if (proteccionesP.filter(element => element.posicion == i + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == i + 1)
              console.log("a " + index)
              proteccionesP[index].proteccion.push(num)
            }
            if (proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == j + 1)
              console.log("B" + index)
              proteccionesP[index].proteccion.push(num)
            }
          }
          else {
            console.log("c")
            proteccionesP.push({ posicion: i + 1, proteccion: [num] })
            proteccionesP.push({ posicion: j + 1, proteccion: [num] })
          }
        }
      };
      console.log("LOL 2")
      proteccionesP.push({ posicion: posicionesP[posicionesP.length - 1], proteccion: [] })
      var suma = 0
      proteccionesP.forEach(element => {
        suma += element.posicion
      });
      console.log(suma)
      for (var j = 0; j < posicionesP.length - 1; j++) {
        proteccionesP[proteccionesP.length - 1].proteccion.push(proteccionesP[j].posicion + proteccionesP[proteccionesP.length - 1].posicion)
      }
      proteccionesP.forEach(element => {
        element.proteccion.push(suma)
      });
      console.log(proteccionesP)



      var contador = 0
      var comprobar = ""
      var numeroAux = new Array<string>()
      var band: boolean;
      numero = []
      var l = 0
      for (var i = this.haming.length - 1; i >= 0; i--) {
        numero[l] = this.haming[i]
        l++
      }

      console.log(numero)

      //numeroAux = numero;
      proteccionesP.forEach(element => {
        element.proteccion.forEach((value: any) => {
          if (numero[value - 1] == (1).toString()) {
            console.log(true)
            contador++
          }
        });

        if (this.paridad == true) {
          if (contador % 2 == 0)
            comprobar = (0).toString()
          else
            comprobar = (1).toString()
        }
        else {
          if (contador % 2 != 0)
            comprobar = (0).toString()
          else
            comprobar = (1).toString()
        }
        console.log(contador)
        console.log(numero)
        console.log(numero[element.posicion - 1]) 
        console.log(comprobar)
        if (numero[element.posicion - 1] != comprobar) {
          console.log("DISTINTO")
          console.log(numero[element.posicion - 1])
          console.log(comprobar)
          numeroAux[element.posicion - 1] = comprobar
          band = true
          /////SUS
        }
        contador = 0
      });
      console.log(numero)
      //this.haming = ""
      if (band == true) {
        console.log("band es true")
        for (var j = numero.length - 1; j >= 0; j--) {
          this.hamingCorrecto += numeroAux[j]
        }
        this.hamingIncorrecto = true
      }
      else {
        console.log("band es false")
        console.log(this.haming)
        console.log(numero)
        console.log(proteccionesP)
        console.log(posicionesP)

        var l = 0
        for (var i = this.haming.length - 1; i >= 0; i--) {
          if (posicionesP[l] - 1 != i)
            numeroAux.push()
          else
            l++
        }

        console.log(numeroAux)

        switch (this.selectedTipo) {
          case "N":
            this.binNat = ""
            break;

        }
      }


    }


  }

  calcularParidad() {
    this.bitParidad = this.insertarBitParidad(this.binNat, this.paridad, this.selectedUbicacion)
  }

  limpiar() {
    this.bitParidad = ""
    this.haming = ""
    this.hamingIncorrecto = false
    this.hamingCorrecto = ""
  }

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
