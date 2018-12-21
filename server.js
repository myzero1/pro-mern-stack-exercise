const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

app.get('/api/issues', (req,res) => {
	db.collection('issues')
	.find()
	.toArray()
	.then(issues => {
		const metadata = {"total":issues.length};
		res.json({"_metadate":metadata,"records":issues});
	})
	.catch(error => {
		console.log(error);
		res.status(500).json({
			message:`Internal Server Error: ${error}`
		});
	});
});

app.post("/api/issues", (req, res) => {
	const newIssue = req.body;
	newIssue.created = new Date();

	if (!newIssue.status) {
		newIssue.status = "New";
	}


	db
	.collection('issues')
	.insertOne(newIssue)
	.then(result => {
		return db
		.collection('issues')
		.find({_id: result.insertedId})
		.limit(1)
		.next();
	})
	.then(
		newIssue => {
			res.json(newIssue);
		}
	).catch(
		error => {
			console.log(error);
			res
			.status(500)
			.json({message:`Internal Server Error: ${error}`});
		}
	)


});


app.post('/api/issues-new', (req, res) => {
  const newIssue = req.body;
  newIssue.created = new Date();
  if (!newIssue.status)
    newIssue.status = 'New';

  db.collection('issues').insertOne(newIssue).then(result =>
    db.collection('issues').find({ _id: result.insertedId }).limit(1).next()
  ).then(newIssue => {
    res.json(newIssue);
  }).catch(error => {
    console.log(error);
    res.status(500).json({ message: `Internal Server Error: ${error}` });
  });
});

const MongoClient = require('mongodb').MongoClient;

let db;
MongoClient.connect('mongodb://127.0.0.1/issuetracker', { useNewUrlParser: true }).then(
	connection => {
		// db = connection.db('issuetracker'); // MongoClient 3.0
		db = connection; // MongoClient 2.X

		app.listen(3000,function(){
			console.log("Issue tracker run on 3000");
		});
	}
).catch(error => {
	console.log('Mongodb error', error);
});


