let bgs=["men.png","edgebanner.png","banner1.png","banner2.png"];
let i=0;
function bannerScroll(){
i=(i+1)%bgs.length;

  if(document.getElementById("banner")) {
    document.getElementById("banner").src=bgs[i];
  }
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
      const response = await fetch("https://edge-clothing.onrender.com/products?category=W");
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

document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.querySelector("nav div:last-child"); // Get login div

  // Function to update navbar dynamically
  function updateNavbar() {
      const username = localStorage.getItem("username"); // Get stored username
      const accessToken = getCookie("accessToken"); // Check if cookie exists

      if (username || accessToken) {
          loginContainer.innerHTML = `
              <a href="#" id="logoutBtn">
                  <img src="../logos/people.svg" width="24"> ${username || "User"} | Logout
              </a>
              <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a>
          `;
          document.getElementById("logoutBtn").addEventListener("click", logoutUser);
      } else {
          loginContainer.innerHTML = `
              <a href="../login/login.html">
                  <img src="../logos/people.svg" width="24"> Login
                 <!-- <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a> -->
              </a>
          `;
      }
  }

  // Logout function
  async function logoutUser() {
      try{
        const response = await fetch(`${CONFIG.BACKEND_URL}/auth/logout`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
      });

      const data = await response.json();
      console.log('data: ', data);

      if (response.ok) {
          localStorage.removeItem("username");
          localStorage.removeItem("userid");
          window.location.reload(); // Refresh page
      } else {
          alert(data.msg || "Error 😬.");
      }
      }
      catch(err) {
        console.log('err: ', err);
      }
  }

  // Function to get cookies
  function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (let cookie of cookies) {
          const [key, value] = cookie.split("=");
          if (key === name) return value;
      }
      return null;
  }

  updateNavbar(); // Call function on page load
});
