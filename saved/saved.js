//function saved(){
//  let div=document.createElement("div");
//  div.classList.add("save");
//  div.innerHTML=`

//  `;
// };

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
                  <a href="../checkout.html"><img src="../logos/cart.svg" width="24"></a>
              </a>
          `;
      }
  }


// saved("holaaa",800,"https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSIuwAixARZt7Pfw_19KPLdGzysOCWO9jQcEwEov_k0Zam4tx3yeCXa_qGVeFVUHvGaAt2DAKJtcKRiYQEiug7vCm50cBjqL8O8zh7i71M");
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

function saved(title,price,img){
  console.log('title,price,img: ', title,price,img);
  let div=document.createElement("div");
  div.classList.add("save");
  div.innerHTML=`

   <div class="container">

    <img class="img" src=${img} alt="">

  <div class="right">
    <div class="title">
     ${title}
    </div>
     <div class="price">
  <span style="font-style: italic;">  ${price}</span>
    </div>
  </div>
  <div class="butt">
<button style="width:80%; background-color: rgb(100, 255, 73) ; height:30px; border-radius: 10px; cursor: pointer;" >BUY NOW</button>
<button  style="width:80%; background-color: rgb(204, 251, 52); border-radius: 10px;cursor: pointer;">ADD TO CART</button>
<button  style="width:80%; background-color: rgb(255, 0, 0); border-radius: 10px;cursor: pointer;">REMOVE FROM SAVED</button>
  </div>
  </div>`
  document.querySelector(".saved").append(div);

}

function renderWishlist(wishlist) {

  wishlist.forEach(element => {
    const { name, price, image1 } = element.productId
    saved(name, price, image1)
  }
)
  //   const product = item.productId;

  //   const productCard = document.createElement('div');
  //   productCard.className = 'd-flex mb-4 p-3 border rounded';
  //   productCard.style.backgroundColor = '#1e1e1e';
  //   productCard.style.borderRadius = '15px';

  //   productCard.innerHTML = `
  //     <img class="img me-4" src="${product.image1}" alt="${product.name}" style="width: 150px; height: auto; border-radius: 10px;">
  //     <div class="right flex-grow-1">
  //       <div class="title h5">${product.name}</div>
  //       <div class="price">
  //         <span style="font-style: italic;">₹${product.price}</span>
  //       </div>
  //     </div>
  //     <div class="butt d-flex flex-column justify-content-between">
  //       <button class="btn btn-success mb-2" onclick="window.location.href='../../checkout.html'">BUY NOW</button>
  //       <button class="btn btn-warning mb-2" onclick="addToCart('${product._id}')">ADD TO CART</button>
  //       <button class="btn btn-danger" onclick="removeFromWishlist('${product._id}')">REMOVE FROM SAVED</button>
  //     </div>
  //   `;

  //   container.appendChild(productCard);
  // });
}


async function loadWishlist() {
  try {
    const response = await fetch(`${CONFIG.BACKEND_URL}/wishlist`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include", // Needed for HttpOnly cookie auth
    });
    console.log('response: ', response);

    const result = await response.json();

    console.log('response: ', response);
    if (response.ok) {
      renderWishlist(result.wishlist); // You implement this function
    } else {
      alert(`Error: ${result.message}`);
    }
  } catch (error) {
    console.error("Error fetching wishlist:", error);
    alert("Failed to load wishlist.");
  }
}

loadWishlist();
