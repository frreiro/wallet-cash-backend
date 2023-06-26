FROM node

WORKDIR /usr/src/wallet-cash
COPY . . 
RUN npm i
RUN npm run build

CMD ["npm","run", "docker:init"]