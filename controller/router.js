/**
 * Created by 徐晓龙 on 2017/8/13.
 */

// 从model文件里面引入一个包
var file = require("../model/file.js");

// 定义有关展示的路由页面的函数

exports.showIndex = function(req,res,next){

    // 在getAllimg里面传入一个回调函数
    file.getAllimg(function( err,directory ){
        if(err){
            next();
            return;
        }
        res.render("index",{      // 这样就可以实现文件的动态绑定
            "items":directory
        });
    })
}
exports.showAlumn = function (req,res,next) {
    var albumName = req.params.album;
    file.getImgbyFilename(albumName,function ( err,allImg ) {
        if( err ){
            next();
            return;
        }else{
            res.render("showImg.ejs",{
                "album":albumName,
                "images":allImg
            });
        }
    })
}
