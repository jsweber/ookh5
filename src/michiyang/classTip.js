import o from "js/common";
class Tip{
    constructor(dom,moveTime,text){
        this.state=0;  //0：待命可以出发了;1: 开始运动
        this.dom = dom;
        this.moveTime = moveTime;
        this.text = text;
        this.dom.innerHTML = text;
    }
    move(cb){
        var self = this;
        if(this.state == 0){
            console.log(this.text+":start");
            this.state=1;
            this.dom.style.webkitTransition = `all ${this.moveTime}s`;
            this.dom.style.transition = `all ${this.moveTime}s`;
            this.dom.style.webkitTransform = `translate3d(${-(this.dom.clientWidth+o.winw)}px,0,0)`;
            this.dom.style.transform = `translate3d(${-(this.dom.clientWidth+o.winw)}px,0,0)`;
        }

        $(this.dom).on("webkitTransitionEnd.end",function(){
            $(self.dom).off(".end");
            console.log(self.text+":end");
            if(self.state==1){
                self.dom.style.webkitTransition = "none";
                self.dom.style.transition = "none";
                self.dom.style.webkitTransform = "translate3d(18rem,0,0)";
                self.dom.style.transform = "translate3d(18rem,0,0)";
                self.state=0;
                cb && cb();
            }
        });
    }
}

export default Tip;