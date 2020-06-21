document.addEventListener ('DOMContentLoaded', () => {
    //Start ContentTools
    startEditor ();

    //To filter unwanted characters from elements content
    function filterCharacters (str) {
        return (str.replace(/<(?:.|\n)*?>/gm, '').trim ());
    }

    //Load database file
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
                        callback (null);
                    }
                } else {
                    callback (null);
                }
            }
        }
        xhr.send (null);
    }

    //Download content as file
    function downloadFile (filename, dataType, content) {
        console.log ('hi');
        var element = document.createElement ("a");
        element.setAttribute ("href", "data:" + dataType +";charset=UTF-8," + encodeURIComponent(content));
        element.setAttribute ("download", filename);
        element.style.display = "none";
        document.body.appendChild (element);
        element.click ();
        document.body.removeChild (element);
    }

    //Set article date
    let today = new Date ();
    let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let day = today.getDate ();
    let monthIndex = today.getMonth ();
    let year = today.getFullYear ();
    let finalDate = day + ' ' + monthNames[monthIndex] + ' ' + year;
    let dateParagraph = document.createElement ('p');
    dateParagraph.innerHTML = finalDate;
    document.getElementById ('article-date').innerHTML = '';
    document.getElementById ('article-date').appendChild (dateParagraph);

    //Add event listeners for state changes in article banner url, doing so will automatically update the image while editing the url
    let image_url_input = document.getElementById ('article-image-url');
    let article_image = document.getElementById ('article-image');
    ['change', 'keydown', 'keypress', 'keyup', 'mousedown', 'click', 'mouseup'].forEach ((event) => {
        image_url_input.addEventListener (event, () => {
            let url = image_url_input.value;
            if (url) {
                article_image.style.backgroundImage = 'url('+ url + ')';
                article_image.style.display = 'inline-block';
            } else {
                article_image.style.display = 'none';
            }
        })
    });

    //Get new article data and save to database
    document.getElementById ('finish-editing').addEventListener ('click', () => {
        //Get data to go to database from key components on the page
        let article_title = filterCharacters (document.getElementById ('article-title').firstElementChild.innerHTML);
        let article_subtitle = filterCharacters (document.getElementById ('article-subtitle').firstElementChild.innerHTML);
        let article_date = filterCharacters (document.getElementById ('article-date').firstElementChild.innerHTML);

        let article_tags = new Array ();
        let tags = document.getElementById ('article-tags').firstElementChild.childNodes;
        Array.prototype.forEach.call (tags, (tag) => {
            let clean_tag = tag.innerHTML + '';
            clean_tag = clean_tag.replace (/<(?:.|\n)*?>/gm, '').trim ();
            clean_tag = clean_tag.replace (/\s\s+/g, '');
            if (clean_tag) article_tags.push (clean_tag);
        });
        
        let article_image = filterCharacters (document.getElementById ('article-image').style.backgroundImage.slice (5, -2));
        let article_author = filterCharacters (document.getElementById ('article-author').firstElementChild.innerHTML);
        let article_summary = btoa (unescape (encodeURIComponent (document.getElementById ('article-text').firstElementChild.innerHTML)));
        let article_text = btoa (unescape (encodeURIComponent (document.getElementById ('article-text').innerHTML)));

        loadDatabase ('../data/articles.json', (articles) => {
            //The id for the new article
            let new_id = 0;
            //Check if articles equals null which means no database
            if (articles && articles[0]) {
                //Verify database to use unique id for the new article
                new_id = parseInt (articles[0].articleID) +1;
                let id_conflict = false;
                do {
                    articles.forEach ((article) => {
                        if (new_id == article.articleID) {
                            id_conflict = true;
                            new_id++;
                        }
                    });
                } while (id_conflict == true);
            }

            //Join new article components
            let new_article = {
                "articleID": new_id,
                "articleTitle": article_title,
                "articleSubtitle": article_subtitle,
                "articleDate": article_date,
                "articleTags": article_tags,
                "articleImage": article_image,
                "articleAuthor": article_author,
                "articleSummary": article_summary,
                "articleText": article_text
            };
            //If articles is not null adds new_article to database
            //Else creates a new database file
            if (articles) articles.unshift (new_article);
            else articles = [new_article];
            //Json conversion and download
            articles = JSON.stringify (articles, null, 4);
            downloadFile ('articles.json', 'application/json', articles);
        });
    });
});