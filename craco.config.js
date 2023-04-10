const { whenProd, getPlugin, pluginByName } = require('@craco/craco')
// whenProd => when production 针对生产环境做处理
// whenProd()第一个参数，在生产环境中，第二个参数，默认值
// whenProd(() => {},[])
const path = require('path')
module.exports = {
  // webpack配置
  webpack: {
    // 配置别名
    alias: {
      // 约定:使用 @ 表示 src 文件所在路径
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      // 生产环境下，配置 externals
      webpackConfig.externals = whenProd(
        () => ({
          react: 'React',
          'react-dom': 'ReactDOM',
          redux: 'Redux',
          'react-router-dom': 'ReactRouterDOM',
        }),
        {}
      )
      // 拿到 HtmlWebpackPlugin 插件
      const { isFound, match } = getPlugin(
        webpackConfig,
        pluginByName('HtmlWebpackPlugin')
      )
      // 生产环境下，暴露 CDN 链接到模板页面中
      if (isFound) {
        // match 表示当前匹配的插件 HtmlWebpackPlugin
        // 通过 options 将额外的数据添加给 HtmlWebpackPlugin 插件
        // options可以传递任意数据，比如，此处我们自己写的 cdn 就是要额外传递的数据
        match.options.cdn = {
          // js 链接
          js: whenProd(
            () => [
              'https://cdn.bootcdn.net/ajax/libs/react/18.2.0/cjs/react-jsx-dev-runtime.production.min.js',
              'https://cdn.bootcdn.net/ajax/libs/react-dom/18.2.0/cjs/react-dom-server-legacy.browser.production.min.js',
              'https://cdn.bootcdn.net/ajax/libs/redux/4.2.1/redux.min.js',
              'https://cdn.bootcdn.net/ajax/libs/react-router-dom/6.10.0/react-router-dom.production.min.js',
            ],
            []
          ),
          // css 链接
          css: [],
        }
      }
      return webpackConfig
    },
  },
}
