if (process.env.NODE_ENV !== 'production') {
/** 
  Dev Mode
*/
  module.exports = {
    plugins: [
      require('postcss-import')(),
      require('postcss-preset-env')({
        browsers: 'last 2 versions',
        stage: 1,
        features: {
          'color-mod-function': {
            unresolved: 'warn'
          },
          'custom-properties': {
            preserve: true
          },
          'nesting-rules': true
        }
      })
    ]
  }
} else {
/** 
  Production Mode
*/
  module.exports = {
    plugins: [
      require('postcss-import')(),
      require('postcss-preset-env')({
        browsers: 'last 2 versions',
        stage: 1,
        features: {
          'color-mod-function': {
            unresolved: 'warn'
          },
          'custom-properties': {
            preserve: false
          },
          'nesting-rules': true
        }
      }),
      require('cssnano')({
        autoprefixer: false
      })
    ]
  };  
}
