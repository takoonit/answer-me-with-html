// The fonts a theme file may name with its `font` field. Data only, with no Node imports, so the theme check also runs in the
// browser engine; font-css.js reads the font files and builds the page styles.
// name -> the font family, the file inside its package, and the notice the page carries next to the data.
export const FONTS = Object.freeze({
  bangers: {
    family: 'Bangers',
    file: '@fontsource/bangers/files/bangers-latin-400-normal.woff2',
    notice: 'Bangers, Copyright 2010 The Bangers Project Authors (https://github.com/googlefonts/bangers), SIL Open Font License 1.1 (https://openfontlicense.org)',
  },
  // A variable font: the Latin subset with the weight and roundness (ROND) axes, about 70 KB.
  'google-sans-flex': {
    family: 'Google Sans Flex',
    file: '@fontsource-variable/google-sans-flex/files/google-sans-flex-latin-rond-normal.woff2',
    weight: '1 1000',
    notice: 'Google Sans Flex, Copyright 2015 Google LLC (https://github.com/googlefonts/googlesans-flex), SIL Open Font License 1.1 (https://openfontlicense.org)',
  },
});

export const FONT_NAMES = Object.freeze(Object.keys(FONTS));
