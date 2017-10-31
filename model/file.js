/**
 * Created by 徐晓龙 on 2017/8/13.
 */
// model里面的文件是实现复杂逻辑结构的地方，是实现底层的东西
var fs = require("fs");
exports.getAllimg = function( callback ){    // 传入一个回调函数

    /*  用这个方法看似能返回一个预期的数组，但是由于有回调函数，所以在没有拿到数值之前已经返回了数组，致使没有length值  */
    fs.readdir("./uploads",function(err,files){
        var directory = [];   // 定义一个数组用来存放文件夹

        // 创建一个迭代器，读取文件
        (function iterator(i){
            if(i==files.length){
                callback(null, directory );
                return ;   // 用return返回，否则不能函数不能结束
            }
            fs.stat("./uploads/"+files[i],function(err,stats){
                if(err){
                    callback("不能找到文件"+files[i],null);
                }
                if(stats.isDirectory()){
                    directory.push( files[i] );   // 如果是文件夹就放进数组
                }
                iterator(i+1);
            });
        })(0)
    });
}

// 通过文件获取文件里面的图片
exports.getImgbyFilename = function( albumName,callback ){
    fs.readdir("./uploads/"+albumName,function (err,files) {
        if( err ){
            callback("没有找到文件夹",null);
            return;
        }
        var allImg = [];
        (function iterator(i){
            if(i==files.length){
                callback(null, allImg );
                return ;   // 用return返回，否则不能函数不能结束
            }

            // 要带上各层的文件夹
            fs.stat("./uploads/"+albumName+"/"+files[i],function(err,stats){
                if(err){
                    callback("不能找到文件"+files[i],null);
                }
                if(stats.isFile()){
                    allImg.push( files[i] );   // 如果是文件夹就放进数组
                }
                iterator(i+1);
            });
        })(0)
    });
}
