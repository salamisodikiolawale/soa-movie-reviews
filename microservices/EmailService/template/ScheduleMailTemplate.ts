import { EmailMovie } from "../database/models/EmailMovie";

export const everyWeekTemplate = (imgUrl:string) => {

    return `

    <!doctype html>
    <html lang="fr">
        <head>
        <meta charset="utf-8">
        <title>New letter</title>
        <link rel="stylesheet" href="style.css">
        <script src="script.js"></script>
        </head>
    <body>
        <div style="backgroung-color:white">
        <div style="border:1px solid black; padding:5px;">
            <h2 style="display:flex; justify-content:center;">SOA MOVIE APP NEW</h2>
        </div>
        
        <div style="padding:5px;display:flex; flex-direction:column; flex:1; align-items:center;">
            <p>Un nouveau film vient d'être publié <a href="http://127.0.0.1:4000/"/>The WaR 2022<a/></p>
             <div style="border:1px solid black; width:500px;">
                 <img src=\`${imgUrl}\` style="width:100%"/>
             </div>
             
             <div style="border:1px solid black; width:250px; padding:5px;">
                 <a href="#">Voir les TOP 20</a>
             </div>
          </div>
        </div>
    </body>
    </html>
    `
}

export const compmletMessage = (msgEmail:string) => {

    return `
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
            ${msgEmail}
        </h5>
    </body>
    </html>
  `
}


export const everySecondTemplate = (imgUrl:string, movies:EmailMovie[], numberOfMovie:number) => {
    
    let movieHtml:String[] = [];

    movies.forEach( movie => {
        movieHtml.push(`
        <div style="width:300px; height:150px; margin:5px; padding:15px;">
            <p><a href="http://127.0.0.1:4000/"/>\`${movie.title}\` <a/></p>
            <img src=\`${movie.image}\` style="width:100%"/>
        </div>
    `)
    })

    return `
    <!doctype html>
    <html lang="fr">
        <head>
            <meta charset="utf-8">
            <title>New letter</title>
            <link rel="stylesheet" href="style.css">
            <script src="script.js"></script>
        </head>
        <body>

            <div 
                style="
                backgroung-color:white; 
                align-items: center;">

                <h2 
                    style="display:flex; 
                    justify-content:center;">
                    SOA MOVIE APP NEW
                </h2>
                <div style="display: flex; align-items: center; justify-content: center;">
                    <img 
                        style="width: 100%;"
                        src="https://s3.amazonaws.com/static.rogerebert.com/uploads/review/primary_image/reviews/the-son-movie-review-2022/the-son-movie-review-2022.jpeg" 
                        alt="#" />
                </div>
                <h2 style="text-align: center;">Les 5 derniers films publiés</h2> <br/><br/><br/>
                            
                <div style="padding:5px; width:1000px; display: flex;">
                    ${movieHtml} 
                </div>
            </div>
        </body>
    </html>`
}