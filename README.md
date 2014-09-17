# Sensei Anywhere

Sensei Anywhere is a navigation tool powered by fuzzy search. Sensei Anywhere is used in [Datazenit](http://datazenit.com/) to navigate between connections, databases and tables.

## Installation

Sensei Anywhere depends on jQuery, lodash/underscore.js and Mousetrap. Include these libraries together with ``sensei-anywhere.css`` and ``sensei-anywhere.js``.

## Demo

Click on the image to view demo.

[![Sensei Anywhere Demo](http://lauris.github.io/images/blog/sensei-anywhere-screenshot.png)](http://datazenit.com/static/sensei-anywhere/example/)

## Usage

Create an array containing your items, e.g., file names, paths, links or anything else. 

```
var data = ["assets/main.css", "assets/test.js", "assets/main.min.css", "assets/test.min.js"];
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