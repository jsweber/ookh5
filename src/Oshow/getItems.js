function getItems(index=1, cb,pages=8) {
    $.ajax({
        url: `http://ooklady.com:8418/public/ook/item/shareList?pageIndex=${index}&pageSize=${pages}`,
        dataType: "json",
        type: "get",
        success(res) {
            if (200 === res.code) {
                cb && cb(null,res.data);
            } else {
                cb && cb(new Error("应用层错误"),[]);
            }
        },
        error(err) {
            cb && cb(err,[]);
        }
    });
}

export default getItems;