import fs from "fs";
import path from "path";
import { execSync } from "child_process";
import { config } from "./config.js";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Run colors.build.js to generate colors.css
execSync("node css/colors/colors.build.js");

// Function to generate media queries for breakpoints
const generateBreakpoints = (cssContent, breakpoints) => {
  let breakpointCSS = "";
  Object.keys(breakpoints).forEach((key) => {
    const minWidth = breakpoints[key];
    breakpointCSS += `
      @media (min-width: ${minWidth}) {
        ${cssContent.replace(/(\.([a-z-]+))/g, `.${key}--$2`)}
      }
    `;
  });
  return breakpointCSS;
};

let mainCSS = "";

// add reset.css + root.css + index.css
mainCSS += fs.readFileSync(path.join(__dirname, "css/reset.css"), "utf8");
mainCSS += fs.readFileSync(path.join(__dirname, "css/root.css"), "utf8");
mainCSS += fs.readFileSync(path.join(__dirname, "css/index.css"), "utf8");

// CSS files to include
const cssFiles = [
  "css/colors/colors.css", // 0
  "css/layout/aspect-ratio/aspect-ratio.css", // 1 | 1.1
  "css/layout/container/container.css", // 1 | 1.2
  "css/layout/columns/columns.css", // 1 | 1.3
  "css/layout/break-after/break-after.css", // 1 | 1.4
  "css/layout/break-before/break-before.css", // 1 | 1.5
  "css/layout/break-inside/break-inside.css", // 1 | 1.6
  "css/layout/box-decoration-break/box-decoration-break.css", // 1 | 1.7
  "css/layout/box-sizing/box-sizing.css", // 1 | 1.8
  "css/layout/display/display.css", // 1 | 1.9
  "css/layout/float/float.css", // 1 | 1.10
  "css/layout/clear/clear.css", // 1 | 1.11
  "css/layout/isolation/isolation.css", // 1 | 1.12
  "css/layout/object-fit/object-fit.css", // 1 | 1.13
  "css/layout/object-position/object-position.css", // 1 | 1.14
  "css/layout/overflow/overflow.css", // 1 | 1.15
  "css/layout/overscroll-behavior/overscroll-behavior.css", // 1 | 1.16
  "css/layout/position/position.css", // 1 | 1.17
  "css/layout/top-right-bottom-left/top-right-bottom-left.css", // 1 | 1.18
  "css/layout/visibility/visibility.css", // 1 | 1.19
  "css/layout/z-index/z-index.css", // 1 | 1.20
  "css/flexbox-grid/flex-basis/flex-basis.css", // 2 | 2.1
  "css/flexbox-grid/flex-direction/flex-direction.css", // 2 | 2.2
  "css/flexbox-grid/flex-wrap/flex-wrap.css", // 2 | 2.3
  "css/flexbox-grid/flex/flex.css", // 2 | 2.4
  "css/flexbox-grid/flex-grow/flex-grow.css", // 2 | 2.5
  "css/flexbox-grid/flex-shrink/flex-shrink.css", // 2 | 2.6
  "css/flexbox-grid/order/order.css", // 2 | 2.7
  "css/flexbox-grid/grid-template-columns/grid-template-columns.css", // 2 | 2.8
  "css/flexbox-grid/grid-column/grid-column.css", // 2 | 2.9
  "css/flexbox-grid/grid-template-rows/grid-template-rows.css", // 2 | 2.10
  "css/flexbox-grid/grid-row/grid-row.css", // 2 | 2.11
  "css/flexbox-grid/grid-auto-flow/grid-auto-flow.css", // 2 | 2.12
  "css/flexbox-grid/grid-auto-columns/grid-auto-columns.css", // 2 | 2.13
  "css/flexbox-grid/grid-auto-rows/grid-auto-rows.css", // 2 | 2.14
  "css/flexbox-grid/gap/gap.css", // 2 | 2.15
  "css/flexbox-grid/justify-content/justify-content.css", // 2 | 2.16
  "css/flexbox-grid/justify-items/justify-items.css", // 2 | 2.17
  "css/flexbox-grid/justify-self/justify-self.css", // 2 | 2.18
  "css/flexbox-grid/align-content/align-content.css", // 2 | 2.19
  "css/flexbox-grid/align-items/align-items.css", // 2 | 2.20
  "css/flexbox-grid/align-self/align-self.css", // 2 | 2.21
  "css/flexbox-grid/place-content/place-content.css", // 2 | 2.22
  "css/flexbox-grid/place-items/place-items.css", // 2 | 2.23
  "css/flexbox-grid/place-self/place-self.css", // 2 | 2.24
  "css/spacing/padding/padding.css", // 3 | 3.1
  "css/spacing/margin/margin.css", // 3 | 3.2
  "css/sizing/width/width.css", // 4 | 4.1
  "css/sizing/height/height.css", // 4 | 4.2
  "css/sizing/size/size.css", // 4 | 4.3
  "css/typography/font-family/font-family.css", // 5 | 5.1
  "css/typography/font-size/font-size.css", // 5 | 5.2
  "css/typography/font-smoothing/font-smoothing.css", // 5 | 5.3
  "css/typography/font-style/font-style.css", // 5 | 5.4
  "css/typography/font-weight/font-weight.css", // 5 | 5.5
  "css/typography/font-variant-numeric/font-variant-numeric.css", // 5 | 5.6
  "css/typography/letter-spacing/letter-spacing.css", // 5 | 5.7
  "css/typography/line-clamp/line-clamp.css", // 5 | 5.8
  "css/typography/line-height/line-height.css", // 5 | 5.9
  "css/typography/list-style-position/list-style-position.css", // 5 | 5.10
  "css/typography/list-style-type/list-style-type.css", // 5 | 5.11
  "css/typography/text-align/text-align.css", // 5 | 5.12
  "css/typography/text-color/text-color.css", // 5 | 5.13
  "css/typography/text-decoration-line/text-decoration-line.css", // 5 | 5.14
  "css/typography/text-decoration-color/text-decoration-color.css", // 5 | 5.15
  "css/typography/text-decoration-style/text-decoration-style.css", // 5 | 5.16
  "css/typography/text-decoration-thickness/text-decoration-thickness.css", // 5 | 5.17
  "css/typography/text-underline-offset/text-underline-offset.css", // 5 | 5.18
  "css/typography/text-transform/text-transform.css", // 5 | 5.19
  "css/typography/text-overflow/text-overflow.css", // 5 | 5.20
  "css/typography/text-wrap/text-wrap.css", // 5 | 5.21
  "css/typography/text-indent/text-indent.css", // 5 | 5.22
  "css/typography/vertical-align/vertical-align.css", // 5 | 5.23
  "css/typography/white-space/white-space.css", // 5 | 5.24
  "css/typography/word-break/word-break.css", // 5 | 5.25
  "css/typography/hyphens/hyphens.css", // 5 | 5.26
  "css/backgrounds/background-attachment/background-attachment.css", // 6 | 6.1
  "css/backgrounds/background-clip/background-clip.css", // 6 | 6.2
  "css/backgrounds/background-origin/background-origin.css", // 6 | 6.3
  "css/backgrounds/background-position/background-position.css", // 6 | 6.4
  "css/backgrounds/background-repeat/background-repeat.css", // 6 | 6.5
  "css/backgrounds/background-size/background-size.css", // 6 | 6.6
  "css/borders/border-radius/border-radius.css", // 7 | 7.1
  "css/borders/border-width/border-width.css", // 7 | 7.2
  "css/borders/border-color/border-color.css", // 7 | 7.3
  "css/borders/border-style/border-style.css", // 7 | 7.4
  "css/borders/outline-width/outline-width.css", // 7 | 7.5
  "css/borders/outline-color/outline-color.css", // 7 | 7.6
  "css/borders/outline-style/outline-style.css", // 7 | 7.7
  "css/borders/outline-offset/outline-offset.css", // 7 | 7.8
];

cssFiles.forEach((file) => {
  const cssContent = fs.readFileSync(path.join(__dirname, file), "utf8");
  mainCSS += cssContent;
  mainCSS += generateBreakpoints(cssContent, config.breakpoints);
});

// Write the generated CSS to output.css
fs.writeFileSync("output.css", mainCSS);

console.log("CSS build completed successfully.");
