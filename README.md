# Sensei Anywhere

Sensei Anywhere is a navigation tool powered by fuzzy search. Sensei Anywhere is used in [Datazenit](http://datazenit.com/) to navigate between connections, databases and tables. This project is currently under heavy development, use at your own risk.

## Installation

Sensei Anywhere depends on jQuery, lodash/underscore.js and Mousetrap. Include these libraries together with ``sensei-anywhere.css`` and ``sensei-anywhere.js``.

## Demo

Click on the image to view demo.

[![Sensei Anywhere Demo](https://cloud.githubusercontent.com/assets/625264/6615380/11948574-c8ac-11e4-9058-56f3feb9813f.png)](http://datazenit.com/static/sensei-anywhere/example/)

## More info

Read this blog post: [Sensei Anywhere](http://lauris.github.io/development/2014/09/16/sensei-anywhere/).

## Usage

Create an array containing your items, e.g., file names, paths, links or anything else.

```
var data = [
	{
		group: "files",
		items: "assets/main.css", "assets/test.js", "assets/main.min.css", "assets/test.min.js"
	}
];
```

Initialize Sensei Anywhere and define shortcuts. In this example shortcuts are ``command+k`` and ``ctrl+k``. You can define as many shortcuts as you want.

```
var anywhere = $.anywhere(data, ['command+k', 'ctrl+k']);
```

Listen to "select" event to get the selected item.

```
anywhere.events.on("select", function (item) {
   alert("Cool, your selected item: " + item);
});
```
