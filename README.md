# Jekyll + Vue + Webpack 4 Starter kit

A Jekyll project with Webpack 4 configuration and multiple entry points for each `.js` file in the `_src/pages` folder. Commons and vendor files are also created. A CSS file in `/css/webpack` for the CSS coming from the Vue components is also created.

Before running make sure you have Jekyll installed and don't forget to install JavaScript dependencies with `npm i`.

There is a little Webpack plugin in `_src/webpack.config.js` for generating the `_data/webpack.yml` which allows you to get the `site.data.webpack.hash` variable in your Jekyll files. I got this idea from [Phil's Upvalue blog](https://upvalue.io/webpack-jekyll/).

Every time you create a new page and want to use a `.js` file you have to add these 2 variables to the front matter:
```
---
js_page_file: true
slug: page-a
---
```
You can see how these are used in `_includes/header.html` and `_includes/footer.html`.

Commands in `package.json`:
* `npm run dev` to start coding. Webpack and Jekyll will start watching for changes.
* `npm run build` to make a production Webpack build and `jekyll build`.
