const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json());

const issues = [
	{
		"id":1,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-19"),
		"effort":5,
		"completionDate":undefined,
		"title":"this is the title of issue 1"
	},
	{
		"id":2,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-18"),
		"effort":5,
		"completionDate":"2018-12-18",
		"title":"this is the title of issue 2"
	},
	{
		"id":3,
		"status":"open",
		"owner":"woogle",
		"created":new Date("2018-12-17"),
		"effort":5,
		"title":"this is the title of issue 3"
	}
];

app.get('/api/issues', (req,res) => {
	const metadata = {"total":issues.length};
	res.json({"_metadate":metadata,"records":issues});
});

app.post("/api/issues", (req, res) => {
	const newIssue = req.body;
	newIssue.id = issues.length + 1;
	newIssue.created = new Date();

	if (!newIssue.status) {
		newIssue.status = "New";
	}

	issues.push(newIssue);

	res.json(newIssue);
});


app.listen(3000,function(){
	console.log("Issue tracker run on 3000");
});
