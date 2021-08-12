const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');

const register =require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profileid');
const image = require('./controllers/image');

const db = knex({
	client: 'pg',
	connection: {
		connectionString : process.env.DATABASE_URL,
		ssl: true,
		
	}
});

db.select('*').from('users');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
	users: [
		{
			id: '123',
			name: 'john',
			email: 'john@gmail.com',
			password: 'cookies',
			entries: 0,
			joined: new Date()
		},
		{
			id: '124',
			name: 'sally',
			email: 'sally@gmail.com',
			password: 'bananas',
			entries: 0,
			joined: new Date()
		}
	]
}

app.get('/', (req, res)=> {
	res.send('It is working!');
})

app.post('/signin',(req, res) => { signin.handleSignin(req, res, db, bcrypt)})

app.post('/register', (req,res) => { register.handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})

app.put('/image', (req, res) => { image.handleImage(req, res, db)})

app.post('/imageurl', (req, res) => { image.handleApiCall(req, res,)})

app.listen(process.env.PORT || 3001, ()=> {
	console.log(`app is running ${process.env.PORT}`);
})