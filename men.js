document.querySelector(".hamburger").addEventListener("click", function() {
    document.querySelector(".menu").classList.toggle("active");
});

function createCard(image,price,save){
   let html=`

    <div class="outfits1">
      
<img class="shirts" src="${image}" alt="">
<img src="${save}" alt="" class="save">
<h2 class="price1">${price}</h2>

</div>` ;
document.querySelector(".outfits").innerHTML+=html
}
createCard("men/men2.png",1300,"men/save.png");
createCard("men/men2.png",1300,"men/save.png");
createCard("men/men2.png",1300,"men/save.png");
createCard("men/men2.png",1300,"men/save.png");
createCard("men/men2.png",1300,"men/save.png");