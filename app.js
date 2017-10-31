/**
 * Created by 徐晓龙 on 2017/8/10.
 */
// 文件入口，控制中心
var express = require("express");
var app = express();
var router = require("./controller");    // 引入路由页面
app.set("view engine","ejs");        // 设置模板引擎
// 进行静态页面展示,一般放在public文件下,可以给它一个根路径
app.use(express.static("./public"));

// 由于要访问底部的文件，所以还得将uploads文件夹路由出来
app.use(express.static("./uploads"));
app.get("/",router.showIndex );  // 这里这个函数不用带参数，回调已经传参数过去

// 根据文件夹展示里面所有的图片
app.get("/:album",router.showAlumn )

// 当出现错误的时候呈现错误页面,路由中间件
app.use(function (req,res) {
    res.render("err");
});
app.listen(3000);