var path = require('path');
// var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    //file đầu vào (file chúng ta muốn đóng gói)
    entry: {
       // Tên đại diện : đường dẫn tới file
       index: './js/index.js',
        chitiet: './js/chitiet.js'
    },
    //đầu ra (vị trí của các file được đóng gói)
    output: {
        //ở cùng cấp với webpack.config.js , tạo ra 1 folder dist để chưa file đóng gói
        path: path.resolve(__dirname,'dist'),
        // tên file được đóng gói,
        //bên trong dist, tạo ra 1 folder js, trong folder js sẽ có file
        // bundle.js
        filename:'js/[name].js'
    },
    // devtool: 'source-map',
    module: {
        rules: [
            {
                //kiểm tra nếu trong file đóng gói có css
                test: /\.css$/,
                //sử dụng 2 loader để đóng gói
                use: ['style-loader', 'css-loader']
            },
            // {
            //     test:/\.ts$/,
            //     use:['ts-loader']
            // }, 
            {
                test: /\.scss$/,
                loader: ['style-loader','css-loader', 'sass-loader']
            },
            // {
            //     test:/\.html$/,
            //     use:['html-loader']
            // },
            {
                test: /\.(png|jpg|svg)$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        limit: 100,
                        name: '[name].[ext]',
                        outputPath: "img/",
                        publicPath: "img/",
                        // limit: 2000000,
                    }
                }]
            }
        ]
    },
    // plugins:[
    //     new HtmlWebpackPlugin({
    //         filename:'index.html',
    //         template:'./src/app/Views/index.html',
    //         chunks:['index']
    //     }),
    //     new HtmlWebpackPlugin({
    //         filename:'signin.html',
    //         template:'./src/app/Views/signin.html',
    //         chunks:['signin']
    //     }),
    // ],
}