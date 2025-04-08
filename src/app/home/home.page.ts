import { Component, ElementRef, ViewChild } from '@angular/core';
import { GestionApiService} from '../services/gestion-api.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
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

  datosTablaTab1 = [
    { nombre: 'Juan', apellido: 'garcia', pais: 'españa', edad: 1 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 2 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 3 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 4 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 5 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 6 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 7 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 8 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 9 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 10 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 11 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 12 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 13 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 14 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: 'españa', edad: 15 },
    { nombre: 'Juan', apellido: 'garcia', pais: 'españa', edad: 16 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 17 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 18 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 19 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 20 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 21 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 22 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 23 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 24 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 25 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 26 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 27 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 28 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 29 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: 'españa', edad: 30 },
    { nombre: 'Juan', apellido: 'garcia', pais: 'españa', edad: 31 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 32 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 33 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 34 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 35 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 36 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 37 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 38 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 39 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 40 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 41 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 42 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 43 },
    { nombre: 'María', apellido: 'perez', pais: 'portugal', edad: 44 },
    { nombre: 'Pedro', apellido: 'ruiz', pais: 'españa', edad: 45 }
  ];
  

  datosLista = [
    "Esta será la línea 1 de la lista, vamos a poner un texto muy largo para ver qué es lo que hace en estos casos y como podemos corregirlo",
    "Esta será la línea 2 de la lista, será más corta que la anterior, pero entrará bastante justo en el ancho A4.",
    "Esta será la línea 3 de la lista, este entra bien",
    "Esta será la línea 4 de la lista, este entra bien",
    "Esta será la línea 5 de la lista, este entra bien",
    "Esta será la línea 6 de la lista, este entra bien",
    "Esta será la línea 7 de la lista, este entra bien",
    "Esta será la línea 8 de la lista, este entra bien",
    "Esta será la línea 9 de la lista, este entra bien",
    "Esta será la línea 10 de la lista, este entra bien",
    "Esta será la línea 11 de la lista, este entra bien",
    "Esta será la línea 12 de la lista, este entra bien",
    "Esta será la línea 13 de la lista, este entra bien",
    "Esta será la línea 14 de la lista, este entra bien",
    "Esta será la línea 15 de la lista, este entra bien",
    "Esta será la línea 16 de la lista, este entra bien",
    "Esta será la línea 17 de la lista, este entra bien",
    "Esta será la línea 18 de la lista, este entra bien",
    "Esta será la línea 19 de la lista, este entra bien",
    "Esta será la línea 20 de la lista, este entra bien",
  ]

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
  /* En el html, añadimos el atributo #container al div padre (será una id única), para luego poder gestionar todo lo que hay dentro de este div.
   * @ViewChield('container'), busca el atributo #container
   * Añadimos !, para decirle que el valor no será ni null ni undefined. En caso contrarío tendríamos que comprobar que if(this.container) antes de 
   * realizar this.container.nativeElement.
   */
  @ViewChild('container') container!: ElementRef;
  //Generamos el pdf
  generarPDF() {
    //Ancho en px de A4
    const anchoMax = 794 //794px; //210mm
    //Alto en px de A4
    const altoMax = 1123;//1123px; //297mm
    const doc = new jsPDF({
      orientation: 'portrait', //Orientación normal
      unit: 'px', //En este caso como unidades utilizamos px, pero podríamos poner cm,mm,em,pt,...
      //mm -> [210, 297] para A4
      format: [anchoMax,altoMax]
    });
    
    /* querySelectorAll: Cogemos todos los selectores que tengan class="seccion" y creamos un NodeListOf de HTMLElement.
     * NodeListOf, es un array que contendrá nodos de DOM, en este caso, es un array de HTMLElement.
     */
    const sections = this.container.nativeElement.querySelectorAll('.seccion') as NodeListOf<HTMLElement>;
    // El total de secciones que tenemos en nuestro html
    const totalSections = sections.length;
    //Gestionará la sección que estamos analizando
    let currentSectionIndex = 0;
    //Controlará que se hayan creado todas las imagenes antes de crear el PDF. En caso contrario imprimiría un pdf por cada sección.
    let contSections = 0;
    //Definimos de que height queremos que empiece a dibujar nuestro PDF.
    let headerHeight = 55; //Altura del padding que le hemos dado al header
    let footerHeight = 10; //Altura del padding que le hemos dado al footer
    let currentPageHeight = headerHeight+footerHeight;

    while (currentSectionIndex < totalSections) {
      const section = sections[currentSectionIndex];
      html2canvas(section).then(canvas => {
        const imageData = canvas.toDataURL('image/jpg');
        const width = doc.internal.pageSize.getWidth();
        /*Se calcula el height dependiendo del width del canvas y su relación con el width. 
         *Esto se hace para que la imagen mantenga dimensiones proporcionales según el width de la página.
         */
        const height = canvas.height * (width / canvas.width);
        if (currentPageHeight + height >= doc.internal.pageSize.getHeight()) {
          doc.addPage();
          currentPageHeight = headerHeight+footerHeight;
          //currentPageHeight = headerHeight + footerHeight;
          //this.addPageConfig(doc);
        }
        //this.addPageConfig(doc);
        doc.addImage(imageData, 'JPG', 0, currentPageHeight - footerHeight, width, height);
        currentPageHeight += height;
        contSections++;
        if (contSections === totalSections) {
          //Al final asignamos el header y footer a todas las páginas
          this.addPageConfig(doc);
          doc.save('dashboard.pdf');
        }
      });
      //Sumamos 1, para que el bucle realice todas las peticiones, una por cada sección
      currentSectionIndex++;
    }
  }

  addPageConfig(doc: jsPDF) {
    for (let i = 1; i <= doc.getNumberOfPages(); i++) {
      doc.setPage(i);
      this.addHeader(doc);
      this.addFooter(doc, i);
    }
  }
  addHeader(doc: jsPDF) {
    const imagen = "/assets/icon/favicon.png";
    const imgWidth = 60;
    const imgHeight = 45;

    // Centrar la imagen
    const imgX = (doc.internal.pageSize.width - imgWidth) / 2;
    const imgY = 5;
  
    // Dibujar fondo gris : doc.rect(paddingX, paddingY, pageWidth - (2 * paddingX), headerHeight, 'F'); crea el rectángulo con margen.
    doc.setFillColor('rgb(201, 203, 207)');
    doc.rect(10, imgY, doc.internal.pageSize.width-20, imgHeight, 'F');

    doc.addImage(imagen, "JPG", imgX, imgY, imgWidth, imgHeight);
    doc.setFontSize(10);
    doc.line(0, 55, doc.internal.pageSize.width, 55);
  
    const nombreEmpresa = "Birt LH";
    const telefono = "Teléfono: 123-456-789";
    const direccion = "Dirección: Calle Vitoria, 123";
    const texto = `${nombreEmpresa}\n${telefono}\n${direccion}`;
  //doc.text(text, x, y, options);
    doc.text(texto, 20, 20, { align: 'left' });
  }
  
  addFooter(doc: jsPDF, pageNumber: number) {
    doc.setFontSize(10);
    const texto = "Página "+pageNumber +" de "+doc.getNumberOfPages();
    const textWidth = doc.getTextWidth(texto);
    const pageWidth = doc.internal.pageSize.width;

    // Dibujar fondo gris
    doc.setFillColor('rgb(201, 203, 207)');
    // Dibujar fondo gris : doc.rect(paddingX, paddingY, widthX, widthY, 'F'); crea el rectángulo con margen.
    doc.rect(10, doc.internal.pageSize.height - (2*10),  doc.internal.pageSize.width-(2*10), 15, 'F');
    //doc.text(text, x, y, options);
    doc.text(texto, (pageWidth - textWidth) / 2, doc.internal.pageSize.height - 10, { baseline: 'bottom' , align: 'center'});
  }

}
