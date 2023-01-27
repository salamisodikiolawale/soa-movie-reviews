if sudo lsof -Pi :80 -sTCP:LISTEN -t >/dev/null ; then
    echo "Le PORT:80 est occupé => veillez libérer le port 80 avec [sudo netstat -anp | grep 80] et relancer l'a commande [bash launch_file_app.sh] x)"
    
else
    echo""
    echo""
    echo""
    echo""
    echo""
    echo""
    echo "##########################################################################" 
    echo "#### Le port: 80 est libre :)                                         ####"
    echo "#### PRESENTATION : MOVIE-REVIEW                                      ####"
    echo "#### BIENVENUE : Je suis composé d' frontend et de 5 microservices    ####"
    echo "##########################################################################" 
    echo""
    echo""
    echo""
    echo""

    echo "################### LES AUTEURS DU PROJET ################################"
    echo "####-------------------------ROMAIN---------------------------------- ####"
    echo "####-------------------------MARGOT---------------------------------- ####"
    echo "####-------------------------SODIKI---------------------------------- ####"
    echo "##########################################################################" 
    echo""
    echo""
    echo""

    echo "DEMARRAGE DU FRONT ET DES MICROSERVICES..."
    docker-compose up --build
fi
