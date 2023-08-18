const path = require('path');

module.exports = {
  entry:{ 
    app: './src/index.js'
    }, // Archivo de entrada principal
  output: {
    path: __dirname+'/public/dist', // Directorio de salida
    filename: 'bundle/[name].js', // Nombre del archivo de salida
    sourceMapFilename: 'bundle/[name].map', // Nombre del archivo de sourcemap
    chunkFilename: 'bundle/[name].js' // Nombre de los archivos de los chunks
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Tipos de archivos a procesar
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader', // Utiliza Babel para transpilar JavaScript
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      }
    ]
  }
};
