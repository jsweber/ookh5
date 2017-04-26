import style from './style.scss';

function _get(num){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(num);
        },2000);
    });
}

async function sum(){
    let num1 = await _get(10);
    let num2 = await _get(20);
    return num1+num2;
}
sum().then((r)=>{
    console.log(r);
});
