import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import { fromEventPattern } from 'rxjs';

//Importa el servicio para enviar correos(no funciona por el momento)
// import { CorreosAfiliacionesService } from 'src/app/correos-afiliaciones.service';

// Templates Del Componente
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
})
export class FormPageComponent implements OnInit {
  //  public fechaActual: Date = new Date();
  minDate: string;
  maxDate: string;

  isLoading = true;
  //Declaracion de Variables Para asignar los input con ngModel
  formData = {
    EmailEstudiante: '',
    ModalidadPractica: '',
    PeriodoAcademico: '',
    DocumentoIdentidadFile: '',
    TipoIdentificacion: '',
    NumeroIdentifiacion: '',
    NombreEstudiante: '',
    ProgramaAcademico: '',
    TipoPractica: '',
    RutFile: '',
    NombreEmprendimiento: '',
    NitEmprendimiento: '',
    CamaraComercioFile: '',
    FechaNacimiento: '',
    EpsEstudiante: '',
    DocumentoEPSFile: '',
    NumeroTelEstudiante: '',
    CorreoInstitucional: '',
    NombreEmpresaPracticas: '',
    NitEmpresaPracticas: '',
    RiesgoEstudiante: '',
    NombrePersonaAcargoPractica: '',
    TelefonoPersonasAcargo: '',
    EmailPersonaAcargoPractica: '',
    FechaInicioPractica: '',
    FechaTerminacionPractica: '',
    ActaInicioPractica: '',
    Regional: '',
    seleccion: '',
  };
  coincidencias: string[] = [];
  busqueda: string = '';
  public dataa: any[] = [];

  buscar(): void {
    const busquedaa = this.busqueda.toLowerCase(); // Busqueda en minúsculas
    const opciones = this.dataa.slice(1); // Omitir la primera fila que contiene los encabezados
    const mejoresCoincidencias = opciones
      .filter(
        (opcion) => opcion[0] && opcion[0].toLowerCase().includes(busquedaa) // Convertir a minúsculas
      )
      .map((opcion) => opcion[0]);

    this.coincidencias = mejoresCoincidencias;
    this.formData.seleccion = mejoresCoincidencias[1];
    console.log(this.coincidencias);
  }
  public CargarData(): void {
    this.http
      .get('/assets/PLANTILLA ARL.xlsx', { responseType: 'arraybuffer' })
      .subscribe((data) => {
        const workbook = XLSX.read(new Uint8Array(data), { type: 'array' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        this.dataa = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      });
  }
  //eee
  //Campo Limite Fechas
  constructor(private http: HttpClient) {
    const today = new Date();
    const dosDias = new Date(today.setDate(today.getDate() + 3));
    this.minDate = dosDias.toISOString().slice(0, 16);

    // const todayy = new Date();
    const TreintaDias = new Date(dosDias.setDate(dosDias.getDate() + 32));
    this.maxDate = TreintaDias.toISOString().slice(0, 16);
  }
  //constructor de el servicio ,private correosAfiliacionesService:CorreosAfiliacionesService){}

  //Funcion que se ejecuta para convertir los input en formato json al hacer click en enviar
  submitForm(form: NgForm) {
    //verificacion De CUNBRe
    if (
      this.formData.ModalidadPractica == 'Cunbre emprendimiento consolidado'
    ) {
      if (
        this.formData.EmailEstudiante == '' ||
        this.formData.RutFile == '' ||
        this.formData.CamaraComercioFile == '' ||
        this.formData.NombreEmprendimiento == '' ||
        this.formData.NitEmprendimiento == '' ||
        this.formData.DocumentoIdentidadFile == '' ||
        this.formData.TipoIdentificacion == '' ||
        this.formData.NumeroIdentifiacion == '' ||
        this.formData.NombreEstudiante == '' ||
        this.formData.PeriodoAcademico == '' ||
        this.formData.TipoPractica == '' ||
        this.formData.FechaNacimiento == '' ||
        this.formData.EpsEstudiante == '' ||
        this.formData.DocumentoEPSFile == '' ||
        this.formData.CorreoInstitucional == '' ||
        this.formData.seleccion == '' ||
        this.formData.Regional == ''
      ) {
        Swal.fire({
          title: '¡Error!',
          text: 'Todos los campos son obligatorios',
          icon: 'warning',
        });
      } else {
        //Asignacion de no Aplica para los input que desaparecen
        const Vacio = 'NA';
        this.formData.RiesgoEstudiante = Vacio;
        this.formData.NombrePersonaAcargoPractica = Vacio;
        this.formData.TelefonoPersonasAcargo = '0';
        this.formData.EmailPersonaAcargoPractica = Vacio;
        this.formData.FechaInicioPractica = Vacio;
        this.formData.FechaTerminacionPractica = Vacio;
        this.formData.ActaInicioPractica = '';
        return this.Enviar();
      }
    } else {
      if (this.formData.ModalidadPractica == 'Cunbre emprendimiento naciente') {
        if (
          this.formData.EmailEstudiante == '' ||
          this.formData.RutFile == '' ||
          this.formData.NombreEmprendimiento == '' ||
          this.formData.NitEmprendimiento == '' ||
          this.formData.DocumentoIdentidadFile == '' ||
          this.formData.TipoIdentificacion == '' ||
          this.formData.NumeroIdentifiacion == '' ||
          this.formData.NombreEstudiante == '' ||
          this.formData.PeriodoAcademico == '' ||
          this.formData.TipoPractica == '' ||
          this.formData.FechaNacimiento == '' ||
          this.formData.EpsEstudiante == '' ||
          this.formData.DocumentoEPSFile == '' ||
          this.formData.CorreoInstitucional == '' ||
          this.formData.seleccion == '' ||
          this.formData.Regional == ''
        ) {
          Swal.fire({
            title: '¡Error!',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
          });
        } else {
          //Asignacion de no Aplica para los input que desaparecen
          const Vacio = 'NA';
          this.formData.CamaraComercioFile = '';
          this.formData.RiesgoEstudiante = Vacio;
          this.formData.NombrePersonaAcargoPractica = Vacio;
          this.formData.TelefonoPersonasAcargo = '';
          this.formData.EmailPersonaAcargoPractica = Vacio;
          this.formData.FechaInicioPractica = Vacio;
          this.formData.FechaTerminacionPractica = Vacio;
          this.formData.NitEmpresaPracticas = '';
          this.formData.NumeroTelEstudiante = '';
          this.formData.NombreEmpresaPracticas = Vacio;
          this.formData.ActaInicioPractica = '';
          return this.Enviar();
        }
      } else {
        if (
          this.formData.EmailEstudiante == '' ||
          this.formData.ModalidadPractica == '' ||
          this.formData.PeriodoAcademico == '' ||
          this.formData.DocumentoIdentidadFile == '' ||
          this.formData.NumeroIdentifiacion == '' ||
          this.formData.NombreEstudiante == '' ||
          this.formData.ProgramaAcademico == '' ||
          this.formData.TipoPractica == '' ||
          this.formData.FechaNacimiento == '' ||
          this.formData.EpsEstudiante == '' ||
          this.formData.DocumentoEPSFile == '' ||
          this.formData.NumeroTelEstudiante == '' ||
          this.formData.CorreoInstitucional == '' ||
          this.formData.NombreEmpresaPracticas == '' ||
          this.formData.NitEmpresaPracticas == '' ||
          this.formData.RiesgoEstudiante == '' ||
          this.formData.NombrePersonaAcargoPractica == '' ||
          this.formData.TelefonoPersonasAcargo == '' ||
          this.formData.EmailPersonaAcargoPractica == '' ||
          this.formData.FechaInicioPractica == '' ||
          this.formData.TipoIdentificacion == '' ||
          this.formData.FechaTerminacionPractica == '' ||
          this.formData.ActaInicioPractica == '' ||
          this.formData.seleccion == '' ||
          this.formData.Regional == ''
        ) {
          Swal.fire({
            title: '¡Error!',
            text: 'Todos los campos son obligatorios',
            icon: 'warning',
          });
        } else {
          //Asignacion de no Aplica para los input que desaparecen
          const Vacio = 'NA';
          // this.formData.CamaraComercioFile = null;
          this.formData.NitEmprendimiento = '';
          this.formData.NombreEmprendimiento = Vacio;
          this.formData.RutFile = '';
          return this.Enviar();
        }
      }
    }
    
    form.resetForm();
  }
  
  Recarga(){
    window.location.reload();
  }
  //Funcion enviar que añade los input al JSON y hace post a la api
  Enviar() {
    this.isLoading = true;
    const form = new FormData();
    form.append('EmailEstudiante', this.formData.EmailEstudiante);
    form.append('ModalidadPractica', this.formData.ModalidadPractica);
    form.append('PeriodoAcademico', this.formData.PeriodoAcademico);
    form.append('DocumentoIdentidadFile', this.formData.DocumentoIdentidadFile);
    form.append('NumeroIdentifiacion', this.formData.NumeroIdentifiacion);
    form.append('TipoIdentifiacion', this.formData.TipoIdentificacion);
    form.append('NombreEstudiante', this.formData.NombreEstudiante);
    form.append('ProgramaAcademico', this.formData.ProgramaAcademico);
    form.append('TipoPractica', this.formData.TipoPractica);
    form.append('RutFile', this.formData.RutFile);
    form.append('CamaraComercioFile', this.formData.CamaraComercioFile);
    form.append('NombreEmprendimiento', this.formData.NombreEmprendimiento);
    form.append('NitEmprendimiento', this.formData.NitEmprendimiento);
    form.append('FechaNacimiento', this.formData.FechaNacimiento);
    form.append('EpsEstudiante', this.formData.EpsEstudiante);
    form.append('DocumentoEPSFile', this.formData.DocumentoEPSFile);
    form.append('NumeroTelEstudiante', this.formData.NumeroTelEstudiante);
    form.append('CorreoInstitucional', this.formData.CorreoInstitucional);
    form.append('NombreEmpresaPracticas', this.formData.NombreEmpresaPracticas);
    form.append('NitEmpresaPracticas', this.formData.NitEmpresaPracticas);
    form.append('RiesgoEstudiante', this.formData.RiesgoEstudiante);
    form.append(
      'NombrePersonaAcargoPractica',
      this.formData.NombrePersonaAcargoPractica
    );
    form.append('TelefonoPersonasAcargo', this.formData.TelefonoPersonasAcargo);
    form.append(
      'EmailPersonaAcargoPractica',
      this.formData.EmailPersonaAcargoPractica
    );
    form.append('FechaInicioPractica', this.formData.FechaInicioPractica);
    form.append(
      'FechaTerminacionPractica',
      this.formData.FechaTerminacionPractica
    );
    form.append('ActaInicioPractica', this.formData.ActaInicioPractica);
    form.append('Regional', this.formData.Regional);
    form.append('seleccion', this.formData.seleccion);

    const formDataJson = JSON.stringify(this.formData);
    //console.log(formDataJson);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
    //metodo post para enviar los datos
    this.http
      .post(
        'https://apiarl.cunapp.pro/api/GoogleArl',
        formDataJson,
        httpOptions
      )
      .subscribe(
        (response) => {
          const JsonResponse = JSON.stringify(response);
          const responseObject = JSON.parse(JsonResponse);
          if (responseObject.status) {
            this.isLoading = false;
            Swal.fire({
              title: '¡Éxito!',
              text: responseObject.message,
              icon: 'success',
            }).then((result)=>{
              if(result.isConfirmed){
                return  this.Recarga();
              }
            });
          } else {
            this.isLoading = false;
            Swal.fire({
              title: '¡Error!',
              text: responseObject.message,
              icon: 'warning',
            });
          }
          console.log(responseObject);
        },
        (error) => {
          this.isLoading = false;
          Swal.fire({
            title: '¡Error!',
            text: 'No se pudo conectar a la base de datos',
            icon: 'error',
          });
        }
      );

    //Muestra el JSON en una nueva ventana con finalidad de comprobar la integridad de los datos
    // const blob = new Blob([formDataJson] , {type: 'application/json'});
    // const url = window.URL.createObjectURL(blob);
    // const link = document.createElement('a');
    // link.href = url;
    // link.target = 'Formulario.json';
    // link.click();

    //Llama el servicio De correos al

    // this.correosAfiliacionesService.enviarCorreo(this.formData.EmailEstudiante,this.formData.ModalidadPractica,this.formData.NombreEmpresaPracticas);
    
  }

  //Funcion Que convierte los input de tipo file a base 64 para poder enviarlos en formato json
  onFileChange(event: any) {
    const file = event.target.files[0];
    if (!file) {
      return;
    }
    if (event.target.name === 'DocumentoIdentidadFile') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base64 = reader.result.toString().split(',')[1];
          this.formData.DocumentoIdentidadFile = base64;
        } else {
          console.error('Error al leer el archivo');
        }
      };
    } else if (event.target.name === 'DocumentoEPSFile') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base65 = reader.result.toString().split(',')[1];
          this.formData.DocumentoEPSFile = base65;
        } else {
          console.error('Error De archivo');
        }
      };
    } else if (event.target.name === 'ActaInicioPractica') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base66 = reader.result.toString().split(',')[1];
          this.formData.ActaInicioPractica = base66;
        } else {
          console.error('Error De archivo');
        }
      };
    } else if (event.target.name === 'RutFile') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base67 = reader.result.toString().split(',')[1];
          this.formData.RutFile = base67;
        } else {
          console.error('Error De archivo');
        }
      };
    } else if (event.target.name === 'CamaraComercioFile') {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.result) {
          const base68 = reader.result.toString().split(',')[1];
          this.formData.CamaraComercioFile = base68;
        } else {
          console.error('Error De archivo');
        }
      };
    }
  }

  ngOnInit(): void {
    // Ocultar el div de loading después de que el DOM haya cargado
    this.isLoading = false;
    this.CargarData();
  }
}
