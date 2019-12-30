document.getElementById("genBtn").addEventListener("click", function() {
	generate();
});

function generate() {
	let request = new XMLHttpRequest();
	request.open('POST', '/getAdj', true);
	request.setRequestHeader('Content-Type', 'application/json');
	
	request.onreadystatechange = function() {
		if (this.readyState === 4) {
			if (this.status >= 200 && this.status < 400) {
				let resp = JSON.parse(this.responseText).out;
				console.log("Recived \'" + resp + "\'");
				document.getElementById("output").innerHTML = resp;
				if(resp == "") {
					document.getElementById("output").style.display = "none";
					document.getElementById("output").style.margin = "0px 0px 0px 0px";
				} else {
					document.getElementById("output").style.display = "inline";
					document.getElementById("output").style.margin = "0px 8px 0px 0px";
				}
			} else {
				
			}
		}
	};
	let toSend = document.getElementById("word").value;
	if(toSend == "") toSend = "word";
	request.send(JSON.stringify({"in": toSend}));
}

document.getElementById("wordnetCite").addEventListener("click", function() {
	wordnetCitation();
});

function wordnetCitation() {
	alert(`Princeton University "About WordNet." Wordnet. Princeton University. 2010.`);
}

generate();