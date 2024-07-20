# Pixel Perfect CSS

Pixel Perfect CSS is a utility-first CSS library designed to simplify the creation of responsive and reusable design components. It provides a set of CSS custom properties and utility classes for padding, margin, display, flex, and grid layouts, among others.

## Installation

You can install Pixel Perfect CSS via npm:

```bash
npm install pixel-perfect-css
```

or if you are using yarn

```bash
yarn add pixel-perfect-css
```

## Usage

To use Pixel Perfect CSS in your project, include the CSS file in your HTML or import it into your CSS/SCSS files.

Add below link tag

```bash
<link rel="stylesheet" href="node_modules/pixel-perfect-css/css/output.css" />
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      rel="stylesheet"
      href="node_modules/pixel-perfect-css/css/output.css"
    />
    <title>Pixel Perfect CSS Example</title>
  </head>
  <body>
    <div class="d-flex ai-center jc-center p-2 m-2">
      <p class="p-1 m-1">Hello, Pixel Perfect CSS!</p>
    </div>
  </body>
</html>
```

## Available Sizes

by default base = 16px;
1 : 1px
2 : 2px
3 : 3px
4 : 4px
8 : 8px
10 : base - 6px
20 : base + 4px
32: base X 2
48: base X 3
64: base X 4
80: base X 5
96: base X 6

You can change base according to your project and choice by overwriting --base variable in your project!
The above sizes follows good UI/UX principles. Use it wisely and consistently!
