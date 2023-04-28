import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule,} from '@angular/forms';
import { NgModel } from '@angular/forms';
import { Validators } from '@angular/forms';
//Importa el servicio para enviar correos(no funciona por el momento)
// import { CorreosAfiliacionesService } from 'src/app/correos-afiliaciones.service';


// Templates Del Componente
@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})



export class FormPageComponent {
  
  //Declaracion de Variables Para asignar los input con ngModel
  formData  = {
    EmailEstudiante:'',
    ModalidadPractica: '',
    PeriodoAcademico:'',
    DocumentoIdentidadFile: '',
    NumeroIdentifiacion:'',
    NombreEstudiante:'',
    ProgramaAcademico:'',
    TipoPractica:'',
    FechaNacimiento:'',
    EpsEstudiante:'',
    DocumentoEPSFile:'',
    NumeroTelEstudiante:'',
    CorreoInstitucional:'',
    NombreEmpresaPracticas:'',
    NitEmpresaPracticas:'',
    RiesgoEstudiante:'',
    NombrePersonaAcargoPractica:'',
    TelefonoPersonasAcargo:'',
    EmailPersonaAcargoPractica:'',
    FechaInicioPractica:'',
    FechaTerminacionPractica:'',
    ActaInicioPractica:'',
    Regional:'',
    
  }

  
  constructor(private http: HttpClient){}
    //constructor de el servicio ,private correosAfiliacionesService:CorreosAfiliacionesService){}

    //Funcion que se ejecuta para convertir los input en formato json al hacer click en enviar
  submitForm() {
    
    if(this.formData.EmailEstudiante == "" || this.formData.ModalidadPractica == "" || this.formData.PeriodoAcademico == "" || this.formData.DocumentoIdentidadFile == ""
    ||this.formData.NumeroIdentifiacion == "" || this.formData.NombreEstudiante == "" || this.formData.ProgramaAcademico == "" || this.formData.TipoPractica == "" 
    ||this.formData.FechaNacimiento == ""){
      alert("Porfavor Llena Completamente El Formulario")
    }else return this.Enviar()
    

    
      
      
    
}

Enviar(){
  const form = new FormData();

    form.append('EmailEstudiante',  this.formData.EmailEstudiante);
    form.append('ModalidadPractica', this.formData.ModalidadPractica);
    form.append('PeriodoAcademico', this.formData.PeriodoAcademico);
    form.append("DocumentoIdentidadFile", this.formData.DocumentoIdentidadFile);
    form.append('NumeroIdentifiacion', this.formData.NumeroIdentifiacion);
    form.append('NombreEstudiante', this.formData.NombreEstudiante);
    form.append('ProgramaAcademico', this.formData.ProgramaAcademico);
    form.append('TipoPractica', this.formData.TipoPractica);
    form.append('FechaNacimiento', this.formData.FechaNacimiento);
    form.append('EpsEstudiante', this.formData.EpsEstudiante);
    form.append('DocumentoEPSFile', this.formData.DocumentoEPSFile);
    form.append('NumeroTelEstudiante', this.formData.NumeroTelEstudiante);
    form.append('CorreoInstitucional', this.formData.CorreoInstitucional);
    form.append('NombreEmpresaPracticas', this.formData.NombreEmpresaPracticas);
    form.append('NitEmpresaPracticas', this.formData.NitEmpresaPracticas);
    form.append('RiesgoEstudiante', this.formData.RiesgoEstudiante);
    form.append('NombrePersonaAcargoPractica', this.formData.NombrePersonaAcargoPractica);
    form.append('TelefonoPersonasAcargo', this.formData.TelefonoPersonasAcargo);
    form.append('EmailPersonaAcargoPractica', this.formData.EmailPersonaAcargoPractica);
    form.append('FechaInicioPractica', this.formData.FechaInicioPractica);
    form.append('FechaTerminacionPractica', this.formData.FechaTerminacionPractica);
    form.append('ActaInicioPractica', this.formData.ActaInicioPractica);
    form.append('Regional', this.formData.Regional);

    const formDataJson = JSON.stringify(this.formData);
    console.log(formDataJson);


      //metodo post para enviar los datos 
    // this.http.post('http://127.0.0.1:8000/api/register', form)
    //   .subscribe(
    //     (response) =>console.log(response),

    //   )

      const blob = new Blob([formDataJson] , {type: 'application/json'});
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.target = 'Formulario.json';
      link.click();

//Llama el servicio De correos al 
  // this.correosAfiliacionesService.enviarCorreo(this.formData.EmailEstudiante,this.formData.ModalidadPractica,this.formData.NombreEmpresaPracticas);
      
}

//Funcion para Convertir los input para 
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
        console.error("Error al leer el archivo");
      }
    };
  }else if (event.target.name ==='DocumentoEPSFile'){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result){
        const base65 =reader.result.toString().split(',')[1];
        this.formData.DocumentoEPSFile = base65;
      }else{
        console.error("Error De archivo")
      }
    };
  }else if (event.target.name ==='ActaInicioPractica'){
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if(reader.result){
        const base66 =reader.result.toString().split(',')[1];
        this.formData.ActaInicioPractica = base66;
      }else{
        console.error("Error De archivo")
      }
    };
}

  


}



}  