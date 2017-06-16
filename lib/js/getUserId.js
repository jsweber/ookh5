function getid(env){
    const op = {
        develop: {
            wx_host: "http://test.ooklady.com",
            app_host: "http://dev.ooklady.com",
            app_id:"wxf49416ed43c7baa8"
        },
        production: {
            wx_host: "http://wx.ooklady.com",
            app_host: "http://ooklady.com:8090",
            app_id:"wx8b33756ca20faafa"
        }
    };
    return new Promise((resolve,reject)=>{
        $.ajax({
            url:`${op[env].wx_host}/wechat/whoami`,
            dataType:"json",
            type:"get",
            success:function(res){
                resolve(res);
            },
            error:function(err){
                reject(err);
            }
        });
    });
}

export default getid;