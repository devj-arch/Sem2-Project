document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("active");
});

function createCard(image,price,save){
    let div = document.createElement("div");
    div.classList.add("outfits1");

    div.innerHTML = `
        <img class="shirts" src="${image}" alt="">
       <button class="saveun" id="saveUnsave">
           </button>
        <img src="${save}" alt="" class="save">
        <h2 class="price1">${price}</h2>
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



createCard("men2.png",1300,"save.png");
createCard("men2.png",1300,"save.png");
createCard("men2.png",1300,"save.png");
createCard("men2.png",1300,"save.png");
createCard("men2.png",1300,"save.png");
