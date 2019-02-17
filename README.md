# color-picker

A minimal JavaScript color picker

<img width="322" alt="color-picker" src="https://user-images.githubusercontent.com/8350985/50245892-01396700-03d4-11e9-952b-ac32fed4603e.png">

[> Demo](https://color-picker.lukasbischof.ch/demo/index.html)

## Installation

Include the stylesheet and the script in your project:

```html
<script src="dist/js/color-picker.min.js" type="text/javascript"></script>
<link rel="stylesheet" href="dist/css/color-picker.min.css" />
```

## Usage

To create a new instance, use:

```javascript
var colorPicker = new ColorPicker({
  // options
})
```

to present the picker, use:

```javascript
colorPicker.present(function(color) {
  // Do some stuff, e.g.:
  
  if (color) {
    // Color can be undefined if the user pressed on cancel
    document.getElementById('elementToStyle').style.color = color.cssHex;
  }
});
```

For more detailed documentation, see the [wiki](https://github.com/lukasbischof/color-picker/wiki).

## Development

``` bash
# install dependencies
yarn install

# serve a development page with hot reload at localhost:8080
yarn run dev

# build for production with minification
yarn run build

# build for production and view the bundle analyzer report
yarn run build --report

# run e2e tests
yarn run e2e
```
