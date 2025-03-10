document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("active");
});
let bgs=["men.png","edgebanner.png","banner1.png","banner2.png"];
let i=0;
function bannerScroll(){
i=(i+1)%bgs.length;
document.getElementById("banner").src=bgs[i];
};
setInterval(bannerScroll,3000);
function createCard(image,title,price){
    let div = document.createElement("div");
    div.classList.add("outfits1");


    div.innerHTML = `
    <div class="outfits1">
        <img class="shirts" src="${image}" alt="">
       <button class="saveun" id="saveUnsave">
           </button>
        <img src="save.png" alt="" class="save">
        <div class="box2">
<div class="title">
<p>${title}</p>
</div>
<div class="price">
<h2 class="price1">$${price}</h2>
</div>
</div>
        </div>
    `;
document.querySelector(".outfits").appendChild(div);

document.querySelector(".outfits").addEventListener("click", function (event) {
    if (event.target.classList.contains("saveun")) {
        let img = event.target.nextElementSibling; 
        if (img && img.classList.contains("save")) {
            img.src = img.src.includes("save.png") ? "saved.png" : "save.png";
            img.style.width="13%";
            img.style.height="10%";
        }
    }
});

}



createCard("men1.png","new black tshirt by EDGE|trending tshirts  new black tshirt by EDGE|trending tshirt",200);
createCard("men2.png","new tshirt BY edge",1300);
createCard("men2.png","new tshirt BY edge",1300);
createCard("men2.png","new tshirt BY edge",1300);
createCard("men2.png","new tshirt BY edge",1300);
