import fs from "fs";
import { config } from "../../config.js";

// Function to generate HSL colors
function generateHSL(colorKey, saturation, lightness) {
  return `hsl(var(--clr-${colorKey}-hue), ${saturation}%, ${lightness}%)`;
}

// Function to generate CSS root variables
function generateCSSRootVariables() {
  let css = ":root {\n";

  // Iterate through each color defined in config
  Object.keys(config.colors).forEach((colorKey) => {
    const colorConfig = config.colors[colorKey];

    // Generate CSS variable for hue
    css += `  --clr-${colorKey}-hue: ${colorConfig.hue};\n`;

    // Generate HSL values for each lightness level
    Object.keys(colorConfig.lightnessValues).forEach((lightnessKey) => {
      const lightness = colorConfig.lightnessValues[lightnessKey];
      const saturation = colorConfig.saturationValues[lightnessKey];
      const variableName = `--clr-${colorKey}-${lightnessKey}`;

      // Generate CSS variable assignment
      css += `  ${variableName}: ${generateHSL(
        colorKey,
        saturation,
        lightness
      )};\n`;
    });

    // Add a blank line for separation between colors
    css += "\n";
  });

  css += "}\n";

  return css;
}

// Generate CSS root variables
const cssVariables = generateCSSRootVariables();

// Write CSS variables to file
fs.writeFileSync("css/colors/root.css", cssVariables);
