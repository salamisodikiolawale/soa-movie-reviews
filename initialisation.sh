echo "[ LANCEMENT DE NPM INSTALL DANS CHAQUE SERVICE ]"
echo " "
echo " "
echo " "
echo "[# FRONTEND ... #]"
cd ./frontend
npm install
cd ../
echo " "
echo "[# CRUD MOVIE SERCICE ... #]"
cd ./microservices/CrudMovieService
npm install
cd ../..
echo " "
echo "[# AUTH SERVICE ... #]"
cd ./microservices/AuthService
npm install
cd ../..
echo " "
echo "[# EMAIL SERVICE ... #]"
cd ./microservices/EmailService
npm install
cd ../..
echo " "
echo "[# REVIEW SERVICE ... #]"
cd ./microservices/ReviewService
npm install
cd ../..
echo " "
echo "[# SEARCH SERVICE ... #]"
cd ./microservices/SearchService
npm install
cd ../..
echo " "
echo " TERMINER !"