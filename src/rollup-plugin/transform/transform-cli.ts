console.log('\n\n\nTRANSFORM CLI \n\n\n\n\n');

export {}

// import * as fs from "fs";
// import * as path from "path";
// import { argv } from "process";
// import assert from "assert";

// import { Breakpoints } from "../../src//variables/breakpoints";
// import { CanConvertToCss } from "../../src/types/style/CanConvertToCss";
// import { CssContent } from "../../src/types/style/CssContent";
// import { FontDescriptor } from "../../src/types/style/FontDescriptor";
// import { CssMixin } from "../../src/types/style/CssMixin";

// const args = Array.from(argv).slice(2);
// const VARIABLES_FILE = args.length > 0 ? args.shift() : null;
// const OUTPUT_FILE = args.length > 0 ? args.shift() : "output.scss";
// const OUTPUT_FILE_INDENTATION = args.length > 0 ? args.shift() : "  ";

// assert(
//   Boolean(VARIABLES_FILE),
//   "VARIABLES_FILE must be specified as command line argument",
// );

// function capitalizeFirstLetter(s: string): string {
//   if (!s) return s;
//   return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
// }

// function formatCssVariableName(propertyName: string): string {
//   if (propertyName.startsWith("--")) return propertyName;
//   if (propertyName.startsWith("-")) return "-" + propertyName;
//   return "--" + propertyName;
// }

// function formatProperty(propertyName: string, propertyValue: any) {
//   if (propertyValue instanceof CanConvertToCss) {
//     const isCssVariable = !(propertyValue instanceof FontDescriptor);
//     return propertyValue.toCssContent(
//       isCssVariable ? formatCssVariableName(propertyName) : propertyName,
//     );
//   }

//   return `${formatCssVariableName(propertyName)}: ${propertyValue};`;
// }

// function generateFileContent(
//   scssVariables: CssContent,
//   cssVariables: CssContent,
//   mixins: CssContent,
// ) {
//   return `/*
// * DO NOT EDIT THIS FILE MANUALLY
// * TO CHANGE VARIABLES EDIT "src/variables/variables.ts"
// */

// // SCSS variables
// ${scssVariables.compile(OUTPUT_FILE_INDENTATION).join("\n")}

// // CSS variables
// :global(:root) {
// ${cssVariables.compile(OUTPUT_FILE_INDENTATION, 1).join("\n")}
// }

// // mixins
// ${mixins.compile(OUTPUT_FILE_INDENTATION).join("\n")}
// `;
// }

// export function transform() {
//   import(VARIABLES_FILE).then(
//     ({ default: variables }) => {
//       const scssVariables = new CssContent(
//         Array.from(Breakpoints.entries())
//           .filter(([_breakpointName, breakpointSize]) => breakpointSize > 0)
//           .map(
//             ([breakpointName, breakpointSize]) =>
//               `$breakpoint${
//                 capitalizeFirstLetter(breakpointName)
//               }: ${breakpointSize}px;`,
//           ),
//       );

//       const mixins = new CssContent();

//       const cssVariables = new CssContent(
//         Array.from(Object.entries(variables))
//           .map(
//             ([propertyName, propertyValue]) =>
//               formatProperty(propertyName, propertyValue),
//           ),
//       );

//       // extract mixins from cssVariables
//       cssVariables.content = cssVariables.content.filter((item) => {
//         if (item instanceof CssMixin) {
//           mixins.content.push(item);
//           return false;
//         }
//         return true;
//       });

//       fs.writeFileSync(
//         path.resolve(OUTPUT_FILE),
//         generateFileContent(scssVariables, cssVariables, mixins),
//       );

//       console.log(
//         `successfully saved to "${path.relative(process.cwd(), OUTPUT_FILE)}"`,
//       );
//     },
//   ).catch(console.error);
// }

// transform();
