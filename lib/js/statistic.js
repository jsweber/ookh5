 //ook内部统计网页访问数据，不需要回调处理，忽略网络问题
let statistic = (env="develop")=>{
    let url = "http://dev.ooklady.com/public/ook/access"
    if(env === "production"){
        url = "http://ooklady.com:8090/public/ook/access"
    }
    $.post(url, {url: location.href})
}

export default statistic; 