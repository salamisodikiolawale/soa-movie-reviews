# soa-movie-reviews
[![codecov](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews/branch/develop/graph/badge.svg?token=9NXOAG7FZJ)](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews)


# tip of default branch
GET /gh/:owner/:repo/graphs/sunburst.svg?token=:9NXOAG7FZJ

# tip of branch
GET /gh/:owner/:repo/branch/:branch/graphs/sunburst.svg?token=:9NXOAG7FZJ

# tip of pull
GET /gh/:owner/:repo/pull/:id/graphs/sunburst.svg?token=:9NXOAG7FZJ

# specific commit
GET /gh/:owner/:repo/commit/:sha/graphs/sunburst.svg?token=:9NXOAG7FZJ

## Initialisation du projet

### Mise en place des microservices du projet

 * EmailService : Pour l'instant envoi des mails à salamisodikiolawale@gmail(pour le test) chaque minute avec cron job
 * ReviewService
 * CrudMovieService
 * SearchService
 * AuthService
 * reverseProxyService

###

## Lancement 

Se positionner dans le dossier principal du projet et lancer la commande : docker-compose up --build

## Quelques Opérations


### Crud Service
http://crud_service.localhost/
http://crud_service.localhost/api/v1/movies/movie/63349c831bbab58f0e243218
http://crud_service.localhost/api/v1/movies/2

POST : http://127.0.0.1:3000/api/v1/movies
body  = {
	 "title" : "ROMAIN HISTORY",
   "date" : "2022-10-10",
   "ranting": 2,
   "description": "Romain is like to eat too more",
   "image" : "http://google/movies/1",
	 "types" : ["SF","THRILLER"]
}


### Email Service

1) 

POST http://127.0.0.1:3004/api/v1/emails
Body = {
	"targetEmail":"salamisodikiolawale@gmail.com",
	"subjectEmail":"AHAHA",
	"msgEmail":"Test Salami"
}

2) La deuxieme fonctionnalité est exécutée automatiquement avec Cron job(chaque minute)