import { Component } from '@angular/core';
import { GestionApiService } from '../services/gestion-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  // Array donde añadimos las categorías que queremos analizar
  categorias: string[] = [
    "business",
    "entertainment",
    "general",
    "technology",
    "health",
    "science",
    "sports"
  ];

  //El color que tendrá cada columna de la gráfica bar-chart
  backgroundColorCat: string[] = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(201, 203, 207, 0.2)'
  ];

  //El color del borde que tendrá cada columna de la gráfica bar-chart
  borderColorCat: string[] =[
    'rgb(255, 99, 132)',
    'rgb(255, 159, 64)',
    'rgb(255, 205, 86)',
    'rgb(75, 192, 192)',
    'rgb(54, 162, 235)',
    'rgb(153, 102, 255)',
    'rgb(201, 203, 207)'
  ];

  //Inicializamos la variable con el valor del primer elemento del ion-segment, en este caso bar-chart
  tipoDeChartSeleccionado: string = "bar-chart";

  //Hacemos uso de GestionApiService
  constructor(public gestionServiceApi: GestionApiService) {}

  //Cuando desde home.page.html llama a este componente, después de crear las variables y ejecutar el constructor, será el primer método en ejecutar.
  //Mediante un bucle, llamaremos al método cargarCategoria del servicio GestionApiService, para que realice tantas peticiones API como caegorías tenemos.
  ngOnInit(){
    this.categorias.forEach(categoria => {
      this.gestionServiceApi.cargarCategoria(categoria);
    });
  }

  //Gestionamos el cambio de segmento
  segmentChanged(event: any) {
    //Añadimos la ruta
    //this.router.navigate(['/tabs/graficos', event.detail.value]);
    //Recogemos el tipo de chart (bar-chart, line-chart o pie-chart), mediante event.detail.value
    this.tipoDeChartSeleccionado = event.detail.value;
    //En caso de bar-chart, realizamos una llamada al api por cada categoria que tenemos.
    if (this.tipoDeChartSeleccionado == "bar-chart"){
      this.categorias.forEach(categoria => {
        this.gestionServiceApi.cargarCategoria(categoria);
      });
    }
  }

}
