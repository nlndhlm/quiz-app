//nlndhlm 2016

//Bruk:
//['Spørsmål', 'alt A', 'alt B', 'alt C', 'alt D', indeks rett svar]

//Eksempel:
//var spm1 = ["5 + 5 =", "1", "2", "10", "4", 3];

//1 til 10 uten tierovergang
var addisjon1 = [
	["2 + 2", "1", "2", "3", "4", 4],
	["2 + 3", "1", "5", "6", "8", 2],
	["4 + 2", "6", "2", "3", "5", 1],
	["5 + 5", "1", "2", "10", "4", 3],
	["3 + 4", "1", "4", "3", "7", 4],
	["4 + 5", "9", "1", "8", "6", 1],
	["5 + 5", "8", "9", "10", "7", 3],
	["3 + 6", "6", "8", "7", "9", 4],
	["4 + 0", "4", "2", "3", "5", 1],
	["4 + 6", "9", "10", "8", "5", 2]
];

//1 til 10 med tierovergang
var addisjon2 = [
	["5 + 6", "11", "12", "13", "14", 1],
	["5 + 9", "11", "13", "14", "16", 3],
	["4 + 8", "10", "16", "12", "14", 3],
	["6 + 6", "12", "13", "14", "16", 1],
	["7 + 6", "11", "12", "13", "15", 3],
	["7 + 6", "11", "13", "15", "17", 2],
	["8 + 8", "18", "14", "16", "12", 3],
	["9 + 8", "17", "15", "14", "16", 1],
	["3 + 9", "11", "12", "16", "13", 2],
	["7 + 9", "15", "16", "19", "18", 2]
];

//tosifret uten tierovergang
var addisjon3 = [
	["10 + 11", "20", "21", "22", "23", 2],
	["25 + 12", "37", "35", "27", "30", 1],
	["18 + 11", "26", "29", "27", "28", 2],
	["34 + 15", "39", "43", "46", "49", 4],
	["44 + 54", "88", "98", "108", "118", 2],
	["70 + 25", "75", "90", "95", "85", 3],
	["24 + 63", "41", "67", "87", "76", 3],
	["10 + 86", "87", "96", "97", "107", 2],
	["81 + 8", "87", "89", "74", "91", 2],
	["58 + 41", "99", "98", "84", "89", 1]
];

//tosifret med tierovergang
var addisjon4 = [
	["17 + 15", "32", "22", "24", "36", 1],
	["28 + 12", "36", "38", "42", "40", 4],
	["19 + 16", "29", "35", "37", "38", 2],
	["36 + 27", "53", "54", "63", "64", 3],
	["12 + 29", "30", "41", "43", "36", 2],
	["55 + 35", "70", "75", "90", "80", 3],
	["46 + 25", "65", "69", "70", "71", 4],
	["38 + 38", "76", "74", "70", "72", 1],
	["17 + 68", "75", "85", "90", "95", 2],
	["49 + 29", "64", "68", "78", "84", 3]
];

var spm = addisjon1;

function velgQuiz(quizNavn) {
	shuffle(quizNavn);
	spm = quizNavn;
	
	restartQuiz();
}

//shufflefunksjon hentet fra stackoverflow
function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

var counter = 0;
var forsinkelse;
var score = 0;

document.getElementById("restart-knapp").style.display = "none";

function skjulDivs() {
	document.getElementById("divA").style.visibility = "hidden";
	document.getElementById("divB").style.visibility = "hidden";
	document.getElementById("divC").style.visibility = "hidden";
	document.getElementById("divD").style.visibility = "hidden";
}

skjulDivs();

function visDivs() {
	document.getElementById("divA").style.visibility = "visible";
	document.getElementById("divB").style.visibility = "visible";
	document.getElementById("divC").style.visibility = "visible";
	document.getElementById("divD").style.visibility = "visible";
}

function endeSjekk() {
	if(counter >= spm.length - 1) {
		document.getElementById("spm-tekst").innerHTML = score + " av " + (counter + 1) + "!";
		skjulDivs();
		rank();
	}
	else {
		forsinkelse = setInterval(oppdaterSpm, 1000);
	}
}

function oppdaterSpm() {
	clearInterval(forsinkelse);
	counter = counter + 1;
	quiz();
	//document.getElementById("score").innerHTML = "Poeng: " + score;
}

function quiz() {
	visDivs();
	
	document.getElementById("spm-tekst").innerHTML = spm[counter][0];
	
	document.getElementById("divA").innerHTML = spm[counter][1];
	document.getElementById("divB").innerHTML = spm[counter][2];
	document.getElementById("divC").innerHTML = spm[counter][3];
	document.getElementById("divD").innerHTML = spm[counter][4];
	
	document.getElementById("start-knapp").style.display = "none";
	document.getElementById("restart-knapp").style.display = "";
	
}

function svar(alternativ) {
	if (alternativ == spm[counter][5]) {
		document.getElementById("spm-tekst").innerHTML = "Riktig!";
		score++;
		skjulDivs();
		leggTilStjerne();
	}
	else {
		document.getElementById("spm-tekst").innerHTML = "Feil!";
		skjulDivs();
		leggTilKryss();
	}
	
	//forsinkelse = setInterval(oppdaterSpm, 1000);
	endeSjekk();
}

function restartQuiz() {
	counter = 0;
	score = 0;
	
	quiz();
	
	document.getElementById("symbol-teller").innerHTML = "";
	
	//document.getElementById("score").innerHTML = "Poeng: " + score;
	
	document.getElementById("wrapper").style.backgroundImage = "";
}

function rank() {
	if((score / counter) >= 0.9) {
		//document.getElementById("score").innerHTML = "Dette kan du!";
		document.getElementById("wrapper").style.backgroundImage = "url(trophy.png)";
	}
	else if((score / counter) >= 0.7) {
		//document.getElementById("score").innerHTML = "Du er god!";
		document.getElementById("wrapper").style.backgroundImage = "url(tommel_emoji.png)";
	}
	else {
		//document.getElementById("score").innerHTML = "Du må trene mer!";
		document.getElementById("wrapper").style.backgroundImage = "url(tenke_emoji.png)";
	}
}

function leggTilStjerne() {
	var nyStjerne = document.createElement("IMG");
	nyStjerne.className = "stjerneImg";
	nyStjerne.setAttribute("src", "stjerne_emoji.png");
	document.getElementById("symbol-teller").appendChild(nyStjerne);
}

function leggTilKryss() {
	var nyttKryss = document.createElement("IMG");
	nyttKryss.className = "kryssImg";
	nyttKryss.setAttribute("src", "kryss_emoji.png");
	document.getElementById("symbol-teller").appendChild(nyttKryss);
}
