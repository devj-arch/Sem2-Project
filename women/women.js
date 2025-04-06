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


function createCard(pic1, pic2, pic3, pic4, pic5, pic6, pic7, title, price, id) {
    const p = [pic1, pic2, pic3, pic4, pic5, pic6, pic7].filter(Boolean); // Clean array
    let index = 0;
    let intervalId;

    const div = document.createElement("div");
    div.classList.add("outfits1");

    const imageId = `image-${id}-${Math.random().toString(36).substring(2, 8)}`; // Unique ID

    div.innerHTML = `
        <div class="outfits1-in" onclick="redirectToProduct('${id}')">
        <div class="out" >
            <img id="${imageId}" class="shirts" src="${p[0]}" alt="">
            </div>
            <img src="save.png" alt="" onclick="save()" class="save">
            <div class="box2">
                <div class="title"><p>${title}</p></div>
                <div class="price"><h2 class="price1">₹${price}</h2></div>
            </div>
        </div>
    `;

    const imageEl = div.querySelector(`#${imageId}`);

    // Start cycling on hover
    div.addEventListener("mouseenter", () => {
        if (p.length > 1) {
            intervalId = setInterval(() => {
                index = (index + 1) % p.length;
                imageEl.classList.add("fade-out");
                setTimeout(() => {
                    imageEl.src = p[index];
                    imageEl.classList.remove("fade-out");
                    imageEl.classList.add("fade-in");
                }, 150);
                setTimeout(() => imageEl.classList.remove("fade-in"), 300);
            }, 1500);
        }
    });

    // Reset on mouse leave
    div.addEventListener("mouseleave", () => {
        clearInterval(intervalId);
        index = 0;
        imageEl.src = p[0];
    });

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
    window.open(`../product/p.html?id=${productId}`, '_blank'); 
}



// createCard("men1.png","new black tshirt by EDGE|trending tshirts  new black tshirt by EDGE|trending tshirt",200);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);
// createCard("men2.png","new tshirt BY edge",1300);


async function fetchProducts() {
  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/products?category=W`);
      const products = await response.json();

      console.log("Fetched Products:", products);

      // Looping through products and creating cards
      products.forEach(product => {
        createCard(product.image1, product.image2, product.image3, product.image4, product.image5, product.image6, product.image7, product.name, product.price,product._id);
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
