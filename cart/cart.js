function empty(){
    let div=document.createElement("div");
    div.classList.add("empty");
    div.innerHTML=`  <img src="../logos/big_cart.svg">
    <p>Your cart is empty. Add some items to view.</p>
    <div class="cart-actions">
      <button class="cart-btn" onclick="window.location.href='../index.html'">Continue Shopping</button>
    </div>`;
    document.querySelector(".cartempty").appendChild(div);
}
// console.log("From Cart");
// async function fetchCart() {
//   try {
//     const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         // body: JSON.stringify({ email, password }),
//         credentials: "include",
//     });

//     const data = await response.json();
//     console.log('data: ', data);

//     // console.log('response: ', response);
//     if (response.ok) {
//         // localStorage.setItem("username", data.name);
//         // localStorage.setItem("userid", data.userId);
//         // alert("Login successful!");
//         // window.location.href = "../index.html";
//     } else {
//         // alert(data.msg || "Invalid email or password.");
//     }
// } catch (error) {
//     console.error("Error:", error);
//     alert("Something went wrong. Please try again.");
// }
// }
//  fetchCart();
