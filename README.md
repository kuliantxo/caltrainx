# CalTrainX
Caltrain Schedule

Based on http://jmfurlott.com/tutorial-setting-up-a-single-page-react-web-app-with-react-router-and-webpack/

git clone https://github.com/kuliantxo/caltrainx.git
cd caltrains/
npm install
npm start
npm run build

([0-9]*),([0-9]*),([0-9a-zA-Z .]*),([0-9.]*),([0-9.-]*),(.),.*
\t'$3':[$1,$2,$4,$5,$6]
