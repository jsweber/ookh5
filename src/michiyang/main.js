import common from 'scss/common.scss'
import style from './style.scss'
import o from "js/common";
import Tip from "./classTip";

let tip = new Tip(o.$(".tip-top")[0],5,"hello");
tip.move();
let tip2 = new Tip(o.$(".tip-middle")[0],10,"world");
tip2.move();
setTimeout(()=>{
    let tip3 = new Tip(o.$(".tip-top")[0],4,"2333");
    tip3.move();
    setTimeout(()=>{
        let tip4 = new Tip(o.$(".tip-top")[0],5,"gold");
        tip4.move();
    },5000);
},8000);




