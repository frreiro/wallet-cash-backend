<div align="center" >
  <img width="150px" src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4b0.svg" alt="wallet-logo" width="400">
  <br>
  <br>
  <h1>Wallet Cash</h1>
</div>

## 📝 Description


wallet.cash is a private web wallet API that allows users to make transactions between themselves

## 🚀 Technologies

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Express](https://expressjs.com/)
- [eslint](https://eslint.org/)
- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Prisma ORM](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)

## 📦 Installation

Clone the repository.

```bash
# https
$ git clone https://github.com/frreiro/wallet-cash-backend
# ssh
$ git clone git@github.com:frreiro/wallet-cash-backend.git
```

Install the dependencies.

```bash
$ cd wallet-cash-backend && npm install
#or
$ cd wallet-cash-backend &&  yarn
```

## 🚀 Usage

This porject required two enviroments files
 - .env
 - .env.docker

To create those enviroments, just follow the instructions in the following files:

- .env.docker.example
- .env.example


### Development mode

To run the project in development mode, create a `.env` file based on the `.env.example` file and run the following command:

```bash
$ npm run dev:start
#or
$ yarn run dev:start
```

### Docker mode

To run the project in docker mode, create a `.env.docker` file based on the `.env.docker.example` file and run the following command:

```bash
$ npm run docker:start
#or
$ yarn run docker:start
```


## 📌 Features

- [x] User signup
- [x] User login
- [x] Create a user transaction
- [x] Read the user transactions
- [x] Read the user account information

## 🔀 Routes

- **POST** `/signup` - Create a new User
  - headers: none
  - body:
	```json
	{
		"username": "yourusername",
		"password": "yourpassword",
	}
	```
- **POST** `/signin` - Login the user
  - headers: none
  - body:
	```json
	{
		"username": "yourusername",
		"password": "yourpassword",
	}
	```
- **GET** `/account` - Get informations about user account 
  - headers: 
	```json
	{ "Authorization": "Bearer $token" }
	```
  - body: none
  - response: 
	```json
	{
		"userId": 0000,
		"username": "yourusername",
		"accountId": 0000,
		"balance": 0000,
	}
	```
- **POST** `/transactons` - Create a transaction 
    - headers: 
		```json
		{ "Authorization": "Bearer $token" }
		```
  - body:
	```json
	{
		"username": "creditedusername",
		"value": 0000,
	}
	```
- **GET** `/transactions` - Get user transactions
  
    | Query Params | Value | type | Description | 
  	| :---: | :---: | :---: | :---: |
	| none | none | none | all transactions | 
 	| `method` | `cashin` | `string` | cash-in transactions | 
 	| `method` | `cashout` | `string` | cash-out transactions | 
	| `date` | `YYYY-MM-dd` | `Date` | transactions in the day | 
	
    - headers: 
		```json
		{ "Authorization": "Bearer $token" }
		```
  - body: none
  - response:
	```json
	[{
		"id": 00,
		"from": {
			"id": 00,
			"username": "someusername",
			"accountId": 00
		},
		"to": {
			"id": 00,
			"username": "someusername",
			"accountId": 00
		},
		"value": 0000
	}]	
	```
- **GET** `/health` - Get API health
    - headers: 
    - body: none
    - response: `OK`


### Body details
  - `username` : 
    - Unique
    - At least 3 characters
  - `password`: 
    - At least 8 characters
    - Must contain a number
    - Must contain an uppercase letter
  - `value`: 
    - Must be over than user balance
    - The last two digits represent the cents
  
### Response details
  - `balance`: 
    - Represent the user account balance
    - The last two digits represent the cents
  
### Query details
  - `method` and `date` can be combined: 
  - `date` must be passed in Brazil Timezone and will return in Brazil timezone


## 💽 Database

This project uses a [PostgreSQL](https://www.postgresql.org/) database.
- **Database name:** `wallet-cash-db`
- **`Tables`:**
  - **`users`:** Stores all users
  - **`transactions`:** Stores all transactions made by users
  - **`account`:** Stores all users accounts 


