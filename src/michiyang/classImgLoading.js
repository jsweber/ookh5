class ImgLoading{
    //传入包裹图片的父元素
    constructor(wrapper){
        this.allImgs = null;
        this.wrapper = null;

        if(typeof wrapper === "string"){
            this.wrapper = document.querySelector(wrapper);
        }else if(typeof wrapper === "object" && wrapper.innerHTML){
            this.wrapper = wrapper;
        }

        this.allImgs = this.wrapper.getElementsByTagName("img");
    }
    loading(cb){
        let sum = this.allImgs.length;
        let self = this;
        let count = 0;
        if(!this.allImgs || sum === 0){
            console.error("ImgLoading don not get imgs!");
        }
        

        for(let i = 0;i<sum;i++){
            let imgObj = new Image();
            imgObj.onload = function(){
                count++;
                cb && cb(count,sum);
            }

            imgObj.onerror = function(){
                console.error("img load error");
            }
            imgObj.src = this.allImgs[i].src;
        }
    }

}
export default ImgLoading;


