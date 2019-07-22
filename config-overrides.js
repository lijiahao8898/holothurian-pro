const {
    override,
    fixBabelImports,
    addLessLoader,
    addWebpackAlias,
    overrideDevServer
} = require('customize-cra');
const path = require('path');
const addProxy = proxy => config => {
    config.proxy = proxy;
    return config;
};

module.exports = {
    webpack: override(
        fixBabelImports('import', {
            libraryName: 'antd',
            libraryDirectory: 'es',
            style: true,
        }),
        addLessLoader({
            javascriptEnabled: true,
            modifyVars: {
                '@primary-color': '#1088ae',
                '@layout-header-height': '52px',
                '@layout-header-padding': '0 10px',
                '@border-radius-base': '8px',
                '@table-padding-vertical': '8px',
                '@table-padding-horizontal': '8px'
            },
        }),
        addWebpackAlias({
            '@': path.resolve(__dirname, './src')
        })
    ),
    devServer: overrideDevServer(
        addProxy({
            "/api": {
                "target": "",
                "changeOrigin": true,
                "pathRewrite": {
                    "^/api": ""
                }
            },
        })
    ),
};
