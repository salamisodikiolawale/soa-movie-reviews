import app from "./app";

let hostName:string|undefined =  process.env.HOST_NAME_Rev_Serv_Var;
let port:number|undefined = Number(process.env.PORT_Rev_Serv_Var);



if(port !== undefined && hostName !== undefined){
    app.listen(port, hostName, () => {
        console.log(`Express Server is running at ${hostName}:${port}`);
    });
}

module.exports = app;