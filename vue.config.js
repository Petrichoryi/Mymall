const pxtovw = require('postcss-px-to-viewport');

module.exports = {
    configureWebpack:{
        resolve:{
            //配置路径的别名
            alias:{
              'assets':'@/assets',
              'common':'@/common',
              'network':'@/network',
              'components':'@/components',
              'views':'@/views',
              'store':'@/store'

            }
        }
    },
    publicPath:'./',
    assetsDir:'static',
    //移动端的适配
    css:{
        loaderOptions:{
            sass:{
                //给sass-loader传递选项
            },
            css:{
                //给css-loader传递选项
            },
            postcss:{
                //给postcss-loader传递选项
                plugins:[
                    new pxtovw({
                        unitToConvert: 'px', //需要转换的单位，默认为"px"；
					    viewportWidth: 375, //设计稿的视口宽度
                        viewportHeight:667,//视窗的高度，对应设计稿的高度
					    unitPrecision: 5, //单位转换后保留的小数位数
					    viewportUnit: 'vw', //转换后的视口单位
					    fontViewportUnit: 'vw', //转换后字体使用的视口单位
					    selectorBlackList: ['tab-bar-item'], //不进行转换的css选择器，继续使用原有单位
					    minPixelValue: 1, //设置最小的转换数值
					    mediaQuery: false, //设置媒体查询里的单位是否需要转换单位
					    replace: true, //是否直接更换属性值，而不添加备用属性
					    // exclude: [/node_modules/] //忽略某些文件夹下的文件
                    })
                ]
            }
        }
    }

}