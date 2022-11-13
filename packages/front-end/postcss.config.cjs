module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 37.5,
      propList: ['*'],
      unitPrecision: 5,
      // exclude: ['node_modules'],
    }
  }
}
