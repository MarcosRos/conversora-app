import { MessageService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { tabla_bcdGray } from 'src/data/tablaBCDgray';
import { tabla_bchGray } from 'src/data/tablaBCHgray';
import { tabla_bcoGray } from 'src/data/tablaBCOgray';
import { tabla_john_decimal } from 'src/data/tablaJhonDecimal';
import { tabla_bco_jhon } from 'src/data/tablaBCOjhon';
import { tabla_bch_jhon } from 'src/data/tablaBCHjhon';
import { tabla_bcxNat } from 'src/data/tablaBCXnat';

@Component({
  selector: 'app-conversor',
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent implements OnInit {

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
  text: string = ""

  //TABLAS
  tablaBCOjhon!: Array<any>
  tablaBCHjhon!: Array<any>
  tablaJhonDec!: Array<any>
  tablaBCOgray!: Array<any>
  tablaBCDgray!: Array<any>
  tablaBCHgray!: Array<any>
  tablaBCXnat!: Array<any>



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
      value: "BN"
    },
    {
      label: 'Gray',
      icon: 'pi pi-fw pi-pencil',
      value: "G"
    },
    {
      label: 'Johnson',
      icon: 'pi pi-fw pi-user',
      value: "J"
    },
    {
      label: 'BCD',
      icon: 'pi pi-fw pi-table',
      children: [
        {
          label: 'BCD Natural',
          icon: 'bi bi-tree-fill',
          value: "BCDN"
        },
        {
          label: 'BCD Johnson',
          icon: 'pi pi-fw pi-user',
          value: "BCDJ"
        },
        {
          label: 'BCD Gray',
          icon: 'pi pi-fw pi-calendar-times',
          value: "BCDG"
        }
      ]
    },
    {
      label: 'BCO',
      icon: 'pi pi-fw pi-table',
      children: [
        {
          label: 'BCO Natural',
          icon: 'bi bi-tree-fill',
          value: "BCON"
        },
        {
          label: 'BCO Johnson',
          icon: 'pi pi-fw pi-user',
          value: "BCOJ"
        },
        {
          label: 'BCO Gray',
          icon: 'pi pi-fw pi-calendar-times',
          value: "BCOG"
        }
      ]
    },
    {
      label: 'BCH',
      icon: 'pi pi-fw pi-table',
      children: [
        {
          label: 'BCH Natural',
          icon: 'bi bi-tree-fill',
          value: "BCHN"
        },
        {
          label: 'BCH Johnson',
          icon: 'pi pi-fw pi-user',
          value: "BCHJ"
        },
        {
          label: 'BCH Gray',
          icon: 'pi pi-fw pi-calendar-times',
          value: "BCHG"
        }
      ]
    },
  ];
  selectedTipo: any = null
  selectedTipoComplementario: any = null

  numComplementario: string = ""
  resComplementario: string = ""
  formValid: Boolean = false


  constructor(private ms: MessageService) { }

  ngOnInit(): void {

    this.tablaBCOjhon = tabla_bco_jhon;
    this.tablaBCHjhon = tabla_bch_jhon;
    this.tablaJhonDec = tabla_john_decimal;
    this.tablaBCOgray = tabla_bcoGray;
    this.tablaBCDgray = tabla_bcdGray;
    this.tablaBCHgray = tabla_bchGray;
    this.tablaBCXnat = tabla_bcxNat;

  }

  texto() {
    if (this.selectedTipo == null)
      return '...'
    else
      return this.selectedTipo.label
  }

  comprobarValor() {
    if (this.selectedTipo.value == null) {
      this.ms.add({ severity: 'error', summary: 'Valor Invalido!', detail: 'Por favor, seleccione un tipo de ' + this.selectedTipo.label + ' valido (Natural, Gray o Johnson)' });
      this.selectedTipo = null;
      this.formValid = false;
    }
    else
      this.formValid = true;
  }


  transformar(op: string) {
    var habilitado = true
    switch (op) {
      case "D":
        //var dec = Number(this.decimal)    
        if (this.decimal == '')
          habilitado = false
        break;
      case "O":
        if (this.octal == '')
          habilitado = false
        else
          this.decimal = this.octalToDecimal(this.octal).toString() //Funca con decimales
        break;
      case "H":
        if (this.hexa == '')
          habilitado = false
        else {
          this.decimal = this.hexToDecimal(this.hexa).toString();
        }
        break;
      case "BN":
        if (this.binNat == '')
          habilitado = false
        else
          this.decimal = parseInt(this.binNat, 2).toString()
        break;
      case "G":
        if (this.gray == '')
          habilitado = false
        else {
          this.binNat = this.grayToBinary(this.gray)
          this.decimal = parseInt(this.binNat, 2).toString()
        }
        break;
      case "J":
        if (this.johnson == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.johnson, this.tablaJhonDec, op)
        break;

      //  BCO
      case "BCON":
        if (this.bcoN == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcoN, this.tablaBCXnat, op)
        break;
      case "BCOJ":
        if (this.bcoJ == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcoJ, this.tablaBCOjhon, op)
        break;
      case "BCOG":
        if (this.bcoG == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcoG, this.tablaBCOgray, op)
        break;

      //  BCD
      case "BCDN":
        if (this.bcdN == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcdN, this.tablaBCXnat, op)
        break;
      case "BCDJ":
        if (this.bcdJ == '')
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcdJ, this.tablaJhonDec, op)
        break;

      case "BCDG":
        if (this.bcdG == '')
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bcdG, this.tablaBCDgray, op)
        break;

      //  BCH
      case "BCHN":
        if (this.bchN == "")
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bchN, this.tablaBCXnat, op)
        break;
      case "BCHJ":
        if (this.bchJ == '')
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bchJ, this.tablaBCHjhon, op)
        break;

      case "BCHG":
        if (this.bchG == '')
          habilitado = false
        else
          this.decimal = this.bcxAllToDecimal(this.bchG, this.tablaBCHgray, op)
        break;
      case "A":
        if (this.ascii == '')
          habilitado = false
        else
          this.decimal = this.ascii.charCodeAt(0).toString()

        break;
      default:
        console.log("keeeeeeeeeeeeeeeeeeeeeee")
        habilitado = false;
        break;
    }

    if (habilitado == true) {
      var dec = Number(this.decimal)
      this.deTodou(dec, op);
    }
    else {
      this.decimal = ""
      this.octal = ""
      this.hexa = ""
      this.binNat = ""
      this.gray = ""
      this.johnson = ""
      this.ascii = ""
      this.bcoN = ""
      this.bcoG = ""
      this.bcoJ = ""
      this.bcdN = ""
      this.bcdG = ""
      this.bcdJ = ""
      this.bchN = ""
      this.bchG = ""
      this.bchJ = ""
    }
  }

  deTodou(dec: number, op: string) {

    if (op != "H") {
      this.hexa = dec.toString(16).toUpperCase()
    }
    if (op != "O") {
      this.octal = dec.toString(8)
    }
    if (op != "BN") {
      this.binNat = dec.toString(2)
    }
    if (op != "G") {
      //Probemos avr
      this.gray = this.binaryToGray(this.binNat)
    }
    if (op != "J") {
      this.bcdN = this.allToBcxAll(this.decimal, this.tablaBCXnat)
    }

    //BCO
    if (op != "BCON") {
      this.bcoN = this.allToBcxAll(this.octal, this.tablaBCXnat)
    }
    if (op != "BCOG") {
      this.bcoG = this.allToBcxAll(this.octal, this.tablaBCOgray)
    }
    if (op != "BCOJ") {
      this.bcoJ = this.allToBcxAll(this.octal, this.tablaBCOjhon)
    }

    //BCD
    if (op != "BCDN") {
      this.bcdN = this.allToBcxAll(this.decimal, this.tablaBCXnat)
    }
    if (op != "BCDG") {
      this.bcdG = this.allToBcxAll(this.decimal, this.tablaBCDgray)
    }
    if (op != "BCDJ") {
      this.bcdJ = this.allToBcxAll(this.decimal, this.tablaJhonDec)
    }

    //BCH
    if (op != "BCHN") {
      this.bchN = this.allToBcxAll(this.hexa, this.tablaBCXnat)
    }
    if (op != "BCHG") {
      this.bchG = this.allToBcxAll(this.hexa, this.tablaBCHgray)
    }
    if (op != "BCHJ") {
      this.bchJ = this.allToBcxAll(this.hexa, this.tablaBCHjhon)
    }



    this.ascii = String.fromCharCode(dec)
    //this.bitParidad = this.insertarBitParidad(this.binNat, this.paridad, this.selectedUbicacion)



  }

  hexToDecimal(hex: string): number {
    let decimal = 0;
    let index = 0;
    const base = 16;
    var arrHex = new Array<string>()
    arrHex = hex.split('.')
    console.log(arrHex)
    // Recorre los dígitos del número hexadecimal de derecha a izquierda
    for (let i = arrHex[0].length - 1; i >= 0; i--) {
      const digit = parseInt(arrHex[0][i], base);
      decimal += digit * Math.pow(base, index);
      index++;
    }
    console.log(decimal)
    console.log(arrHex)
    console.log(arrHex[0])
    console.log(arrHex[1])

    if (arrHex.length == 2) {
      var decimalPart = 0
      //var fraction  = Number('0.'+arrOct[1])
      index = 1;
      for (let i = 0; i < arrHex[1].length; i++) {
        console.log(decimalPart)
        var power = Math.pow(base, -index)
        console.log(power)
        const digit = Number(parseInt(arrHex[1][i], base)) * power;
        console.log(digit)
        decimalPart += digit
        index++;
      }
      console.log("decimalPart")
      console.log(decimalPart)
      decimal += decimalPart
      decimal = Number(parseFloat(decimal.toString()).toFixed(5))
    }
    console.log("decimal")
    console.log(decimal)
    return decimal;
  }


  octalToDecimal(octal: string): number {
    let decimal = 0;
    let index = 0;
    const base = 8;
    var arrOct = octal.split('.')
    console.log(arrOct)
    // Recorre los dígitos del número octal de derecha a izquierda
    for (let i = arrOct[0].length - 1; i >= 0; i--) {
      const digit = parseInt(octal[i], base);
      decimal += digit * Math.pow(base, index);
      index++;
    }

    if (arrOct.length == 2) {
      var decimalPart = 0
      //var fraction  = Number('0.'+arrOct[1])
      index = 1;
      for (let i = 0; i < arrOct[1].length; i++) {
        var power = Math.pow(base, -index)
        const digit = Number(arrOct[1][i]) * power;
        decimalPart += digit
        index++;
      }

      decimal += decimalPart
      decimal = Number(parseFloat(decimal.toString()).toFixed(5))
    }
    return decimal;
  }


  complementario() {
    var len = this.numComplementario.length;
    var max = "1"
    var resta = "0"
    var negativo = false
    for (var i = 1; i < len - 1; i++) {
      if (this.numComplementario[i] == ',' || this.numComplementario[i] == '.') {
        max += '.'
        resta += '.'
      }
      else {
        max += "F"
        resta += "0"
      }
    }
    max += "F"
    resta += "1"
    if (this.numComplementario[0] == "1")
      negativo = true
    var a = this.hexToDecimal(max).toString()
    var b = this.hexToDecimal(this.numComplementario).toString();
    var restaDec = this.hexToDecimal(resta).toString();
    var c = 0
    c = Number(a) - Number(b) + Number(restaDec);
    var final = ""

    final = c.toString(16).toUpperCase()

    if (negativo == true)
      this.resComplementario = '-' + final
    else
      this.resComplementario = '+' + final.slice(1, final.length)
    //return c.toString();
  }

  preCalculoHaming(op: string) {
    if (this.selectedTipo.value == "BN" || this.selectedTipo.value == "G" || this.selectedTipo.value == "J")
      this.calcularHamingGPT(op)
    else {
      var habilitado = true
      var str = ""
      switch (this.selectedTipo.value) {
        case "BCON":
          if (this.bcoN == "")
            habilitado = false
          else
            str = this.bcoN
          break;
        case "BCOJ":
          if (this.bcoJ == "")
            habilitado = false
          else
            str = this.bcoJ
          break;
        case "BCOG":
          if (this.bcoG == "")
            habilitado = false
          else
            str = this.bcoG
          break;

        //  BCD
        case "BCDN":
          if (this.bcdN == "")
            habilitado = false
          else
            str = this.bcdN
          break;
        case "BCDJ":
          if (this.bcdJ == '')
            habilitado = false
          else
            str = this.bcdJ
          break;

        case "BCDG":
          if (this.bcdG == '')
            habilitado = false
          else
            str = this.bcdG
          break;

        //  BCH
        case "BCHN":
          if (this.bchN == "")
            habilitado = false
          else
            str = this.bchN
          break;
        case "BCHJ":
          if (this.bchJ == '')
            habilitado = false
          else
            str = this.bchJ
          break;

        case "BCHG":
          if (this.bchG == '')
            habilitado = false
          else
            str = this.bchG
          break;
        default:
          habilitado = false
          break;
      }

      if (op == "to" && habilitado == true) {
        this.haming = ""
        var arr = new Array<string>()
        arr = str.split('-')
        arr.forEach(element => {
          this.haming += this.calcularHamingBC(op, element)
          this.haming += " "
        });
        this.text = "desde " + this.selectedTipo.value
        var txtPar
        if (this.paridad == true)
          txtPar = " Par"
        else
          txtPar = " Impar"
        this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'Se calculo el resultado ' + this.text + 'a haming con paridad' + txtPar });
      }
      else if (op == "from") {
        this.hamingCorrecto = ""
        str = this.haming;
        var string = ""
        console.log(str)
        arr = str.split('-')
        console.log(arr)
        arr.forEach(element => {
          string += this.calcularHamingBC(op, element)
          string += "-"
        });

        string = string.slice(0, string.length - 1)
        this.text = "hacia " + this.selectedTipo.value
        switch (this.selectedTipo.value) {
          case "BCON":
            this.bcoN = string
            this.transformar("BCON")
            break;
          case "BCOJ":
            this.bcoJ = string
            this.transformar("BCOJ")
            break;
          case "BCOG":
            this.bcoG = string
            this.transformar("BCOG")
            break;

          //  BCD
          case "BCDN":
            this.bcdN = string
            this.transformar("BCDN")
            break;
          case "BCDJ":
            this.bcdJ = string
            this.transformar("BCDJ")
            break;

          case "BCDG":
            this.bcdG = string
            this.transformar("BCDG")
            break;

          //  BCH
          case "BCHN":
            this.bchN = string
            this.transformar("BCHN")
            break;
          case "BCHJ":
            this.bchJ = string
            this.transformar("BCHJ")
            break;

          case "BCHG":
            this.bchG = string
            this.transformar("BCHG")
            break
        }
        this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'Se calculo el resultado desde haming a ' + this.text + ' con paridad' + txtPar });
      }
      else
        this.ms.add({ severity: 'error', summary: 'Error!', detail: 'Sistema Seleccionado no valido o El sistema seleccionado no tiene datos' });
    }
  }

  calcularHamingGPT(op: string) {
    this.hamingIncorrecto = false;
    console.log(this.selectedTipo)
    console.log(this.paridad)
    var str = ""
    //SWITCH

    switch (this.selectedTipo.value) {
      case "BN":
        str = this.binNat
        break;
      case "G":
        str = this.gray
        break;
      case "J":
        str = this.johnson
        break;
    }
    //

    var txtPar
    if (this.paridad == true)
      txtPar = " Par"
    else
      txtPar = " Impar"

    console.log(op)
    if (op == "to") {
      const d = str.split("").map(Number);
      var ap1 = [d[0], d[2], d[3]]
      var ap2 = [d[0], d[1], d[3]]
      var ap3 = [d[0], d[1], d[2]]
      var bp1 = ""
      var bp2 = ""
      var bp3 = ""
      var array = [ap1, ap2, ap3]
      var contador = 0;
      var agregar = ""

      array.forEach(miniArray => {
        miniArray.forEach(element => {
          if (element == 1)
            contador = contador + 1
        });

        if (this.paridad == true) {
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

        if (miniArray == ap1) {
          bp1 = agregar
        }
        else if (miniArray == ap2) {
          bp2 = agregar
        }
        else {
          bp3 = agregar
        }
        contador = 0;
      });
      console.log(d)
      this.haming = d[0].toString() + d[1].toString() + d[2].toString() + bp3 + d[3].toString() + bp2 + bp1;
      switch (this.selectedTipo.value) {
        case "BN":
          this.text = "desde Binario Natural"
          break;
        case "G":
          this.text = "desde Gray"
          break;
        case "J":
          this.text = "desde Johnson"
          break;
      }

      this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'Se calculo el resultado ' + this.text + 'a haming con paridad' + txtPar });
    }
    else {
      const d = this.haming.split("").map(Number);
      console.log(d)
      const p1 = (d[0] + d[2] + d[4]) % 2;
      const p2 = (d[0] + d[1] + d[4]) % 2;
      const p3 = (d[0] + d[1] + d[2]) % 2;
      var errores = new Array<any>()
      if (this.paridad == true) {
        if (p1 != d[6]) {
          errores.push({ p: "p1", proteccionArray: [0, 2, 3], proteccionHoja: [4, 2, 1] })
        }
        if (p2 != d[5]) {
          errores.push({ p: "p2", proteccionArray: [0, 1, 3], proteccionHoja: [4, 3, 1] })
        }
        if (p3 != d[3]) {
          errores.push({ p: "p3", proteccionArray: [0, 1, 2], proteccionHoja: [4, 3, 2] })
        }
      }
      else {
        if (p1 == d[6]) {
          errores.push({ p: "p1", proteccionArray: [0, 2, 3], proteccionHoja: [4, 2, 1] })
        }
        if (p2 == d[5]) {
          errores.push({ p: "p2", proteccionArray: [0, 1, 3], proteccionHoja: [4, 3, 1] })
        }
        if (p3 == d[3]) {
          errores.push({ p: "p3", proteccionArray: [0, 1, 2], proteccionHoja: [4, 3, 2] })
        }
      }

      if (errores.length != 0) {
        if (errores.length == 3) {
          d[0] = 1 - d[0]
        }
        else if (errores.length == 1) {
          switch (errores[0].p) {
            case "p1":
              d[6] = 1 - d[6]
              break;
            case "p2":
              d[5] = 1 - d[5]
              break;
            case "p3":
              d[3] = 1 - d[3]
              break;
          }
        }
        else {
          if (errores[0].p == "p2" && errores[1].p == "p3") {
            d[1] = 1 - d[1]
          }
          else if (errores[0].p == "p1" && errores[1].p == "p3") {
            d[2] = 1 - d[2]
          }
          else if (errores[0].p == "p1" && errores[1].p == "p2") {
            d[4] = 1 - d[4]
          }
        }
        this.hamingCorrecto = `${d[0]}${d[1]}${d[2]}${d[3]}${d[4]}${d[5]}${d[6]}`
        this.hamingIncorrecto = true
        this.ms.add({ severity: 'warn', summary: 'Se ha detectado un error!', detail: 'Se detecto un error en el dato ingresado, pero se pudo arreglarlo. El resultado se encuentra en la casilla correspondiente al mensaje destino' });

      }
      switch (this.selectedTipo.value) {
        case "BN":
          this.text = "hacia Binario Natural"
          this.binNat = `${d[0]}${d[1]}${d[2]}${d[4]}`
          break;
        case "G":
          this.text = "hacia Gray"
          this.gray = `${d[0]}${d[1]}${d[2]}${d[4]}`
          break;
        case "J":
          this.text = "hacia Johnson"
          this.johnson = `${d[0]}${d[1]}${d[2]}${d[4]}`
          break;
      }
      if (errores.length == 0)
        this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'Se calculo el resultado desde Haming ' + this.text + ' con paridad' + txtPar });
      this.transformar(this.selectedTipo.value)
    }
  }


  calcularHamingBC(op: string, str: string) {
    this.hamingIncorrecto = false;

    // var txtPar
    // if (this.paridad == true)
    //   txtPar = " Par"
    // else
    //   txtPar = " Impar"

    console.log(op)
    if (op == "to") {
      const d = str.split("").map(Number);
      var ap1 = [d[0], d[2], d[3]]
      var ap2 = [d[0], d[1], d[3]]
      var ap3 = [d[0], d[1], d[2]]
      var bp1 = ""
      var bp2 = ""
      var bp3 = ""
      var array = [ap1, ap2, ap3]
      var contador = 0;
      var agregar = ""

      array.forEach(miniArray => {
        miniArray.forEach(element => {
          if (element == 1)
            contador = contador + 1
        });

        if (this.paridad == true) {
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

        if (miniArray == ap1) {
          bp1 = agregar
        }
        else if (miniArray == ap2) {
          bp2 = agregar
        }
        else {
          bp3 = agregar
        }
        contador = 0;
      });
      console.log(d)
      var haming = d[0].toString() + d[1].toString() + d[2].toString() + bp3 + d[3].toString() + bp2 + bp1;

      return haming

    }
    else {
      const d = str.split("").map(Number);
      console.log(d)
      const p1 = (d[0] + d[2] + d[4]) % 2;
      const p2 = (d[0] + d[1] + d[4]) % 2;
      const p3 = (d[0] + d[1] + d[2]) % 2;
      var errores = new Array<any>()
      if (this.paridad == true) {
        if (p1 != d[6]) {
          errores.push({ p: "p1", proteccionArray: [0, 2, 3], proteccionHoja: [4, 2, 1] })
        }
        if (p2 != d[5]) {
          errores.push({ p: "p2", proteccionArray: [0, 1, 3], proteccionHoja: [4, 3, 1] })
        }
        if (p3 != d[3]) {
          errores.push({ p: "p3", proteccionArray: [0, 1, 2], proteccionHoja: [4, 3, 2] })
        }
      }
      else {
        if (p1 == d[6]) {
          errores.push({ p: "p1", proteccionArray: [0, 2, 3], proteccionHoja: [4, 2, 1] })
        }
        if (p2 == d[5]) {
          errores.push({ p: "p2", proteccionArray: [0, 1, 3], proteccionHoja: [4, 3, 1] })
        }
        if (p3 == d[3]) {
          errores.push({ p: "p3", proteccionArray: [0, 1, 2], proteccionHoja: [4, 3, 2] })
        }
      }

      if (errores.length != 0) {
        if (errores.length == 3) {
          d[0] = 1 - d[0]
        }
        else if (errores.length == 1) {
          switch (errores[0].p) {
            case "p1":
              d[6] = 1 - d[6]
              break;
            case "p2":
              d[5] = 1 - d[5]
              break;
            case "p3":
              d[3] = 1 - d[3]
              break;
          }
        }
        else {
          if (errores[0].p == "p2" && errores[1].p == "p3") {
            d[1] = 1 - d[1]
          }
          else if (errores[0].p == "p1" && errores[1].p == "p3") {
            d[2] = 1 - d[2]
          }
          else if (errores[0].p == "p1" && errores[1].p == "p2") {
            d[4] = 1 - d[4]
          }
        }
        this.hamingCorrecto += `${d[0]}${d[1]}${d[2]}${d[3]}${d[4]}${d[5]}${d[6]}`
        this.hamingIncorrecto = true
        this.ms.add({ severity: 'warn', summary: 'Se ha detectado un error!', detail: 'Se detecto un error en el dato ingresado, pero se pudo arreglarlo. El resultado se encuentra en la casilla correspondiente al mensaje destino' });

      }

      var resultado = `${d[0]}${d[1]}${d[2]}${d[4]}`
      return resultado

      // if (errores.length == 0)
      //   this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'Se calculo el resultado desde Haming ' + this.text + ' con paridad' + txtPar });
    }
  }




  /*calcularHaming() {
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
      
      var proteccionesP = new Array<any>()
      for (var i = 0; i < ubicacionesP.length; i++) {
        for (var j = i + 1; j < ubicacionesP.length; j++) {
          var num = ubicacionesP[i] + ubicacionesP[j]

          if (proteccionesP.filter(element => element.posicion == i + 1).length != 0 || proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
            if (proteccionesP.filter(element => element.posicion == i + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == i + 1)
              proteccionesP[index].proteccion.push(num)
            }
            if (proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == j + 1)
              proteccionesP[index].proteccion.push(num)
            }
          }
          else {
            proteccionesP.push({ posicion: i + 1, proteccion: [num] })
            proteccionesP.push({ posicion: j + 1, proteccion: [num] })
          }
        }
      };
      proteccionesP.push({ posicion: ubicacionesP[ubicacionesP.length - 1], proteccion: [] })
      var suma = 0
      proteccionesP.forEach(element => {
        suma += element.posicion
      });
      for (var j = 0; j < ubicacionesP.length - 1; j++) {
        proteccionesP[proteccionesP.length - 1].proteccion.push(proteccionesP[j].posicion + proteccionesP[proteccionesP.length - 1].posicion)
      }
      proteccionesP.forEach(element => {
        element.proteccion.push(suma)
      });
      var contador = 0
      var agregar = ""
      proteccionesP.forEach(element => {
        element.proteccion.forEach((value: any) => {
          if (numero[value - 1] == (1).toString()) {
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
        numero[element.posicion - 1] = agregar
        contador = 0
      });
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

      var numero = new Array<string>()
      var proteccionesP = new Array<any>()
      for (var i = 0; i < posicionesP.length; i++) {
        for (var j = i + 1; j < posicionesP.length; j++) {
          var num = posicionesP[i] + posicionesP[j]
          if (proteccionesP.filter(element => element.posicion == i + 1).length != 0 || proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
            if (proteccionesP.filter(element => element.posicion == i + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == i + 1)
              proteccionesP[index].proteccion.push(num)
            }
            if (proteccionesP.filter(element => element.posicion == j + 1).length != 0) {
              var index = proteccionesP.findIndex(element => element.posicion == j + 1)
              proteccionesP[index].proteccion.push(num)
            }
          }
          else {
            proteccionesP.push({ posicion: i + 1, proteccion: [num] })
            proteccionesP.push({ posicion: j + 1, proteccion: [num] })
          }
        }
      };
      proteccionesP.push({ posicion: posicionesP[posicionesP.length - 1], proteccion: [] })
      var suma = 0
      proteccionesP.forEach(element => {
        suma += element.posicion
      });
      for (var j = 0; j < posicionesP.length - 1; j++) {
        proteccionesP[proteccionesP.length - 1].proteccion.push(proteccionesP[j].posicion + proteccionesP[proteccionesP.length - 1].posicion)
      }
      proteccionesP.forEach(element => {
        element.proteccion.push(suma)
      });

      var contador = 0
      var comprobar = ""
      var review = new Array<any>()
      var numeroAux = new Array<string>()
      band = false;
      numero = []
      var l = 0
      for (var i = this.haming.length - 1; i >= 0; i--) {
        numero[l] = this.haming[i]
        l++
      }

      proteccionesP.forEach(element => {
        element.proteccion.forEach((value: any) => {
          if (numero[value - 1] == (1).toString())
            contador++
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
        if (numero[element.posicion - 1] != comprobar) {
          console.log("DISTINTO")
          //          numeroAux[element.posicion - 1] = comprobar
          review.push(numero[element.posicion - 1])
          band = true
        }
        contador = 0
      });
      if (band != false) {
        this.hamingCorrecto = "Todavia no se :)"
        console.log(review)
        for (var j = numero.length - 1; j >= 0; j--) {
          /*if
          this.hamingCorrecto += numeroAux[j]
          console.log(review)
        }
        this.hamingIncorrecto = true
      }
      else {
        console.log("band es false")

        var l = 0
        console.log(numero)
        for (var i = 0; i < this.haming.length; i++) {
          console.log(posicionesP[l])
          console.log(i)
          if (posicionesP[l] - 1 != i) {
            numeroAux.push(numero[i])

          }
          else
            l++
          //else

        }

        console.log(numeroAux)
        var aux = ""
        for (var i = numeroAux.length - 1; i >= 0; i--) {
          aux += numeroAux[i]
        }

        console.log(aux)
        switch (this.selectedTipo) {
          case "N":
            this.binNat = aux
            this.ms.add({ severity: 'success', summary: 'Calculo Exitoso!', detail: 'El resultado se encuentra en la casilla correspondiente al mensaje destino' });
            break;
        }
      }
    }
  }*/

  calcularParidad() {
    var tabla = true
    var habilitado = true
    var str = ""
    switch (this.selectedTipo.value) {
      case "BN":
        tabla = false
        if (this.binNat == "")
          habilitado = false
        else
          str = this.binNat
        break;
      case "G":
        tabla = false
        if (this.gray == "")
          habilitado = false
        else
          str = this.gray
        break;
      case "J":
        tabla = false
        if (this.johnson == "")
          habilitado = false
        else
          str = this.johnson
        break;
      case "BCON":
        if (this.bcoN == "")
          habilitado = false
        else
          str = this.bcoN
        break;
      case "BCOJ":
        if (this.bcoJ == "")
          habilitado = false
        else
          str = this.bcoJ
        break;
      case "BCOG":
        if (this.bcoG == "")
          habilitado = false
        else
          str = this.bcoG
        break;

      //  BCD
      case "BCDN":
        if (this.bcdN == "")
          habilitado = false
        else
          str = this.bcdN
        break;
      case "BCDJ":
        if (this.bcdJ == '')
          habilitado = false
        else
          str = this.bcdJ
        break;

      case "BCDG":
        if (this.bcdG == '')
          habilitado = false
        else
          str = this.bcdG
        break;

      //  BCH
      case "BCHN":
        if (this.bchN == "")
          habilitado = false
        else
          str = this.bchN
        break;
      case "BCHJ":
        if (this.bchJ == '')
          habilitado = false
        else
          str = this.bchJ
        break;

      case "BCHG":
        if (this.bchG == '')
          habilitado = false
        else
          str = this.bchG
        break;
      default:
        habilitado = false
        break;
    }

    if (habilitado == true) {
      if (tabla == false)
        this.bitParidad = this.insertarBitParidad(str, this.paridad, this.selectedUbicacion)
      else {
        this.bitParidad = ""
        var arr = new Array<string>()
        arr = str.split('-')
        arr.forEach(element => {
          this.bitParidad += this.insertarBitParidad(element, this.paridad, this.selectedUbicacion)
          this.bitParidad += " "
        });
      }
    }




  }

  limpiar() {
    this.bitParidad = ""
    this.haming = ""
    this.hamingIncorrecto = false
    this.hamingCorrecto = ""
    this.text = ""
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


  /*grayToBinary(a: string) {
    var size = a.length
    var num = a[0]
    for (var i = 1; i < size; i++) {
      var aux = Number(a[i - 1]) + Number(a[i])
      if (aux == 2 || aux == 0)
        num = num + (0).toString()
      else
        num = num + (1).toString()*/


  grayToBinary(gray: string): string {
    let binary = "";
    let size = gray.length;

    // El primer bit es el mismo en Gray y en binario
    binary += gray[0];

    // Recorre los bits restantes del número Gray
    for (let i = 1; i < size; i++) {
      // Si el bit en la posición i de Gray es 0, el bit en la posición i de binario es el mismo
      if (gray[i] === "0") {
        binary += binary[i - 1];
      }
      // Si el bit en la posición i de Gray es 1, el bit en la posición i de binario es el inverso del bit en la posición i-1 de binario
      else {
        binary += binary[i - 1] === "0" ? "1" : "0";
      }

      //
    }

    return binary;
  }

  //--------------------------------------------------------------------------------------

  allToBcxAll(a: string, tabla: Array<any>) {
    let aux = ["A", "B", "C", "D", "E", "F"]
    let res = "";
    let y: number
    for (let i = 0; i < a.length; i++) {
      if (aux.indexOf(a[i]) === -1) {
        y = Number(a[i])
        res += "-" + tabla[y].label
      } else {
        y = aux.indexOf(a[i]);
        res += "-" + tabla[y + 10].label
      }
    }
    return res.substring(1, res.length);;
  }

  //------------------------------------------------------------

  bcxAllToDecimal(a: string, tabla: Array<any>, op: string) {
    let res = "";
    let y = ""
    let ini = 0
    let fn = 0



    for (let i = 0; i < a.length; i++) {

      if (a[i] === "-" || i === a.length - 1) {

        if (i === a.length - 1) fn = i + 1;
        else fn = i;

        y = a.substring(ini, fn);

        if (a[i] === "-") ini = fn + 1;
        else ini = fn

        tabla.forEach(element => {
          if (element.label === y) {
            res += element.value.toString();
          }
        })

      }

    }

    if (op == "BCOG" || op == "BCON" || op == "BCOJ") res = this.octalToDecimal(res).toString();
    if (op == "BCHG" || op == "BCHN" || op == "BCHJ") res = this.hexToDecimal(res).toString();


    return res;
  }



  insertarBitParidad(a: string, par: boolean, lugar: string) {
    var completo = ""
    var agregar = ""
    var contador = 0

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
      completo = agregar + a
    else if (lugar == "C") {
      if (a.length % 2 == 0) {
        var pos = Number(a.length / 2)
        var st1 = a.slice(0, pos)
        var st2 = a.slice(pos, a.length)
        completo = st1 + agregar + st2
      }
      else
        completo = "Ingrese un valor con una cantidad par de digitos"
    }
    else
      completo = a + agregar
    return completo
  }
}
