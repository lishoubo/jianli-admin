var path = require('path'),
    webpack = require('webpack');

module.exports = {
    entry: {
        staff: './src/app/pages/staff/staff.js',
        baike: './src/app/pages/baike/baike.js',
        journal: './src/app/pages/journal/journal.js',
        building: './src/app/pages/building/building.js'
    },
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/assets/',
        filename: 'js/[name].page.js'
    },
    module: {
        loader: [
            {
                test: /\.css$/,
                include: [
                    path.resolve(__dirname, "src/app")
                ],
                //配置css的抽取器、加载器。'-loader'可以省去
                loader: ['style-loader', 'css-loader?sourceMap']
            },
            {
                //html模板加载器，可以处理引用的静态资源，默认配置参数attrs=img:src，处理图片的src引用的资源
                //比如你配置，attrs=img:src img:data-src就可以一并处理data-src引用的资源了，就像下面这样
                test: /\.html$/,
                include: [
                    path.resolve(__dirname, "src/app")
                ],
                loader: "html?attrs=img:src img:data-src"
            },
            {
                //文件加载器，处理文件静态资源
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            },
            {
                //图片加载器，雷同file-loader，更适合图片，可以将较小的图片转成base64，减少http请求
                //如下配置，将小于8192byte的图片转成base64码
                test: /\.(png|jpg|gif)$/,
                include: [
                    path.resolve(__dirname, "src/app")
                ],
                loader: 'url-loader?limit=8192&name=./img/[hash].[ext]'
            }
        ]
    }
};