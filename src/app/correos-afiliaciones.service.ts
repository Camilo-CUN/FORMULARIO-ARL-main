// import { Injectable } from '@angular/core';
// import * as nodemailer from 'nodemailer';

// @Injectable({
//   providedIn: 'root'
// })
// export class CorreosAfiliacionesService {
//   transporter: any;

//   constructor() { 
//     this.transporter = nodemailer.createTransport({
//       host: 'smtp.gmail.com',
//       port:465,
//       secure: true,
//       auth:{
//         user:'noreply@cun.edu.co',
//         pass:'Alfa$123'
//       }
//     });
//   }
//   enviarCorreo(destinatario:string, asunto:string, mensaje: string){
//     const mailOptions = {
//       from: 'noreply@cun.edu.co',
//       to: destinatario,
//       subject: asunto,
//       text: mensaje 
//     };

//     interface EmailInfo {
//       accepted: string[];
//       rejected: string[];
//       envelopeTime: number;
//       messageTime: number;
//       messageSize: number;
//       response: string ; 
//       messageId: string;
//     }

//     const emailInfo: EmailInfo = {
//       accepted: ['recipient@example.com'],
//       rejected: [],
//       envelopeTime: 1000,
//       messageTime: 2000,
//       messageSize: 1024,
//       response: 'OK',
//       messageId: 'abc123'
//     };
    
    

//     this.transporter.sendMail(mailOptions, function(error: Error, info: EmailInfo) {
//       if (error) {
//         console.log(error);
//       } else {
//         console.log('Correo enviado: ' + info.response);
//       }
//     });
//   }
// }
