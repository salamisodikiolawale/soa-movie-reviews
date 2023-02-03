# Contribution au projet


* [Codes de conduites](#Codes-de-conduites)
* [Issues](#issues)
* [Pull Requests](#pull-requests)

## [Codes de conduites]
***Soyez prévenant*** :

Votre travail sera employé par d'autres et vous, à votre tour, dépendrez du travail des autres. Toute décision que vous prendrez affectera des utilisateurs et des collègues et nous attendons de vous que vous teniez compte de ces conséquences lorsque vous prenez une décision. Des millions de gens utilisent Movie review et des milliers y contribuent. En particulier, si cela ne semble pas évident à l'instant, vos contributions affecterons le travail des autres. Par exemple, les changements dans le code, l'infrastructure, les politiques, la documentation ou la traduction pendant le processus de sortie peuvent endommager le travail d'autrui.

***Soyez respectueux*** :

La communauté d'Movie review et ses membres considèrent les autres avec respect. Chacun peut apporter une contribution valable à Movie review. Nous pouvons ne pas être toujours en accord, mais le désaccord ne peut être une excuse pour un comportement désagréable et impoli. Nous pouvons être anéantis par des frustrations aujourd'hui ou demain, mais nous ne pouvons pas permettre à cet anéantissement de se transformer en attaque personnelle. Il est important de se rappeler qu'une communauté où les gens se sentent mal ou menacés n'est pas productive. Nous attendons des membres de la communauté d'Movie review qu'ils soient respectueux en travaillant aussi bien avec les autres contributeurs qu'avec les personnes en dehors du projet Movie review ou avec les utilisateurs d'Movie review.

***Soyez collaboratif*** :

Movie review et le Logiciel Libre sont l'exemple même de la collaboration et du travail collectif. Nous encourageons les individus et les équipes à collaborer, à la fois pour Movie review et en dehors. La collaboration réduit la redondance du travail fait dans le monde du Logiciel Libre et améliore la qualité des logiciels produits. Vous désirez collaborer avec d'autres défenseurs d'Movie review, c'est bien, la communauté sera intéressée par votre travail. Cette collaboration devra être effectuée d'une manière transparente et vos travaux pour Movie review devront être donnés à la communauté avant la sortie de la nouvelle version de la distribution. Si vous souhaitez travailler sur le code pour des projets existants, tenez au courant les développeurs de ces projets de vos idées et progrès. Il est possible de ne pas obtenir de consensus avec vos collègues au sujet de l'exécution correcte d'une idée, aussi ne vous sentez pas obligé d'avoir l'accord avant de commencer, mais au moins tenez le monde extérieur au courant de votre travail, et éditez votre travail d'une manière qui permette à d'autres d'examiner, discuter et contribuer à vos efforts.

***Désaccord*** :

Quand vous êtes en désaccord, consultez les autres. Les désaccords, politiques et techniques, se produisent tout le temps et la communauté d'Movie review n'y fait aucune exception. Le but principal n'est pas d'éviter les désaccords ou les divergences d'opinions mais de les résoudre de manière constructive. Nous avons le Conseil Technique et le Conseil de la Communauté, qui tous les deux aideront à prendre les bonnes décisions pour Movie review. Il y a également plusieurs équipes de projet et chefs d'équipe qui peuvent vous aider à découvrir quelle direction sera la plus acceptable. Si vous voulez vraiment prendre une route différente, alors nous vous encourageons à faire une distribution dérivée ou alternative avec des paquets disponibles en utilisant le cadre de gestion des paquets d'Movie review, de sorte que la communauté puisse essayer vos changements et idées, et contribuer à la discussion.

***Entraide*** :

Quand vous êtes incertain, demandez de l'aide. Personne ne peut tout savoir, et dans la communauté d'Movie review, personne n'est parfait. Poser des questions évite beaucoup de problèmes en chemin ; elles sont donc encouragées. Ceux à qui elles seront posées devront répondre et aider. Cependant, avant de poser une question, prenez soin de le faire sur le forum approprié.

***Considération pour le projet*** :

Les développeurs de chaque projet vont et viennent, et Movie review reste. Si vous vous désengagez partiellement ou totalement d'un projet, nous vous demandons de nous le dire pour éviter les ruptures dans le développement de ce projet. Cela signifie que vous devrez prendre les mesures pour que d'autres puissent reprendre le développement derrière vous et permettre la continuité d'movie.

Le code de conduite de Movie review est sous licence Creative Commons Attribution-Share Alike 3.0. Vous pouvez l'utiliser pour vos projets et le modifier si vous le souhaitez, mais s'il vous plaît autorisez les autres à utiliser votre création et indiquez dans les auteurs successifs le projet Movie review.


## [Pull Requests]
Aidez-nous à examiner vos RP plus rapidement en suivant ces directives.

Essayez, si possible, de ne pas toucher à un grand nombre de fichiers dans un seul RP.
Ne modifiez pas l'espace blanc ou le retour à la ligne dans les parties d'un fichier que vous ne modifiez pas pour d'autres raisons. Assurez-vous que votre éditeur de texte n'est pas configuré pour reformater automatiquement l'ensemble du fichier lors de l'enregistrement.
Nous vous recommandons vivement de construire et de tester les documents localement avant de soumettre un PR.
Un test est exécuté pour chaque PR contre la branche principale, et déploie le résultat de votre PR sur la branche develop.

## [Utilisation du projet]

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
<pre>
En apportant une contribution à ce projet, je certifie que :

 (a) La contribution a été créée en tout ou en partie par moi-même et je
     ai le droit de la soumettre sous la licence open source
     indiquée dans le fichier ; ou

 (b) La contribution est basée sur des travaux antérieurs qui, à ma connaissance, sont couverts par un code source ouvert approprié.
     de ma connaissance, est couverte par une licence de source ouverte appropriée
     appropriée et j'ai le droit, en vertu de cette licence, de soumettre cette
     travail avec des modifications, qu'il soit créé en totalité ou en partie
     par moi, sous la même licence open source (à moins que je ne sois
     autorisé à soumettre sous une licence différente), comme indiqué
     dans le fichier ; ou

 (c) La contribution m'a été fournie directement par une autre
     personne qui a certifié (a), (b) ou (c) et que je n'ai pas modifié
     et je ne l'ai pas modifiée.

 (d) Je comprends et j'accepte que ce projet et la contribution
     sont publics et qu'un enregistrement de la contribution (y compris toutes les
     informations personnelles que je soumets avec elle, y compris ma signature) est
     indéfiniment et peut être redistribué conformément à ce projet ou aux
     ce projet ou la (les) licence(s) open source concernée(s).
</pre>
