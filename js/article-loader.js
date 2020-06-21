//This script loads an entire article inside article.html page
document.addEventListener ("DOMContentLoaded", loadArticle);

//To decode base64
function decodeUnicode(str) {
  // Going backwards: from bytestream, to percent-encoding, to original string.
  return decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

//Load articles from database
function loadArticle () {
	//Used to load database file
	function loadDatabase (file, callback) {
		let xhr = new XMLHttpRequest ();
		xhr.overrideMimeType ("application/json");
		xhr.open ("GET", file, true);
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 0 || (xhr.status >= 200 && xhr.status < 400)) {
					try {
						callback (JSON.parse (xhr.responseText));	
					} catch (e) {
						document.getElementById ('article-title').innerHTML = '<p>Ops!</p>';
						document.getElementById ('article-subtitle').innerHTML = '<p>No articles yet. Come back later ;)</p>';
						document.getElementById ('social-media-share').style.display = 'none';	
					}
				} else {
					document.getElementById ('article-title').innerHTML = '<p>Ops!</p>';
					document.getElementById ('article-subtitle').innerHTML = '<p>No articles yet. Come back later ;)</p>';
					document.getElementById ('social-media-share').style.display = 'none';
				}
			}
		}
		xhr.send (null);
	}
	//To obtain get variables from the url
	let $_GET = {};
	if (document.location.toString().indexOf('?') !== -1) {
		let query = document.location
		.toString()
		.replace(/^.*?\?/, '')
		.replace(/#.*$/, '')
		.split('&');
		for (let i = 0, l = query.length; i < l; i++) {
			let aux = decodeURIComponent(query[i]).split('=');
			$_GET[aux[0]] = aux[1];
		}
	}
	//Get the database file
	loadDatabase ('./data/articles.json', (database) => {
		let articleExists = false;
		database.forEach ((article) => {
    		if ($_GET['id'] && article.articleID == $_GET['id']) {
    			articleExists = true;
				//Set article title
				let title = document.createElement ('h2');
				title.innerHTML = article.articleTitle;
				document.getElementById ('article-title').appendChild (title);
				//Set article subtitle
				let subtitle = document.createElement ('h3');
				subtitle.innerHTML = article.articleSubtitle;
				document.getElementById ('article-subtitle').appendChild (subtitle);
				//Set article date
				let date = document.createElement ('p');
				date.innerHTML = article.articleDate;
				document.getElementById ('article-date').appendChild (date);
				//Set article image
				if (article.articleImage) {
					document.getElementById ('article-image').style.backgroundImage = "url('" + article.articleImage + "')";
				} else {
					document.getElementById ('article-image').parentNode.removeChild (document.getElementById ('article-image'));
				}
				//Set article text
				document.getElementById ('article-text').innerHTML = decodeUnicode (article.articleText);
				//Set article author
				let author = document.createElement ('p');
				author.innerHTML = article.articleAuthor;
				document.getElementById ('article-author').appendChild (author);
				//Set article tags
				let tags = article.articleTags;
				tags.forEach ((tag) => {
					let new_tag = document.createElement ('p');
					new_tag.innerHTML = tag;
					document.getElementById ('article-tags').appendChild (new_tag);
				});
			}
		});
		//If the article does not exists shows an error message
		if (articleExists == false) {
			document.getElementById ('article-title').innerHTML = '<p>404 Ops!</p>';
			document.getElementById ('article-subtitle').innerHTML = '<p>This article doesn\'t exists.</p>';
		}
	});
}