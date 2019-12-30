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
				console.log("Received \'" + resp + "\'");
				document.getElementById("output").innerHTML = resp;
				if(resp == "") {
					document.getElementById("output").style.display = "none";
					document.getElementById("output").style.margin = "0px 0px 0px 0px";
				} else {
					document.getElementById("output").style.display = "inline";
					document.getElementById("output").style.margin = "0px 8px 0px 0px";
					if(resp == "wellness") {
						var audio = new Audio('wellnessWalk.mp3');
						audio.play();
					}
				}
			} else {
				
			}
		}
	};
	let toSend = document.getElementById("word").value;
	if(toSend == "") toSend = "word";
	request.send(JSON.stringify({"in": toSend}));
}

function nltkCitation() {
	alert(`Bird, Steven, Edward Loper and Ewan Klein (2009).\nNatural Language Processing with Python.  O'Reilly Media Inc.`);
}

function wordnetCitation() {
	alert(`Princeton University "About WordNet." Wordnet. Princeton University. 2010.`);
}

document.getElementById("nltkCite").addEventListener("click", nltkCitation);

document.getElementById("wordnetCite").addEventListener("click", wordnetCitation);

generate();

console.log(`%c Welcome to the console! `, `background-color: #cdf1ff; color: #246d5f; font-size: 2em;`);
console.log(`%c Commands:\n    generate();\n`, `background-color: #cdf1ff; color: #246d5f; font-size: 1.2em;`);