function toggleMenu() {
    let navLinks = document.querySelector(".nav-links");
    navLinks.classList.toggle("active");
}
let p=["./pics/p1.png","./pics/p2.png","./pics/p3.png","./pics/p4.png","./pics/p5.png","./pics/p6.png","./pics/p7.png"];
let i=0;
let swipei=setInterval(swipe,3000);
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
        swipei = setInterval(swipe,3000); // Restart fresh interval
    }, 5000);
};
function changebg(n){
    let b=document.getElementsByClassName("s"); 

    for(let i=0;i<b.length;i++){
        if(i!=n-1){
        b[i].style.background="white";
        }
    }

    if(b[n-1].style.background==="red"){  
        b[n-1].style.background="white";
    }
    else{
        b[n-1].style.background="red";
    }
};
