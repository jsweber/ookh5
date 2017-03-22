import o from "js/common";
class Dan{
    constructor($dom,moveTime,text,isMyself){
        //dom的data-ready属性  0：待命可以出发了;1: 开始运动
        this.$dom = $dom;
        this.moveTime = moveTime;
        this.text = text;
        this.$dom.html(text);
        this.isMyself = isMyself || false;
        if("true" === JSON.stringify(this.isMyself)){
            this.$dom.css("color","#ff9595");
        }else{
            this.$dom.css("color","#fff");
        }
    }
    move(cb){
        //当dom已经准备好了可以就可以动了，没有的话就排队
        var self = this;
        if(this.$dom.attr("data-ready") == 0){
            // console.log(self.text+":start",self.$dom.attr("data-ready"));
            self.$dom.attr("data-ready",1);
            self.$dom.css({
                transition:`all ${this.moveTime}s cubic-bezier(.01,.22,.97,.65)`,
                transform:`translate3d(${-(self.$dom[0].clientWidth+o.winw)}px,0,0)`
            });
        }

        self.$dom.on("webkitTransitionEnd.end",function(){
            $(self.$dom).off(".end");
            // console.log(self.text+":end",self.$dom.attr("data-ready"));
            self.$dom.css({
                transition:"none",
                transform:"translate3d(16rem,0,0)"
            });
            self.$dom.attr("data-ready",0);
            cb && cb();
        });
    }
}

export default Dan;