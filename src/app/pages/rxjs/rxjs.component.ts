import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription} from 'rxjs';
import { retry, map, filter} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  suscription: Subscription;
  constructor() {

    this.suscription = this.regresaObservable() // .pipe(retry(2))
    .subscribe(
      numero => console.log('subs', numero),
      error => console.error('error en el obs', error),
      () => console.log('El observador termino!')

    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
  console.log('la pagina se va a cerrar');
  this.suscription.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;

      let intervalo = setInterval(() => {

        contador++;

        const salida = {
          valor: contador
        };

        observer.next(salida);

        // if (contador === 3) {
        //   clearInterval(intervalo);
        //   observer.complete();
        // }

        // if (contador === 3) {
        //   // clearInterval(intervalo);
        //   observer.error('Auxilio Problema');
        // }

      }, 1000);

    }).pipe(
      map( respuesta => respuesta.valor),
      filter((valor, index) => {
        // console.log('filter', valor, index);

        if ((valor % 2) === 1) {
          return true;
        } else {
        return false;
        }
      })
    );

  }

}
