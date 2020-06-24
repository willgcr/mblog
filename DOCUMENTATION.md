<h1 align="center">mBlog documentation</h1>

Welcome to the docs. Here you can find technical content about mBlog, how it works, how it was designed and other information to help developers create plugins or edit and contribute to the mBlog code.

The mBlog uses part of a simple and lightweight css framework called EightFramework, it was not oficially released yet but the author of the framework is the same as the mBlog. On the mBlog project the EightFramework was edited and lots of parts were removed so mBlog can be even simpler, the reason for using this framework is to have a full responsive website with minimal code. The remaining parts of the framework are in a file called eight.css or embeded into mblog.css. In the future other unimportant parts of EightFramework will be removed and the remaining code will be embeded into mblog.css.

### Table of contents

- [How mBlog Works](#how-mblog-works)
- [The database](#how-mblog-works)
- [mBlog scripts (javascript files)](#mblog-scripts-javascript-files)
    - [article-list.js](#article-listjs)
    - [article-loader.js](#article-loaderjs)
    - [plugin-loader.js](#plugin-loaderjs)
    - [write.js](#writejs)
- [Plugins](#plugins)
    - [How plugins work?](#how-plugins-work)
    - [How to install a plugin?](#how-to-install-a-plugin)
    - [How to create a plugin?](#how-to-create-a-plugin)
- [Contributing](#contributing)
- [Credits](#credits)
- [Licens](#license)


### How mBlog works

mBlog is very simple, there are only three HTML files (_index.html_, _article.html_ and _/write/index.html_). 
Below you can see a brief description of each one:

- __*Index (index.html)*__ - This file is the homepage of the mBlog, in this page all articles in the database _("article.json")_ will be listed so users can easily access them. This page uses _"article-list.js"_ and _"plugin-loader.js"_, which will be explained later;

- __*Article (article.html)*__ - This is the file from which all articles will be served, the file itself works like a sketch and all the article content on database will be dynamically loaded into it according to the GET variable "id". (_Eg. https://wgrocha.github.io/mblog-demo/article.html?id=1_ loads the article with __"id"__ equals __1__). This page uses _"article-loader.js"_ and _"plugin-loader.js"_, which will be explained later; 

- __*Write (/write/index.html)*__ - This is the file that enables the owner of the blog to write new articles. It has a structure very similar to _"article.html"_ but the content on this page can be edited using [ContentTools](https://getcontenttools.com), which is a WYSIWYG editor, after editing the content and finishing the new article the user can download a file called _"articles.json"_, this is the "database" of mBlog and must be inside the __"data"__ folder. To "post" the new article the user just have to replace the old _"articles.json"_ in the __"data"__ folder by the new one. This page uses _"write.js"_, _"plugin_loader.js"_, _"content-tools.min.js"_ and _"editor.js"_ which will be explained later;


### The database

The database of mBlog consists on a single file called _"articles.json"_. As you can imagine it's a json file in which each object represents one article like so:

- ```articleID``` - This is an autoincremented number field which identifies each article. It's used by _"article.html"_ and _"aricle_loader.js"_ to identify which article to load;
- ```articleTitle``` - The article's title in plain text;
- ```articleSubtitle``` - The article subtitle in plain text;
- ```articleDate``` - The date of the article, it's automatically filled by javascript (plain text, US format);
- ```articleTags``` - Tags for the article, it may be useful for plugins (it's an array of plain text strings);
- ```articleImage``` - A banner image that will be shown right below the header of the article in _"article.html"_ (the url of the image in plain text);
- ```articleAuthor``` - The name of the author in plain text (automatic);
- ```articleSummary``` - The first paragraph of the article, it will be shown in the homepage in the article list (it is HTML encoded to base64 and it's automatic too);
- ```articleText``` - The body of the article, it is HTML encoded to base64;

Below you can see an example of the "articles.json" file:
```json
[
    {
        "articleID": 0,
        "articleTitle": "This is an example",
        "articleSubtitle": "Subtitle",
        "articleDate": "11 June 2020",
        "articleTags": [
            "tag0",
            "tag1",
            "tag2"
        ],
        "articleImage": "https://images.pexels.com/photos/164005/pexels-photo-164005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
        "articleAuthor": "mBlog",
        "articleSummary": "CiAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBJbnRlZ2VyIHV0IGFudGUgZWxlbWVudHVtLCBjb25zZXF1YXQgbnVuYyBldCwgaGVuZHJlcml0IGV4LiBOdW5jIGF0IHRlbXBvciBtYXVyaXMsIGF0IGFsaXF1ZXQgbG9yZW0uIFV0IG1heGltdXMgdWxsYW1jb3JwZXIgaXBzdW0sIHZpdGFlIGVnZXN0YXMgc2VtIGN1cnN1cyBhYy4gU3VzcGVuZGlzc2UgdmVoaWN1bGEsIGFudGUgZXQgaGVuZHJlcml0IGltcGVyZGlldCwgbnVuYyBzZW0gbWF4aW11cyB1cm5hLCBuZWMgdm9sdXRwYXQgdGVsbHVzIHZlbGl0IHVsdHJpY2llcyBhbnRlLiBQZWxsZW50ZXNxdWUgaW50ZXJkdW0gdG9ydG9yIG5lYyBlc3QgcG9ydHRpdG9yIGNvbnNlcXVhdC4gUHJhZXNlbnQgYWMgbWV0dXMgbW9sbGlzLCB0cmlzdGlxdWUgZWxpdCB2ZWwsIGVmZmljaXR1ciBsb3JlbS4gVXQgcmhvbmN1cyBlbGl0IHV0IGxlbyB1bHRyaWNpZXMsIGV0IG9ybmFyZSBtZXR1cyB2ZW5lbmF0aXMuIERvbmVjIHZpdGFlIHBvcnR0aXRvciBtaSwgaWQgaWFjdWxpcyBtZXR1cy4gTnVsbGFtIGluIHVybmEgc3VzY2lwaXQsIGlhY3VsaXMgZGlhbSBhYywgY29udmFsbGlzIGV4LiBJbiBoYWMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gTW9yYmkgdml0YWUgdHJpc3RpcXVlIG51bmMuIEFsaXF1YW0gZmluaWJ1cyBhIGF1Z3VlIG5lYyBlbGVtZW50dW0uIEFsaXF1YW0gbGFvcmVldCB0ZWxsdXMgaWQgcXVhbSBhdWN0b3IsIHVsdHJpY2llcyBpbnRlcmR1bSBlbmltIHNjZWxlcmlzcXVlLgo=",
        "articleText": "PHA+CiAgICBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBJbnRlZ2VyIHV0IGFudGUgZWxlbWVudHVtLCBjb25zZXF1YXQgbnVuYyBldCwgaGVuZHJlcml0IGV4LiBOdW5jIGF0IHRlbXBvciBtYXVyaXMsIGF0IGFsaXF1ZXQgbG9yZW0uIFV0IG1heGltdXMgdWxsYW1jb3JwZXIgaXBzdW0sIHZpdGFlIGVnZXN0YXMgc2VtIGN1cnN1cyBhYy4gU3VzcGVuZGlzc2UgdmVoaWN1bGEsIGFudGUgZXQgaGVuZHJlcml0IGltcGVyZGlldCwgbnVuYyBzZW0gbWF4aW11cyB1cm5hLCBuZWMgdm9sdXRwYXQgdGVsbHVzIHZlbGl0IHVsdHJpY2llcyBhbnRlLiBQZWxsZW50ZXNxdWUgaW50ZXJkdW0gdG9ydG9yIG5lYyBlc3QgcG9ydHRpdG9yIGNvbnNlcXVhdC4gUHJhZXNlbnQgYWMgbWV0dXMgbW9sbGlzLCB0cmlzdGlxdWUgZWxpdCB2ZWwsIGVmZmljaXR1ciBsb3JlbS4gVXQgcmhvbmN1cyBlbGl0IHV0IGxlbyB1bHRyaWNpZXMsIGV0IG9ybmFyZSBtZXR1cyB2ZW5lbmF0aXMuIERvbmVjIHZpdGFlIHBvcnR0aXRvciBtaSwgaWQgaWFjdWxpcyBtZXR1cy4gTnVsbGFtIGluIHVybmEgc3VzY2lwaXQsIGlhY3VsaXMgZGlhbSBhYywgY29udmFsbGlzIGV4LiBJbiBoYWMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gTW9yYmkgdml0YWUgdHJpc3RpcXVlIG51bmMuIEFsaXF1YW0gZmluaWJ1cyBhIGF1Z3VlIG5lYyBlbGVtZW50dW0uIEFsaXF1YW0gbGFvcmVldCB0ZWxsdXMgaWQgcXVhbSBhdWN0b3IsIHVsdHJpY2llcyBpbnRlcmR1bSBlbmltIHNjZWxlcmlzcXVlLgo8L3A+"
    }
]
```

### mBlog scripts (javascript files)

There are only four javascript files (except for ContentTools) in the mBlog engine. They will be explained in this section:

#### article-list.js

- __Purpose__: Load articles from database and show a list in the index page
- __Used by__: ```index.html```
- __Functions__: ```loadArticleList```, ```decodeUnicode``` and ```loadDatabase```

|```loadArticleList```|```decodeUnicode```|```loadDatabase```|
|:-----------|:-----------|:-----------|
|The "entrypoint", it's attached to the ```DOMContentLoaded``` event of the ```document``` element.|Used to decode base64 data from the database (```articleSummary``` and ```articleText``` fields).|Used to send an HTTP request to the database file. It gets two arguments, ```file``` is the file location of the database and ```callback``` is a callback function to be called in case of success (HTTP request well succeeded).|

- __Notes__: The most important part of this script is the callback of the ```loadDatabase```, this callback parses the content of the database and inserts it into the ```list-of-articles``` div, each article will be contained within a section. This callback also splits the list of articles in pages, according to the variable ```articlesPerPage``` declared in the beginning of the script. ```articlesPerPage``` is a control variable and it's set to 5 by default, if the number of articles in the database exceeds this value the callback of the ```loadDatabase``` will create buttons for navigation and add them to the ```page-buttons``` div, each page will only show a limited number of articles, it helps navigation in long lists of articles.

#### article-loader.js

- __Purpose__: Loads an article from database into ```article.html```
- __Used by__: ```article.html```
- __Functions__: ```loadArticle```, ```decodeUnicode``` and ```loadDatabase```

|```loadArticle```|```decodeUnicode```|```loadDatabase```|
|:-----------|:-----------|:-----------|
|The "entrypoint", it's attached to the ```DOMContentLoaded``` event of the ```document``` element.|Used to decode base64 data from the database (```articleSummary``` and ```articleText``` fields).|Used to send an HTTP request to the database file. It gets two arguments, ```file``` is the file location of the database and ```callback``` is a callback function to be called in case of success (HTTP request well succeeded).|

- __Notes__: The most important part of this script is the callback of the ```loadDatabase```, this callback parses the content of the database and searchs for the article with ```articleID``` that matches the HTTP GET ```id``` variable passed to ```article.html``` page (Eg. ```.../article.html?id=1```). If there is a matching ```articleID``` in the database, the callback of ```loadDatabase``` also creates HTML elements to be inserted into the corresponding parent elements in the page.  The HTML elements used as containers by this "article injection" are: ```article-title```, ```article-subtitle```, ```article-date```, ```article-image```, ```article-text```, ```article-author``` and ```article-tags```. If there is no matching ```articleID``` in the database, this script will insert a _"404 Ops!"_ message into the page, note that this _404_ is just a page message, the _HTTP RESPONSE STATUS CODE_ is not affected.

#### plugin-loader.js

- __Purpose__: Load all plugins configured by the user
- __Used by__: ```index.html```, ```article.html```, ```/write/index.html```
- __Functions__: ```getPluginList``` - This function loads the ```plugins.json``` file from the __data__ folder. I takes two arguments, ```file``` is the path of the ```plugins.json```, and ```callback``` is the function to be called in case of success.
- __Notes__: This script attaches an anonymous function to the ```DOMContentLoaded``` event of the document element. This anonymous function calls the ```getPluginList``` passing other anonymous function as a callback. The callback of ```getPluginList``` reads all plugin names from ```plugins.json``` and inserts ```<script>``` elements into the ```<head>``` element, by doing this the plugins will be loaded by the user's browser.

#### write.js

- __Purpose__: This script is used to update the database with a new article
- __Used by__: ```/write/index.html```
- __Functions__: ```filterCharacters```, ```downloadFile``` and ```loadDatabase```

|```filterCharacters```|```downloadFile```|```loadDatabase```|
|:-----------|:-----------|:-----------|
|Filter characters from page elements before saving them to the database.|Creates a file to be downloaded from the content that is passed as argument.|Used to send an HTTP request to the database file. It gets two arguments, ```file``` is the file location of the database and ```callback``` is a callback function to be called in case of success (HTTP request well succeeded).|

- __Notes__: 
    The page ```/write/index.html``` has some editable elements, the edition process is done using [ContentTools](https://getcontenttools.com), which is a WYSIWYG editor. The HTML editable elements are marked with [data attributes](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes) which are accessed by ContentTools to make edition possible (you can check which elements are aditable by looking at the ```/write/index.html``` source code, they all have a __data-editable__ property).

    The ```write.js``` script attaches an anonymous function to the ```DOMContentLoaded``` event of the ```document``` element, this is what this function does:

    - Start by setting the article's date (its done using the ```Date()``` javascript function).

    - After that it attaches a function to ```article-img-url``` which will dinamically load the article's banner when the user triggers an event on the input element (events are ```change```, ```keydown```, ```keypress```, ```keyup```, ```mousedown```, ```click``` and ```mouseup```).

    - After that it attaches a function to the ```click``` event of the ```finish-editing``` button. The user is supposed to click this button when he finishes the new article. This will trigger the function which is going to get the new article data from the elements in the page (```article-title```, ```article-subtitle```, ```article-date```, ```article-tags```, ```article-image```, ```article-author``` and ```article-text```), it also generates the ```article-summary``` content from the first paragraph in the ```article-text```. It also gets the old ```articles.json``` database (using ```loadDatabase```) and inserts the new article so the user can download the new database (```downloadFile``` function).

### Plugins

Plugins are scripts (single javascript files) that can extend mBlog functionality. They can change, add or remove some HTML elements, manipulate their attributes and add a custom behaviour to the page.

#### How plugins work?

All plugins are loaded by the ```plugin-loaders.js``` script, as described [here](#pluginloaderjs). They must be inside the __plugins__ folder and can be used in any HTML page of mBlog (```index.html```, ```article.html``` and ```/write/index.html```).

#### How to install a plugin?

The installation process is very simple:

- Put the plugin js file inside the __plugins__ folder;
- Add the name of the plugin to the ```/data/plugins.json ``` file (without path and extension), like so:

```
[
    "social-media-share",
    "another_plugin"
]
```
- After this, the plugin might be working!

Note: To disable a plugin you don't need to remove it from the __plugins__ folder, you can just remove its name from the ```/data/plugins.json``` file.

#### How to create a plugin?

Creating plugins for mBlog is also a very easy task but some things have to be noticed:

- Your plugin will be added to all mBlog html pages (```index.html```, ```article.html``` and ```/write/index.html```) so it must check the url for the page it wants to execute on.

- For compatibility plugins must be a single javascript file. If you want to add resources to your plugin like images please use [data URI scheme](https://en.wikipedia.org/wiki/Data_URI_scheme).

- After creating a plugin you can send a pull request to the mBlog repository. Your plugin will be verified and can be launched as an official plugin :wink:

- Below you can see a plugin skecth which you can start from, note that it's not necessary to attach the execution to ```DOMContentLoaded``` or any other event (the ```plugin-loader.js``` already does it):

```javascript
//Plugin name and version
//Author: Author name here
//Description: This is an mBlog plugin that is useful for...
//
//You first have to verify which page is running your script (this example only runs in the article.html page)
if (window.location.href.indexOf ('article.html') != -1) {
    //Your code goes here
    alert ("Hello World!");
}
```

- Your plugin can manipulate all elements in the pages, but is recommended to mainupulate them according to this table:

    | Page | Element ID | Type of element | Notes |
    |:---- |:------------ |:--------------- |:----- |
    |```index.html```|```author-name```|```div```|This element has a ```p``` child which contains the name of the author.|
    |```index.html```|```author-bio```|```div```|This element has a ```p``` child which contains a small biography of the author.|
    |```index.html```|```author-links```|```div```|This element has a few ```a``` childs which are links for the author social networks.|
    |```index.html```|```author-pic```|```img```|This is the image of the author.|
    |```index.html```|```home-main-section```|```section```|This is the section which contains the author information. For compatibility, is recommended not to change elements inside of it except for ```author-name```, ```author-bio```, ```author-links``` and ```author-pic```. If you want you can insert sections before or after this section.|
    |```index.html```|```articles-section-top```|```section```|This is the section which separates ```home-main-section``` and ```list-of-articles```. For compatibility, is recommended not to change elements inside of it. If you want you can insert sections before or after this section.|
    |```index.html```|```list-of-articles```|```div```|This is the div in which the list of articles will be loaded. Each article inserted here is contained in one section.|
    |```index.html```|```pages-section```|```section```|This section is used by ```article-list.js``` to create navigation buttons when the list of articles is too long to be in a single page. Do not to change elements inside of it. If you want you can insert sections before or after this section.|
    |```article.html```|```article-title```|```div```|It has a child ```h2``` element (inserted by ```article-loader.js```) which contains the title of the article.|
    |```article.html```|```article-subtitle```|```div```|It has a child ```h3``` element (inserted by ```article-loader.js```) which contains the subtitle of the article.|
    |```article.html```|```article-date```|```div```|It has a child ```p``` element (inserted by ```article-loader.js```) which contains the date of the article.|
    |```article.html```|```article-image```|```div```|This is the banner of the article, by default it's hidden ```(display: none)``` (the ```article-loader.js``` script sets its background according to the database). If the article has no banner, this element will be deleted.|
    |```article.html```|```article-text```|```div```|Inside of it the article's body will be inserted by ```article-loader.js```.|
    |```article.html```|```article-author```|```div```|It has a child ```p``` element (inserted by ```article-loader.js```) which contains the name of the author.|
    |```article.html```|```article-tags```|```div```|It has a few child ```p``` elements (inserted by ```article-loader.js```) which contains the tags of the article. If the article has no tags, this element will be empty.|
    |```/write/index.html```|```article-title```|```div```|It has a child ```h2``` element which contains the title of the article.|
    |```/write/index.html```|```article-subtitle```|```div```|It has a child ```h3``` element which contains the subtitle of the article.|
    |```/write/index.html```|```article-date```|```div```|It has a child ```p``` element (inserted by ```write.js```) which contains the date of the article. This element is used by the ```write.js``` script to automatically set the date for the article, so be careful.|
    |```/write/index.html```|```article-image```|```div```|This is the banner of the article, by default it's hidden ```(display: none)``` (its automatically updated by ```write.js``` when the user trigger an event on ```article-image-url``` input). If the user doesn't set a banner, this element will be hidden.|
    |```/write/index.html```|```article-text```|```div```|Inside of its there is the article's body.|
    |```/write/index.html```|```article-author```|```div```|It has a child ```p``` element which contains the name of the author. It's not editable by the user, is set when the author first configures the blog.|
    |```/write/index.html```|```article-tags```|```div```|It has a few child ```p``` elements which contains the tags of the article.|

- This is just a list of recommended actions. You can do whatever you want if you know what you're doing!

### Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

### Credits

[ContentTools](https://getcontenttools.com) - Without this amazing tool mBlog would not be possible :blue_heart:


### License

This work by [Willian Gabriel C. da Rocha](https://wgrocha.github.io) is licensed under MIT License.