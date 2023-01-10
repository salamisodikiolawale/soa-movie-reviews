import app from "./app";

let hostName:string|undefined =  process.env.HOST_NAME;
let port:number|undefined = Number(process.env.PORT);



if(port !== undefined && hostName !== undefined){
    app.listen(port, hostName, () => {
        console.log(`Express Server is running at ${hostName}:${port}`);
    });
}

module.exports = app;