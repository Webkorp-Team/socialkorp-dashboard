const mediaQueries = {
  portrait: '(max-aspect-ratio:1/1)',
  landscape: '(min-aspect-ratio:1/1)',
  mobile: '(max-aspect-ratio:1/1) and (max-width:599px)',
  tablet: '(max-aspect-ratio:1/1) and (min-width:600px)',
  
  retina: 'only screen and (-webkit-min-device-pixel-ratio: 2),only screen and (min-resolution: 192dpi),only screen and (min-resolution: 2dppx)',
  retina_landscape: 'only screen and (min-aspect-ratio: 1/1) and (min-width: 1920px) and (min-height: 950px), only screen and (min-aspect-ratio: 1/1) and (-webkit-min-device-pixel-ratio: 2),only screen and (min-aspect-ratio: 1/1) and (min-resolution: 192dpi),only screen and (min-aspect-ratio: 1/1) and (min-resolution: 2dppx)',
  retina_portrait: 'only screen and (max-aspect-ratio: 1/1) and (-webkit-min-device-pixel-ratio: 2.5),only screen and (min-resolution: 384dpi),only screen and (min-resolution: 2.5dppx)',
};

module.exports = mediaQueries;
