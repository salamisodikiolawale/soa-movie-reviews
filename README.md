# MOVIE REVIEW

[![codecov](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews/branch/develop/graph/badge.svg?token=9NXOAG7FZJ)](https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews)


Movie review est un projet qui est conçu en architecture microservice.

Ce projet permet aux utilisateurs de publier des Movies et de commenter ces Movies.

Il est composé d'un front-end développé en REACT et de cinq microservices développés en Nodejs. L'architecture de l'application intègre Docker avec Reverse proxy TRAEFIK. Le projet dispose d'un système d'automatisation d'intégration continue et de déploiement continue.

Les images Docker des microservices sont déployées sur DockerHub après l'intégration continue (Voir fichier le dossier.github) et l'application est déployée dans le Cloud AWS plus précisément EC2 à travers le CD (Voir la partie runner de github CD).

N'hésitez pas à nous contacter pour des questions ou autres préoccupations, nous répondrons à vos requête :).


Au plaisir de travailler avec vous :)

## HOME

![alt text](https://github.com/salamisodikiolawale/soa-movie-reviews/blob/develop/interface.png?raw=true)


## COMPOSANTS APPLICATIFS

![alt text](https://github.com/salamisodikiolawale/soa-movie-reviews/blob/develop/Architecture_composants.png?raw=true)

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

1 - Cloner le projet : 

> git clone git@github.com:salamisodikiolawale/soa-movie-reviews.git

2 - Se deplacer dans le repertoire racine du projet avec :
> cd soa-movie-reviews

3 - Initialiser le projet avec la commande : 
> bash initialisation.sh

4 - Génération des fichiers .env pour chaque microservice (Se fichier est transmit par mail à la demande ou vous pouvez faire un issue pour faire la demande):
> bash envs_var_gen.sh

5 - Démarage de l'application :

Deux options possibles :

Option 1 (recommander): Vous aurez des infos log et la commande qu'il faut, en cas de problème d'occupation de port par exemple.
> bash launch_file_app.sh

Option 2 :
> docker-compose up --build 

> NB : Tout ces commandes se lance depuis le repertoire principal du projet.


## Contributing

Si vous souhaitez contribuer, lisez le fichier [CONTRIBUTING.md](https://github.com/salamisodikiolawale/soa-movie-reviews/blob/develop/CONTRIBUTING.md) pour savoir comment le faire.

## Versions
**Première version stable :** 1.0

## Auteurs
* **Romain** _alias_ [@StardustRL](https://github.com/StardustRL)
* **Margot RASAMY** _alias_ [@MargotRasamy ](https://github.com/MargotRasamy)
* **Sodiki SALAMI** _alias_ [@salamisodikiolawale](https://github.com/salamisodikiolawale)


## License

Ce projet est sous licence ``GNU GPL`` - voir le fichier [LICENSE.md](https://github.com/salamisodikiolawale/soa-movie-reviews/blob/develop/LICENSE.md) pour plus d'informations



# tip of default branch
https://codecov.io/gh/salamisodikiolawale/soa-movie-reviews/branch/develop/graphs/sunburst.svg?token=9NXOAG7FZJ


[nodemon] Internal watch failed: ENOSPC: System limit for number of file watchers reached, watch '/src/app'
solution : sudo sysctl fs.inotify.max_user_watches=582222 && sudo sysctl -p (https://stackoverflow.com/questions/34662574/node-js-getting-error-nodemon-internal-watch-failed-watch-enospc)


