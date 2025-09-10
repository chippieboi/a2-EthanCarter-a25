const { json } = require("stream/consumers")

const http = require( "http" ),
      fs   = require( "fs" ),
      // IMPORTANT: you must run `npm install` in the directory for this assignment
      // to install the mime library if you"re testing this on your local machine.
      // However, Glitch will install it automatically by looking in your package.json
      // file.
      mime = require( "mime" ),
      dir  = "public/",
      port = 3000

const appdata = [
  { "model": "toyota", "year": 1999, "mpg": 23 , "derivedPrice": 23023},
  { "model": "honda", "year": 2004, "mpg": 30, "derivedPrice": 29880},
  { "model": "ford", "year": 1987, "mpg": 14, "derivedPrice": 14182} 
]

const server = http.createServer( function( request,response ) {
  if( request.method === "GET" ) {
    handleGet( request, response )    
  }else if( request.method === "POST" ){
    handlePost( request, response ) 
  }
})

const handleGet = function( request, response ) {
  const filename = dir + request.url.slice( 1 ) 

  if( request.url === "/" ) {
    sendFile( response, "public/index.html" )
  }
  else if(request.url === "/data"){
    response.writeHead(200, "OK", {"Content-Type": "application/json"})
    response.end(JSON.stringify(appdata))
  }
  
  else{
    sendFile( response, filename )
  }
}

const handlePost = function( request, response ) {
  if(request.url === "/submit") {
    submit(request, response);
  }
  else if(request.url === "/modify"){
    modify(request, response);
  }
  else if(request.url == "/delete"){
    deleteEntry(request, response);
  }
  else{
    response.writeHead(404, {"Content-Type":"text/plain"})
    response.end("404 not found (post)" + request.url)
  }
}

const deleteEntry = function(request, response) {
  let dataString = ""

  request.on("data", function(data) {
    dataString += data
  })

  request.on("end", function() {
    const {index} = JSON.parse(dataString)

    if(index >= 0 && index < appdata.length){
      appdata.splice(index, 1)

      response.writeHead(200, "OK", {"Content-Type":"application/json"})
      response.end(JSON.stringify(appdata))
    }
    else{
      response.writeHead(400, {"Content-Type":"text/plain"})
      response.end("Not good index" + index)
    }
  })
}

const modify = function(request, response) {
  let dataString = ""

  request.on("data", function(data) {
    dataString += data
  })

  request.on("end", function() {
    const body = JSON.parse(dataString)

    const {index, updatedEntry} = body

    if (index >= 0 && index < appdata.length){
      updatedEntry.derivedPrice = calculateDerivedPrice(updatedEntry.year, updatedEntry.mpg)
      appdata[index] = updatedEntry

      console.log("response udpated", appdata[index])

      response.writeHead(200, "OK", {"Content-Type": "application/json"})
      response.end(JSON.stringify(appdata))
    }
    else{
      response.writeHead(400, {"Content-Type":"text/plain"})
      response.end("Not good index")
    }
  })
}

const submit = function(request, response) {
  let dataString = ""

  request.on( "data", function( data ) {
      dataString += data 
  })

  request.on( "end", function() {
    const newData = JSON.parse(dataString)
    console.log( JSON.parse( dataString ) )

    // ... do something with the data here!!!
    newData.derivedPrice = calculateDerivedPrice(newData.year, newData.mpg)
    appdata.push(newData)

    response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
    response.end(JSON.stringify(appdata))
  })
}

const calculateDerivedPrice = function(year, mpg) {
  return (3000 - year) * mpg;
}

const sendFile = function( response, filename ) {
   const type = mime.getType( filename ) 

   fs.readFile( filename, function( err, content ) {

     // if the error = null, then we"ve loaded the file successfully
     if( err === null ) {

       // status code: https://httpstatuses.com
       response.writeHeader( 200, { "Content-Type": type })
       response.end( content )

     }else{

       // file not found, error code 404
       response.writeHeader( 404 )
       response.end( "404 Error: File Not Found" )

     }
   })
}

server.listen( process.env.PORT || port )
