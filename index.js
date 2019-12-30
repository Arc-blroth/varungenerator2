let wellnessWalksServed = 0;
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const spawn = require("child_process").spawn;
const pythonProcess = spawn('python', ["python/varun2.py"]);

let adjectives = {};

pythonProcess.stdout.on('data', (data) => {
    console.log("[varun2.py] " + data);
});

pythonProcess.on('exit', () => {
	adjectives = JSON.parse(fs.readFileSync('python/adjectives.json'));
	startServer();
});

function getAdj(word) {
	word = word.trim();
	if(word.length == 0) {return "";}
	let forLetter = adjectives[word.charAt(0)];
	if(forLetter == undefined || forLetter == null) {
		return "";
	} else {
		return forLetter[Math.floor(Math.random() * forLetter.length)];
	}
}

function startServer() {
	app.use(bodyParser.json())
	app.use(express.static('web'));

	app.post('/getAdj', function(request, response) {
	  wellnessWalksServed++;
	  let output = getAdj(request.body.in);
	  console.log("Served a " + output + " " + request.body.in);
	  response.send(JSON.stringify({"out": output}));
	});

	app.get('/', function(request, response) {
	  response.sendFile(__dirname + '/web/impressionistic_index.html');
	});

	const listener = app.listen(process.env.PORT || 8080, function() {
	  console.log('[express] Serving wellness walks on port ' + listener.address().port);
	});
}