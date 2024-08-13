# Basic setup
echo "------------------------------"
echo "-------- Global setup --------"
echo "------------------------------"
sudo apt-get update -y
sudo apt-get install -y libgconf-2-4 libatk1.0-0 libatk-bridge2.0-0 libgdk-pixbuf2.0-0 libgtk-3-0 libgbm-dev libnss3-dev libxss-dev libxshmfence1
sudo apt-get install ca-certificates fonts-liberation gconf-service libappindicator1 libasound2 libatk-bridge2.0-0 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgbm1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libnss3 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 lsb-release wget xdg-utils
code-server --install-extension mgmcdermott.vscode-language-babel

########## Install angular related extensions ##############
code-server --install-extension johnpapa.angular2


# Setup frontend angular server
echo "---------- Setup frontend angular server ------------"
# Install node and npm
sudo apt-get install -y npm
sudo npm install -g n
sudo n 19
npm install --force
#cd ../