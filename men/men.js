let bgs=["men.png","edgebanner.png","banner1.png","banner2.png"];
let i=0;
function bannerScroll(){
i=(i+1)%bgs.length;
document.getElementById("banner").src=bgs[i];
};
setInterval(bannerScroll,2000);
function forw(){
    i=(i+1)%bgs.length;
    document.getElementById("banner").src=bgs[i];
    clearInterval

};


function back(){
    i=(i-1 + bgs.length)%bgs.length;
    document.getElementById("banner").src=bgs[i];
};

function createCard(image,title,price,id){
    let div = document.createElement("div");
    div.classList.add("outfits1");

    div.innerHTML = `
    <div class="outfits1" onclick="redirectToProduct('${id}')">
        <img src="${image}" class="img-fluid" alt="product_image">
       <button class="saveun" id="saveUnsave">
           </button>
        <img src="save.png" alt="" class="save">
        <div class="box2">
<div class="title">
<p>${title}</p>
</div>
<div class="price">
<h2 class="price1">₹${price}</h2>
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
function redirectToProduct(productId) {
    console.log("Redirecting to product page with ID:", productId);
    window.location.href = `../product/p.html?id=${productId}`;  // Correct path
}



// createCard("men1.png","new black tshirt by EDGE|trending tshirts  new black tshirt by EDGE|trending tshirt",200);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);


async function fetchProducts() {
  try {
      const response = await fetch("https://edge-clothing.onrender.com/products?category=M");
      const products = await response.json();

      console.log("Fetched Products:", products);

      // Looping through products and creating cards
      products.forEach(product => {
          createCard(product.image1, product.name, product.price,product._id);
      });
  } catch (error) {
      console.error("Error fetching products:", error);
  }
}

fetchProducts();
