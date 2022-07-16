//Declare Variables
const express = require('express')
const app = express()
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient
require('dotenv').config()

let db,
	dbConnectionString = process.env.DB_STRING,
	dbName = 'sample_mflix',
	collection

//Use .connect to conect database
MongoClient.connect(dbConnectionString).then((client) => {
	console.log('Connected to Database')
	db = client.db(dbName)
	collection = db.collection('movies')
})

//Setting middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//Get request to display different pages
app.get('/', async (request, response) => {
	try {
		response.render('index.ejs')
	} catch (error) {
		response.status(404).send({ message: error.message })
	}
})

//Use .listen to connect server to port
//PORT = 8020
app.listen(process.env.PORT || PORT, () => {
	console.log(`Sever is running on port = ${process.env.PORT}`)
})
