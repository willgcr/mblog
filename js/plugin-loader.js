document.addEventListener ('DOMContentLoaded', () => {
	//Used to load database file
	function getPluginList (file, callback) {
		let xhr = new XMLHttpRequest ();
		xhr.overrideMimeType ("application/json");
		xhr.open ("GET", file, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
					callback (JSON.parse (xhr.responseText));
				}
			}
		}
		xhr.send (null);
	}

	//Check if called from inside the write folder
	let plugins_json = 'data/plugins.json';
	if (document.location.toString().indexOf('/write/')) {
		plugins_json = '../data/plugins.json';
	}
	//Get plugin list and add them inside the head tag
	getPluginList (plugins_json, (plugins) => {
		if (plugins) {
			let head = document.getElementsByTagName ('head')[0];
			plugins.forEach ((plugin) => {
				//Adding the script tag to the head
				let script = document.createElement ('script');
				script.type = 'text/javascript';
				if (document.location.toString().indexOf('/write/')) {
					script.src = '../plugins/' + plugin;
				} else {
					script.src = 'plugins/' + plugin;
				}
				head.appendChild (script);
			});
		}
	});
});