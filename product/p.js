let p=["./pics/p1.png","./pics/p2.png","./pics/p3.png","./pics/p4.png","./pics/p5.png","./pics/p6.png","./pics/p7.png"];
let i=0;
let swipei=setInterval(swipe,2000);
let timeoutId;
function swipe(){
    i=(i+1)%p.length;
    document.getElementById("pics").src=p[i];
};

function opentab(add){
    window.open(add, "_blank");
};
function op(add){
    clearInterval(swipei)
    document.getElementById("pics").src=add;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
        clearInterval(swipei); // Clear any previous interval before restarting
        swipei = setInterval(swipe, 2000); // Restart fresh interval
    }, 5000);
};