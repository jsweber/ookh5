import style from './style.scss';

$(".box").on("click",function(){
    $(this).css({
        transition:"1s all",
        transform:"scale(0.3)"
    });
});
