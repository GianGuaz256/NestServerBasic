<h1 align="center">
	Nest.js server w/ Authentication
</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center" style="margin: 10px">A template to quickly develop servers with user management in an easy and effective way. The template manages the creation of users with connection to <a href="https://www.mongodb.com">MongoDB</a>, the management of refresh and access token for authentication and is easily customizable. Don't waste time developing authentication from scratch, use this template and start developing your server logic now.</p>

<h2>
	Installation
</h2>

```bash
$ git clone https://github.com/GianGuaz256/NestServerBasic.git
$ cd ./NestServerBasic
$ npm install
```

<h2>
	Create .env file
</h2>

Create an **_.env_** file and add the following parameter in order to setup the script:

`SERVER_PORT=8000`

`DB=<Your connection string to mongoDB>`

`JWT_SECRET=<Your random JWT Secret>`

`NODE_ENV=development`

<h2>
	Create a MongoDB Cluster
</h2>

Go to <a href="https://www.mongodb.com">MongoDB</a> and create a free cluster. The cluster will give you the ability to create collections of records. Once connected follow these steps to connect your cluster to the application. The string to insert in the **_.env_** file is formed in this way: 

`mongodb+srv://dbAdmin:<password>@cluster0.b1k5c.mongodb.net`

Once inserted in the file the link with the database is done.

<h2>
	Endpoint
</h2>

This is a list of available endpoints:


| Type      | Endpoint | Description     |
| :---        |    :---   |          :--- |
| @Get      | /api/users      | Get list of all users   |
| @Get      | /api/users/:id      | Get Specific User   |
| @Post      | /api/auth/register      | Create new user   |
| @Post      | /api/auth/login      | Login user   |
| @Post      | /api/auth/refresh      | Refresh token   |
| @Get      | /api/auth/me      | Get me   |

<h2>
	Run application
</h2>

Developer mode (like nodemon):
```bash
$ npm run dev
```

<h2>
	Stay in touch
</h2>

Author: Guazzo Gianmarco
- <a href="https://www.linkedin.com/in/gianmarco-guazzo/">LinkedIn</a>
- <a href="https://www.blockacademy.it/">Website</a>
- <a href="https://guazzogianmarco.medium.com/">Medium</a>

---