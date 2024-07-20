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
mainCSS += fs.readFileSync(path.join(__dirname, "css/root.css"), "utf8");
mainCSS += fs.readFileSync(path.join(__dirname, "css/reset.css"), "utf8");
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
  "css/effects/box-shadow/box-shadow.css", // 8 | 8.1
  "css/effects/opacity/opacity.css", // 8 | 8.2
  "css/effects/mix-blend-mode/mix-blend-mode.css", // 8 | 8.3
  "css/effects/background-blend-mode/background-blend-mode.css", // 8 | 8.4
  "css/filters/blur/blur.css", // 9 | 9.1
  "css/filters/brightness/brightness.css", // 9 | 9.2
  "css/filters/contrast/contrast.css", // 9 | 9.3
  "css/filters/grayscale/grayscale.css", // 9 | 9.4
  "css/filters/hue-rotate/hue-rotate.css", // 9 | 9.5
  "css/filters/invert/invert.css", // 9 | 9.6
  "css/filters/saturate/saturate.css", // 9 | 9.7
  "css/filters/sepia/sepia.css", // 9 | 9.8
  "css/filters/backdrop-blur/backdrop-blur.css", // 9 | 9.9
  "css/filters/backdrop-brightness/backdrop-brightness.css", // 9 | 9.10
  "css/filters/backdrop-contrast/backdrop-contrast.css", // 9 | 9.11
  "css/filters/backdrop-grayscale/backdrop-grayscale.css", // 9 | 9.12
  "css/filters/backdrop-hue-rotate/backdrop-hue-rotate.css", // 9 | 9.13
  "css/filters/backdrop-invert/backdrop-invert.css", // 9 | 9.14
  "css/filters/backdrop-opacity/backdrop-opacity.css", // 9 | 9.15
  "css/filters/backdrop-saturate/backdrop-saturate.css", // 9 | 9.16
  "css/filters/backdrop-sepia/backdrop-sepia.css", // 9 | 9.17
  "css/tables/border-collapse/border-collapse.css", // 10 | 10.1
  "css/tables/border-spacing/border-spacing.css", // 10 | 10.2
  "css/tables/table-layout/table-layout.css", // 10 | 10.3
  "css/tables/caption-side/caption-side.css", // 10 | 10.4
  "css/transforms/scale/scale.css", // 11 | 11.1
  "css/transforms/rotate/rotate.css", // 11 | 11.2
  "css/transforms/translate/translate.css", // 11 | 11.3
  "css/transforms/skew/skew.css", // 11 | 11.4
  "css/transforms/transform-origin/transform-origin.css", // 11 | 11.5
  "css/interactivity/accent-color/accent-color.css", // 12 | 12.1
  "css/interactivity/appearance/appearance.css", // 12 | 12.2
  "css/interactivity/cursor/cursor.css", // 12 | 12.3
  "css/interactivity/caret-color/caret-color.css", // 12 | 12.4
  "css/interactivity/pointer-events/pointer-events.css", // 12 | 12.5
  "css/interactivity/resize/resize.css", // 12 | 12.6
  "css/interactivity/scroll-behavior/scroll-behavior.css", // 12 | 12.7
  "css/interactivity/scroll-margin/scroll-margin.css", // 12 | 12.8
  "css/interactivity/scroll-padding/scroll-padding.css", // 12 | 12.9
  "css/interactivity/scroll-snap-align/scroll-snap-align.css", // 12 | 12.10
  "css/interactivity/scroll-snap-stop/scroll-snap-stop.css", // 12 | 12.11
  "css/interactivity/scroll-snap-type/scroll-snap-type.css", // 12 | 12.12
  "css/interactivity/touch-action/touch-action.css", // 12 | 12.13
  "css/interactivity/user-select/user-select.css", // 12 | 12.14
  "css/interactivity/will-change/will-change.css", // 12 | 12.15
  "css/svg/fill/fill.css", // 13 | 13.1
  "css/svg/stroke/stroke.css", // 13 | 13.2
  "css/svg/stroke-width/stroke-width.css", // 13 | 13.3
  "css/accessibility/screen-reader/screen-reader.css", // 14 | 14.1
  "css/accessibility/forced-color-adjust/forced-color-adjust.css", // 14 | 14.2
];

cssFiles.forEach((file) => {
  const cssContent = fs.readFileSync(path.join(__dirname, file), "utf8");
  mainCSS += cssContent;
  mainCSS += generateBreakpoints(cssContent, config.breakpoints);
});

// Write the generated CSS to output.css
fs.writeFileSync("output.css", mainCSS);

console.log("CSS build completed successfully.");
