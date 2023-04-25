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
  op!: string

  constructor() { }

  tranformar() {
    switch (this.op) {
      case "decimal":
        
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

  decimalToOctal() {
    var dec = this.decimal
    
  }
}
