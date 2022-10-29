import express from "express";
import nodemailer from "nodemailer";
import { MailOptions } from "../database/models/Email";
import cron  = require('node-cron');
import dotenv = require('dotenv');
import { User } from "../database/models/User";
import UserTable from "../database/shemas/UserSchema";
import * as EmailValidator from 'email-validator';
import { compmletMessage, everyWeekTemplate, everySecondTemplate } from "../template/ScheduleMailTemplate";
import axios from "axios";
import { EmailMovie } from "../database/models/EmailMovie";


dotenv.config();


export const sendEMail = async (request:express.Request, response:express.Response) => {

      let {targetEmail, msgEmail, subjectEmail} = request.body;

      let mailOptions:MailOptions = {
          from: `${process.env.EMAIL}`,
          to: `${targetEmail}`,
          subject: `${subjectEmail}`,
          html: `${compmletMessage(msgEmail)}`
        };

      let transporter = nodemailer.createTransport({
        service: `${process.env.SERVICE}`,
        auth: {
          user: `${process.env.EMAIL}`,
          pass: `${process.env.PASSWORD}`,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail(mailOptions, (err, info) => {
        if(err){
            return response.status(500).json({'msg':'Email not send'})
        }
        return response.status(200).json({'msg':"success",'info':info})
      })
      
}

//SCHEDULE MAILER
const scheduleSendEMail = async (user:User) => {

    let fiveLastMovies:EmailMovie[] = []
    const numberOfMovie = 5;

    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            "Access-Control-Allow-Origin": "*",
            "Host": "crud_service.localhost"
        }
    };
    
    try {

        //Send request to crud movie service for get movies
        await axios.get(`${process.env.CRUD_SERVICE}`+numberOfMovie, axiosConfig).then( (resp) => {

                resp.data.movies.forEach( (movie:any) => {

                    fiveLastMovies.push({title:movie.title, image:movie.title})
                })
        });
            
        
        if(EmailValidator.validate(user.email)) {
            
            let mailOptions:MailOptions = {
                from: `${process.env.EMAIL}`,
                // to: `${user.email}`,
                to: 'salamisodikiolawale@gmail.com',
                subject: `${"[AOS MOVIE NEWS]"}`,
                // html: everyWeekTemplate("https://static.lpnt.fr/images/2017/12/28/12664476lpw-12664541-article-jpg_4877921_1250x625.jpg")
                html: everySecondTemplate("https://static.lpnt.fr/images/2017/12/28/12664476lpw-12664541-article-jpg_4877921_1250x625.jpg", fiveLastMovies, numberOfMovie)
            };

            // Mail transport configuration
            let transporter = nodemailer.createTransport({
            service: `${process.env.EMAIL}`,
            auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`,
                },
                tls: {
                    rejectUnauthorized: false,
                },
            });

            //Cron job
            cron.schedule('* * * * *', function () {

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) console.log(error);
                    else console.log('Email sent: ' + info.response);
                    });
            });


        } else {

            console.log("Bad email address")

        }
    } catch (error) {

        console.log(error);

    }
}



const sendEmailAuto = async () => {

    try {

        let users:User[]|null = await UserTable.find();

        if(!users){

            return;
        }
    
        users.forEach(scheduleSendEMail);

    } catch (error) {

        console.log(error);

    }
   
}

sendEmailAuto();