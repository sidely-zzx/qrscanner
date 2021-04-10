const { resolve } = require('path')

exports.module = {
  server: {
    https: true
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, '/example/index.html'),
      },
    },
    outDir: '/example/dist'
  }
  
}