import express from "express";
import nodemailer from "nodemailer";
import { Detail } from "../database/models/Email";


export const sendMail = async (request:express.Request, response:express.Response) => {

    let {targetEmail, msgEmail, subjectEmail} = request.body;

    let EMAIL:string|undefined = process.env.EMAIL;
    let PASSWORD:string|undefined = process.env.PASSWORD;
    let EMAIL_HOST:string|undefined = process.env.EMAIL_HOST;

    let mailTransport:nodemailer.Transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: 587,
        secure: false,
        requireTLS: true,
        auth : {
            user : EMAIL,
            pass: PASSWORD,

        }
    });

    let message1 = `
    <!doctype html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>Titre de la page</title>
      <link rel="stylesheet" href="style.css">
      <script src="script.js"></script>
    </head>
    <body>
      <h5 style="color:red">
    `
    let content = msgEmail
    let message2 = `
    </h5>
    </body>
    </html>
    `
    let compmletMessage = message1+content+message2


    let details:Detail = {
        from : process.env.EMAIL,
        to : `${targetEmail}`,
        subject : `${subjectEmail}`,
        html : compmletMessage
    }

    mailTransport.sendMail(details, (err) => {
        if(err) {
            response.status(404).json({
                "error" : "Your email has not send"
            })
            // console.log(err);

        } else {
            console.log("Your mail has send")
            response.status(200).json({
                "success":"Your mail has send"
            })
        }
    })



    // console.log(mailTransport);

}

