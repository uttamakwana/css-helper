# CSS Helper

CSS Helper is a utility-first CSS library designed to simplify the creation of responsive and reusable design components. It provides a set of CSS custom properties and utility classes for padding, margin, display, flex, and grid layouts, among others.

## Installation

You can install CSS Helper via npm:

```bash
npm install css-helper
```

or if you are using yarn

```bash
yarn add css-helper
```

## Usage

To use CSS Helper in your project, include the CSS file in your HTML or import it into your CSS/SCSS files.

Add below link tag

```bash
<link rel="stylesheet" href="node_modules/css-helper/css/index.css" />
```

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="node_modules/css-helper/css/index.css" />
    <title>CSS Helper Example</title>
  </head>
  <body>
    <div class="d-flex ai-center jc-center p-2 m-2">
      <p class="p-1 m-1">Hello, CSS Helper!</p>
    </div>
  </body>
</html>
```

## Available Sizes

by default base = 16px;
1 : base x 1
2 : base x 2
3 : base x 3
4 : base / 4
8 : base / 2
10 : base - 6px
20 : base + 4px
1px
2px
3px

You can change base according to your project and choice by overwriting --base variable in your project!
The above sizes follows good UI/UX principles. Use it wisely and consistently!

## Available Classes

Display: d-, .display
Align Items: ai-, align-items-
Align Self: as-, align-self-
Place Items: pi-, place-items-
Place Content: pc-, place-content-
Justify Content: jc-, justify-content
Padding: p-, padding-
Margin: m-, margin-

To use media queries, you need to add prefix
mobile (<= 480px): .m-
tablet (<= 768px): .t-
desktop/large screen (<= 1024px): .l-

I think you can idea from the above list what convention I've used.
