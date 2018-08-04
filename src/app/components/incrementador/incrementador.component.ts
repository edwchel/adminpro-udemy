import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgreso') txtProgreso: ElementRef;
  @Input('nombre') leyenda: string = 'Leyenda'; // string vacio
  @Input() porcentaje: number = 80;

  @Output('actulizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    console.log('leyenda', this.leyenda);
    // console.log('porcentaje', this.porcentaje);
  }

  ngOnInit() {
    // console.log('leyenda', this.leyenda);
    console.log('porcentaje', this.porcentaje);
  }

  onChanges(newValue: number) {

    // let elemHTML: any = document.getElementsByName('porcentaje')[0];

    console.log(this.txtProgreso);

    if (newValue >= 100 ) {
    this.porcentaje = 100;
    } else if (newValue <= 0) {
      this.porcentaje = 0;
    } else {
      this.porcentaje = newValue;
    }

    // elemHTML.value = Number(this.porcentaje);
    this.txtProgreso.nativeElement.value = this.porcentaje;
    this.cambioValor.emit(this.porcentaje);

  }

  cambiarValor(valor) {
    if (this.porcentaje >= 100 && valor > 0) {
      this.porcentaje = 100;
      return;
    }

    if (this.porcentaje <= 0 && valor < 0) {
      return;
    }
    this.porcentaje = this.porcentaje + valor;
    this.cambioValor.emit(this.porcentaje);
    this.txtProgreso.nativeElement.focus();

  }
}
