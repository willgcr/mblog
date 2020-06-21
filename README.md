<h1 align="center">mBlog</h1><br>

![GitHub](https://img.shields.io/github/license/wgrocha/mblog?style=for-the-badge)
![GitHub release (latest SemVer)](https://img.shields.io/github/v/release/wgrocha/mblog?sort=semver&style=for-the-badge)

### Table of contents

- [What is mBlog?](#what-is-mblog) 
- [How it works?](#how-it-works)
- [Download and setup](#download-and-setup)
- [Usage](#usage)
- [Plugins](#plugins)
- [Contributing](#contributing)
- [Credits](#credits)
- [License](#license)


##### Other

- Documentation __*(Not available yet)*__
- Official mBlog site __*(not available yet)*__
- FAQ __*(not available yet)*__

#

### What is mBlog?

mBlog is a lightweight blog engine, it was made to be simple, fast, extensible, dynamic and it is totally open-source! 
Besides that it doesn't even use any server-side languages. It's perfect to be used on [GitHub Pages](http://pages.github.com) :wink:

You can look at mBlog like a CMS, the simplest CMS you can imagine. Don't waste time comparing it to other CMS platforms like Wordpress, Joomla, or any other, mBlog was designed to be a simple blog engine and nothing more. 

[Click here to check a live demo of mBlog.](#)

### How it works?

Because mBlog does't use server-side languages, it abuses Javascript, all content is loaded using JS. There are no frameworks, it is just raw Javascript, pure and simple. The articles are all saved in a JSON file __*(articles.json)*__ which can be found inside the __*data*__ folder. For each new article you write you will download a new __*articles.json*__ file, you just have to replace the old one and _voilà_: published!

### Download and setup

To download and setup mBlog is very simple, there are three methods to do this:

- You can access the official download page, there you must set a few things, for that you just fill a small form, pass some basic information like your blog description, your name, etc. Doing this you will download mBlog configured and ready to be used! __*(This method is not available yet!)*__

- You can clone this GitHub repository, inside of it you'will find a small python script, the script name is __*config.py*__, just run it (you need to have python installed) and it will help you to configure things like your blog description, your name, links to your GitHub, Linkedin, etc:
```
git clone https://github.com/wgrocha/mblog.git
cd mblog
python3 config.py
```
- If you don't want do clone the repository or download from the download page, you can download [right here](https://github.com/wgrocha/mblog/archive/master.zip), extract the files and run the __*config.py*__ script:
```
python3 config.py
```

The __*config.py*__ script will configure mBlog according to the information you give. After that you can start using mBlog.

### Usage

With mBlog already configured you can start using it by uploading the files to a web server.<br>
We recommend to use mBlog on GitHub Pages!

##### How to write a new article?

To write and post an article is very simple, you don't even need to access complicated dashboards. Follow these steps to write and publish an article:

- After uploading the files to a web server go to your mBlog homepage, there is a button that says "new article" or something like that, just click on it and you will be redirected to a new blank article;

- When the page for the new article is loaded, a pencil will appear in the upper left corner of the screen, clicking on this pencil you enable the editing mode so you can edit the new article as you wish, add text, images, videos, tables, lists and you can even edit HTML code directly (for more advanced users);

- In addition, it is possible to add a banner to the new article, the recommended resolution is 1000x300px, just paste the URL of the image in the corresponding field during the creation of the article and the banner will be automatically loaded;

- After writing the article, add tags to it at the end of the page, tags can be used by plugins to filter your articles, for example;

- Finally click on the button that indicates you're done. The page will ask you to download a file called __*articles.json*__, this file is the new database already updated with the new article, just replace the old __*articles.json*__ (inside __*data*__ folder) and voilà: article created and published.

Can you imagine this on GitHub Pages? Posting a new article is as easy as running a _git push_!

##### How the new article editor works?

The editor used to edit content and write new articles is called __*ContentTools*__.<br>
[Here](https://getcontenttools.com/demo) you access the official guide explaining how to use it.

### Plugins

Yeeep! mBlog supports plugins.

##### How to install a plugin?

Installing plugins couldn't be simpler:

1. Download the plugin (it's going to be a single __*.js*__ file);
2. Put the plugin inside the __*plugins*__ folder;
3. Open the __*plugins.json*__ file (inside the __*data*__ folder), and add the name of the new plugin to it.

Below you can see an example of __*plugins.json*__ file:
```
[
	"social-media-share.js",
	"another-plugin.js",
	"one-more-plugin.js"
]
```
By default mBlog comes with one activated plugin __*(social-media-share.js)*__, it adds links to the end of each article which enable the reader to share it on social media.

##### How to create a plugin?

If you want to create a plugin for mBlog please visit the [documentation](#) and go get things done :wink:

### Contributing

Contributions are always welcome! Please read the [contribution guidelines](CONTRIBUTING.md) first.

### Credits

[ContentTools](https://getcontenttools.com) - Without this amazing tool mBlog would not be possible :blue_heart:


### License

This work by [Willian Gabriel C. da Rocha](https://wgrocha.github.io) is licensed under MIT License.
