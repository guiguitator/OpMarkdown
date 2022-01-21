const input = document.getElementById('input');
const output = document.getElementById('output');

const themes = ['light_theme'];

function updateRender() {
	marked.use({
		breaks: true,
	});
	var value = marked.parse(input.value);
	output.innerHTML=value;
	for (var i = 0; i < output.getElementsByTagName("img").length; i++) {
		if (output.getElementsByTagName("img")[i].getAttribute('alt') != '') {
			if (output.getElementsByTagName("img")[i].getAttribute('alt') == 'center') {
				output.getElementsByTagName("img")[i].parentNode.classList.add('center');
			} else {
				output.getElementsByTagName("img")[i].setAttribute('title', output.getElementsByTagName("img")[i].getAttribute('alt'));
			}
		}
	}
	for (var b = 0; b < output.getElementsByTagName("a").length; b++) {
		output.getElementsByTagName("a")[b].setAttribute("target", '_blank');
	}
}

// Document Function

function newDocument() {
	input.value='New document.';
	output.innerHTML='<p>New document.</p>';
}

function openDocument() {
	var fileToLoad = document.getElementById("input_open").files[0]; 
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) {
		var textFromFileLoaded = fileLoadedEvent.target.result;
		document.getElementById("input").value = textFromFileLoaded;
		updateRender();
	};
	fileReader.readAsText(fileToLoad, "UTF-8");
}

function saveDocument() {
	var save = document.getElementById("input").value;
	var blob = new Blob([save], {
		type: "text/plain;charset=utf-8"
	});
	var name = "document";
	if (document.getElementById('save_name').value != '') {
		name = document.getElementById('save_name').value;
	}
	saveAs(blob, name+".txt");
}

function exportDocument() {
	var save = document.getElementById("output").innerHTML;
	var blob = new Blob([save], {
		type: "application/xhtml+xml;charset="
	});
	var name = "output";
	if (document.getElementById('export_name').value != '') {
		name = document.getElementById('export_name').value;
	}
	saveAs(blob, name+".html");
}

function changeTheme(theme) {
	document.getElementById('theme').setAttribute('href', `./themes/${theme}.css`)	
}

// Layout Function

const menu = document.getElementById('menu');

function displayMenu(display) {
	if (display == true) {
		menu.style.display='block';
	} else if (display == false) {
		menu.style.display='none';
	}
}

function displayModal(type) {
	if (type == 'new') {
		document.getElementById('modal-new').style.display='block';
	}
	if (type == 'open') {
		document.getElementById('modal-open').style.display='block';
	}
	if (type == 'save') {
		document.getElementById('modal-save').style.display='block';
	}
	if (type == 'export') {
		document.getElementById('modal-export').style.display='block';
	}
	if (type == 'theme') {
		document.getElementById('modal-theme').style.display='block';
	}
	if (type == false) {
		for (var i = 0; i < document.getElementsByClassName("modal").length; i++) {
			document.getElementsByClassName("modal")[i].style.display='none';
		}
	}
}

function displayTheme() {
	for (var g = 0; g < themes.length; g++) {
		document.getElementById('showcase').insertAdjacentHTML('beforeend', `
			<div class="object" onclick="changeTheme('${themes[g]}');">
				<img src="https://opmarkdown.netlify.app/images/screenshots/${themes[g]}.png">
				<p>${themes[g].replace('_', ' ')}</p>
			</div>
		`)
	}
}

displayTheme();

// Keyboard Event

document.body.onkeyup = function(e){
	if (e.keyCode == 27) {
		displayModal(false);
	}
}