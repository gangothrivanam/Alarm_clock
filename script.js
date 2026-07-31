const currentTime = document.querySelector("h1");
const content = document.querySelector(".content");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("button");
const ringtone = document.getElementById("ringtone");

let alarmTime,
isAlarmSet = false;

// Hours
for(let i=12;i>0;i--){
    i=i<10?"0"+i:i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[0].firstElementChild;
    selectMenu[0].insertAdjacentHTML("beforeend",option);
}

// Minutes
for(let i=59;i>=0;i--){
    i=i<10?"0"+i:i;
    let option=`<option value="${i}">${i}</option>`;
    selectMenu[1].insertAdjacentHTML("beforeend",option);
}

// AM PM
["AM","PM"].forEach(period=>{
    let option=`<option value="${period}">${period}</option>`;
    selectMenu[2].insertAdjacentHTML("beforeend",option);
});

setInterval(()=>{

    let date=new Date();

    let h=date.getHours();
    let m=date.getMinutes();
    let s=date.getSeconds();

    let ampm="AM";

    if(h>=12){
        ampm="PM";
        h=h-12;
    }

    if(h==0){
        h=12;
    }

    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;

    currentTime.innerText=`${h}:${m}:${s} ${ampm}`;

    if(alarmTime==`${h}:${m} ${ampm}`){
        ringtone.play();
        ringtone.loop=true;
    }

},1000);

function setAlarm(){

    if(isAlarmSet){
        alarmTime="";
        ringtone.pause();
        setAlarmBtn.innerText="Set Alarm";
        content.classList.remove("disable");
        return isAlarmSet=false;
    }

    let time=`${selectMenu[0].value}:${selectMenu[1].value} ${selectMenu[2].value}`;

    if(time.includes("Hour") || time.includes("Minute") || time.includes("AM/PM")){
        return alert("Please select a valid time!");
    }

    alarmTime=time;
    isAlarmSet=true;
    content.classList.add("disable");
    setAlarmBtn.innerText="Clear Alarm";

}

setAlarmBtn.addEventListener("click",setAlarm);