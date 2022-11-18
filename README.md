<div align="center" >
  <img width="150px" src="" alt="uvu" width="400">
  <br>
  <br>
  <h1>NG Cash</h1>
</div>

## 📝 Description


NG.cash is a private web bank API that allows users to make transactions between themselves

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
$ git clone https://github.com/frreiro/ng-cash-backend
# ssh
$ git clone git@github.com:frreiro/ng-cash-backend.git
```

Install the dependencies.

```bash
$ cd ng-cash-backend && npm install
#or
$ cd ng-cash-backend &&  yarn
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
		"id": 0000,
		"balance": 0000,
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
		"username": "yourusername",
		"password": "yourpassword",
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
	
    - headers: 
		```json
		{ "Authorization": "Bearer $token" }
		```
  - body: none
  - response:
	```json
	[{
		"value": 0000,
		"id": 0000,
		"debitedAccount": { 
			"user": {
			"username": "someursername",
			}	
		},
		"creditedAccount": { 
			"user": {
				"username": "someusername",
			}
		}
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


## 💽 Database

This project uses a [PostgreSQL](https://www.postgresql.org/) database.
- **Database name:** `ng-cash-db`
- **`Tables`:**
  - **`users`:** Stores all users
  - **`transactions`:** Stores all transactions made by users
  - **`account`:** Stores all users accounts 


