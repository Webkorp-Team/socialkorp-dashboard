import initResponsiveToolkit from 'styled-components-responsive-toolkit';
import cssReset from 'css-config/css-reset';
import viewport from 'css-config/viewport';
import fonts from 'css-config/fonts';
import mediaQueries from 'css-config/media-queries';

const {
  GlobalStyles: _GlobalStyles,
  plugins: _plugins,
} = initResponsiveToolkit({
  cssReset,
  viewport,
  fonts,
  mediaQueries,
}); 


export const GlobalStyles = _GlobalStyles;
export const plugins = _plugins;
