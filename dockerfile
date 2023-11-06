from node:20
WORKDIR /lib


copy package*.json ./

run apt-get update && apt-get -y install cmake protobuf-compiler && yarn

copy . .

expose 3001

cmd ["node", "lib/index.js"]