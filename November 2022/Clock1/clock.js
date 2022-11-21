function clocktime(){
    let date=new Date();
    let hours=date.getHours();
    let min=date.getMinutes();
    let sec=date.getSeconds();
    let dat=date.getDate();
    let day=date.getDay();
    let sjd=date.getFullYear();

    //days array
    var weekDays=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

    let formatT=convertFormat(hours);
    hours=checkTime(hours);
    hours=addZero(hours);
    min=addZero(min);
    sec=addZero(sec);
    var a=5;
    document.getElementById('clock').innerHTML= `${hours} : ${min} : ${sec} ${formatT} <br> ${dat}-`+weekDays[day]+`-${sjd}`;
}
function convertFormat(time){
    let format='AM';
    if(time>=12)
    {
        format='PM';
    }
    return format;
}

function checkTime(time){
    if(time>12)
    {
        time=time-12;
    }
    if(time==0)
    {
        time=12;
    }
    return time;

}

//function set()

function addZero(time){
    if(time<10)
    {
        time="0"+time;
    }
    return time;
}
clocktime();
setInterval(clocktime,1000);