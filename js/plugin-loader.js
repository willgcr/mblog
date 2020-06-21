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
	//Get plugin list and add them inside the head tag
	getPluginList ('data/plugins.json', (plugins) => {
		if (plugins) {
			let head = document.getElementsByTagName ('head')[0];
			plugins.forEach ((plugin) => {
				//Adding the script tag to the head
				let script = document.createElement ('script');
				script.type = 'text/javascript';
				script.src = 'plugins/' + plugin;
				head.appendChild (script);
			});
		}
	});
	
});