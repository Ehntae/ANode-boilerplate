import * as express     from "express";
import * as http        from "http";
import * as fileSystem  from "fs";
import * as SocketIO    from "socket.io";


/* -----------------------------------------
|	Express server configuration and setup
| ----------------------------------------- */

const PORT_NUMBER:number 		= 8080;
const DEBUG_ENABLED:boolean 	= true;

const PACKAGE_JSON:any 	 		= JSON.parse(fileSystem.readFileSync("package.json", 'utf8'));
const APP_VERSION:string 		= PACKAGE_JSON.version;
const APP_BUILD:string	 		= PACKAGE_JSON.build;

const app:express.Application 	= express();
const server:http.Server 	  	= http.createServer(<any>app);


/* ---------------------
|	Set up middleware
| --------------------- */

app.use(express.static(__dirname + "/../public"));


/* -----------------------
|	Bind server to port
| ----------------------- */

const IO = SocketIO.listen(server);

IO.on("connection", function(socket:SocketIO.Socket) {
    console.log("Client has connected");
});
    
server.listen(PORT_NUMBER, function() {
    console.log(`Server bound to port: ${PORT_NUMBER}`);
});


/* -----------------------
|	Define entry point
| ----------------------- */

function main():void {
    
    console.log(`Initialising server: v${APP_VERSION}-${APP_BUILD}`);
    
    // Start engine... 

}

main();