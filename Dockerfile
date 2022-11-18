FROM node

WORKDIR /usr/src/ng-cash
COPY . . 
RUN npm i
RUN npm run build

CMD ["npm","run", "docker:start"]