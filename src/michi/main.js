import commonStyle from "scss/common.scss"
import style from './style.scss';

import OAuth from "js/OAuth";
import o from "js/common";
OAuth();

var can = o.$("#can");
var ctx = can.getContext("2d");

setFrameLoop(500);
function render(){
    ctx.setTransform(1,0,0,1,0,0);
    ctx.clearRect(0,0,o.winw,o.winh);
    ctx.font = "48px serif";
    ctx.fillStyle = "orange";
    ctx.fillText((+new Date())+"",0,o.winh/2);
}

function setFrameLoop(setInterVal){
    var start = +new Date();
    var now = 0;
    animLoop();
    function animLoop(){
        now = +new Date();
        if(now - start > setInterVal){
            start = now;
            render();
        }
        requestAnimationFrame(animLoop);
    }
}

o.setCanSize(can,o.winw,o.winh,1);

