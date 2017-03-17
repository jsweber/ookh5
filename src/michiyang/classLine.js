class Line{
    constructor(){
        this.data = [];
    }
    add(val){
        this.data.push(val);
    }
    get(){
        return this.data.shift();
    }
    remove(){
        this.data.shift();
    }
    len(){
        return this.data.length;
    }
    concat(arr){
        this.data = this.data.concat(arr);
    }
    show(){
        var arr = [];
        this.data.forEach((v)=>{
            arr.push(v.message);
        })

        arr.forEach((v)=>{
            console.log("数据："+v);
        });
    }
}
export default Line;