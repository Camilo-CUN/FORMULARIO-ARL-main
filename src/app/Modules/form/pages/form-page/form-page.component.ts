import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import * as nodemailer from 'nodemailer';
import { FormsModule } from '@angular/forms';
import { NgModel } from '@angular/forms';



@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css']
})



export class FormPageComponent {
    
  
  formData  = {
    EmailEstudiante: '',
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
  // sendEmail(){
  //   const transporter = nodemailer.createTransport({
  //     host:'smtp.gmail.com',
  //     port: 587,
  //     secure: false,
  //     auth:{
  //       user:'noreply@cun.edu.co',
  //       pass:'Alfa$123'
  //     } 
  //   });
  //   const mailOptions = {
  //     from:'Camilotriana231@gmail.com',
  //     to: this.formData.EmailEstudiante,
  //     subject: 'proyecto1',
  //     text: 'Prueba 1 '
  //   };

  //   transporter.sendMail(mailOptions,(error,info)=>{
  //     if(error){
  //       console.error(error);
  //     }else{
  //       console.log('Correo melo')
  //     }
  //   }
  //   );
  // }
  
  

  constructor(private http: HttpClient){}

  submitForm() {
    
    const form = new FormData();

    form.append('EmailEstudiante', this.formData.EmailEstudiante);
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

    // this.sendEmail();
    
}


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