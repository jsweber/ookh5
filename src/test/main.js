import style from './style.scss';


start();
async function start(){
    let r = await Promise.resolve("123");
    console.log(r);
}
