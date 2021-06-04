const fontsInUse = [
  {
    family: 'Montserrat',
    alternative: 'sans-serif',
    weights: [300,400,700],
    italicWeights: [],
  },
  {
    family: 'Poppins',
    alternative: 'sans-serif',
    weights: [200,300,400,700],
    italicWeights: [],
  },
  {
    family: 'Source Serif Pro',
    alternative: 'serif',
    weights: [],
    italicWeights: [400],
  },
];


const primaryFontFamily = `'${fontsInUse[0].family}', ${fontsInUse[0].alternative}`;
const secondaryFontFamily = `'${fontsInUse[1].family}', ${fontsInUse[1].alternative}`;

const defaultFontFamily = primaryFontFamily;
const defaultFontWeight = 400;

module.exports = {
  fontsInUse,
  primaryFontFamily,
  secondaryFontFamily,
  defaultFontFamily,
  defaultFontWeight,
};
