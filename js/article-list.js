var currentArticlePage = 0;
var articlesPerPage = 5;

document.addEventListener ("DOMContentLoaded", function loadArticleList () {
    //To decode base64
    function decodeUnicode (str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }
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
                        document.getElementById ('list-of-articles').innerHTML = '<p class="align-center" style="color: rgba(0, 0, 0, 0.5)">No articles yet!</p>';    
                    }
                } else {
                    document.getElementById ('list-of-articles').innerHTML = '<p class="align-center" style="color: rgba(0, 0, 0, 0.5)">No articles yet!</p>';
                }
            }
        }
        xhr.send (null);
    }
    loadDatabase ('./data/articles.json', (database) => {
        //Check if all articles can be displayed in a single page
        if (database.length <= articlesPerPage) {
            document.getElementById ('pages-section').parentNode.removeChild (document.getElementById ('pages-section'));
        } else {
            //Calculate the number of pages
            let numPages = Math.ceil (database.length / articlesPerPage);
            //Create buttons for page navigation
            document.getElementById ('page-buttons').innerHTML = '';
            for (let i = 0; i < numPages; i++) {
                let new_button = document.createElement ('button');
                new_button.classList.add ('article-nav-button');
                if (i == currentArticlePage) new_button.classList.add ('button-highlight')
                new_button.innerHTML = i+1;
                new_button.addEventListener ('click', () => {
                    currentArticlePage = i;
                    document.getElementById ('articles-section-top').scrollIntoView ({
                        behavior: "smooth",
                        block: "start"
                    });
                    loadArticleList ();
                });
                document.getElementById ('page-buttons').appendChild (new_button);
            }
            //Calculate first and last article to show in the current page
            let first = articlesPerPage * currentArticlePage;
            let last = database.length -1;
            if (articlesPerPage <= database.length) {
                last = articlesPerPage * currentArticlePage + articlesPerPage;
            }
            //Get only articles for the current page
            database = database.slice (first, last);
        }
        //Clean the div where the article list will appear
        document.getElementById ('list-of-articles').innerHTML = '';
        //Show the article list
        database.forEach ((article) => {
            let articleTags = document.createElement ('span');
            let tagList = article.articleTags;
            tagList.forEach ((tag) => {
                new_tag = document.createElement ('p');
                new_tag.innerHTML = tag;
                articleTags.appendChild (new_tag);
            });
            if (tagList.length == 0) {
                let message = document.createElement ('p');
                message.innerHTML = 'Untagged';
                articleTags.appendChild (message);
            }
            let sectionTemplate = [
                "<section class=\"article\">",
                    "<div class=\"row\">",
                        "<div class=\"container\">",
                            "<div class=\"row\">",
                                "<div class=\"title xlarge-8 xlarge-offset-3 large-8 large-offset-3 medium-8 medium-offset-3 align-middle\">",
                                    article.articleTitle,
                                "</div>",
                                "<div class=\"subtitle xlarge-8 xlarge-offset-3 large-8 large-offset-3 medium-8 medium-offset-3 align-middle\">",
                                    article.articleSubtitle,
                                "</div>",
                                "<div class=\"date xlarge-8 xlarge-offset-3 large-8 large-offset-3 medium-8 medium-offset-3 align-middle\">",
                                    article.articleDate,
                                "</div>",
                                "<div class=\"summary xlarge-8 xlarge-offset-3 large-8 large-offset-3 medium-8 medium-offset-3\">",
                                    decodeUnicode (article.articleSummary),
                                    " <a href=\"article.html?id=",
                                        article.articleID,
                                    "\" target=\"_blank\">Read more...</a>",
                                "</div>",
                                "<div class=\"tags xlarge-8 xlarge-offset-3 large-8 large-offset-3 medium-8 medium-offset-3\"><span style=\"font-weight:bold; font-size: 14px;\">Tags:</span>",
                                    articleTags.innerHTML,
                                "</div>",
                            "</div>",
                        "</div>",
                    "</div>",
                    "<div class=\"section-divider\"></div>",
                "</section>"
            ];
            document.getElementById ('list-of-articles').innerHTML += sectionTemplate.join('');
        });

    });
});