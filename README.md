# MOVIE REVIEW

[![codecov](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews/branch/develop/graph/badge.svg?token=9NXOAG7FZJ)](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews)


Movie review est un projet qui est concu en architecture microservice.
Il est composéde d'un frontend développé en REACT et de 5 microservices développés en Nodejs. L'architecture de l'application intègre Docker avec Reverse proxy TRAEFIK. Le projet dispose d'un systeème d'automatisation d'intégration continue et de déploiement continue.
Les images Docker des microservices sont déployées sur DockerHub après l'intégration continue et l'application est déployée dans le cloud AWS plus précisement EC2 à travers le CD.

## Pour commencer




### Pré-requis
Pour travailler correctement vous devez disposez des ces outils ci-dessous :

- Docker
- Git
- Nodejs


### Installation

Docker : 
> https://docs.docker.com/get-docker/

Git :
> https://git-scm.com/doc

Nodejs :

> https://nodejs.org/en/download/


## Démarrage

Cloner le projet : 

> git clone git@github.com:salamisodikiolawale/
soa-movie-reviews.git

Se deplacer dans le repertoire racine du projet avec :
> cd soa-movie-reviews

Démarage de l'application :

Option 1 : 
> bash launch_file_app.sh

Option 2 :
> docker-compose up --build 

##Interface
![alt text](https://github.com/salamisodikiolawale/soa-movie-reviews/blob/develop/interface.png?raw=true)
## Contributing

Si vous souhaitez contribuer, lisez le fichier [CONTRIBUTING.md](https://github.com/salamisodikiolawale/soa-movie-reviews#contributing.md) pour savoir comment le faire.

## Versions
**Première version stable :** 1.0

## Auteurs
* **Romain** _alias_ [@outout14](https://github.com/outout14)
* **Sodiki SALAMI** _alias_ [@outout14](https://github.com/salamisodikiolawale)
* **Margot RASAMY** _alias_ [@outout14](https://github.com/outout14)


## License

Ce projet est sous licence ``exemple: WTFTPL`` - voir le fichier [LICENSE.md](LICENSE.md) pour plus d'informations



# tip of default branch
https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews/branch/develop/graphs/sunburst.svg?token=9NXOAG7FZJ


[nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers reached, watch '/src/app'
solution : sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p (https://stackoverflow.com/questions/34662574/node-js-getting-error-nodemon-internal-watch-failed-watch-enospc)


