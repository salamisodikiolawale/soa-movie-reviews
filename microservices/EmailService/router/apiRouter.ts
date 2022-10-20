import express from 'express';
import {sendEMail} from "../controller/mailController";

const apiRouter:express.Router = express.Router();

/*
    Usage: Send a mail
    URL : http://127.0.0.1:3004/api/v1/emails
    Method : POST
    Fields: targetEmail, subject, message
    Access: Public
 */
apiRouter.post('/emails', sendEMail);

export default apiRouter;