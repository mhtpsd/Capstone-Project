echo "------------------------------------------"
echo "----------- Setting up backend -----------"
echo "------------------------------------------"
sudo apt update


# Install java 11
sudo apt install openjdk-11-jdk -y

# Install maven
sudo apt update

sudo apt install maven -y

# Install project dependencies
chmod +x ./mvnw
./mvnw clean install -DskipTests

# Install node and setup an npm project (needed to merge multiple xml files into 1)
curl -fsSL https://deb.nodesource.com/setup_current.x | sudo -E bash -
sudo apt-get install -y nodejs
sudo apt-get install npm
# Using 'n' package manager to install node 16 version (as node 10 is already installed and needs to be upraded)
sudo npm install -g n
sudo n 16
npm install

# Install extensions
code-server --install-extension redhat.java
code-server --install-extension pivotal.vscode-spring-boot
code-server --install-extension rangav.vscode-thunder-client