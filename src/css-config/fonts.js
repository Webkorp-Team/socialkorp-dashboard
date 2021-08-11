const fontsInUse = [
  {
    family: 'Roboto',
    alternative: 'sans-serif',
    weights: [300,400,500,600,700],
    italicWeights: [],
  },
  {
    family: 'Material Icons Outlined',
    weights: [400],
    italicWeights: [],
  }
];


const primaryFontFamily = `'${fontsInUse[0].family}', ${fontsInUse[0].alternative}`;
// const secondaryFontFamily = `'${fontsInUse[1].family}', ${fontsInUse[1].alternative}`;

const defaultFontFamily = primaryFontFamily;
const defaultFontWeight = 400;

module.exports = {
  fontsInUse,
  primaryFontFamily,
  // secondaryFontFamily,
  defaultFontFamily,
  defaultFontWeight,
};
