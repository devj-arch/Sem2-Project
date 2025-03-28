document.addEventListener("DOMContentLoaded", async function () {
  try {
      // const response = await fetch("/cart"); // Fetch cart data from backend
      const response = await fetch(`${CONFIG.BACKEND_URL}/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // body: JSON.stringify({ email, password }),
        credentials: "include",
    });

      const cartData = await response.json(); // Convert response to JSON

      const cartItemsContainer = document.getElementById("cart-items");
      const cartTotal = document.getElementById("cart-total");
      const cartCount = document.getElementById("cart-count");

      cartItemsContainer.innerHTML = ""; // Clear existing items
      let totalAmount = cartData.cartTotal;

      console.log('cartData: ', cartData);
      cartData.cart.forEach(({ productId: item }) => {
        console.log('item: ', item);

          const li = document.createElement("li");
          li.className = "list-group-item d-flex justify-content-between lh-sm";
          li.innerHTML = `
              <div>
                  <h6 class="my-0">${item.name}</h6>
                  <small class="text-body-secondary">${item.description}</small>
              </div>
              <span class="text-body-secondary">$${item.price}</span>
          `;
          cartItemsContainer.appendChild(li);
      });

      // Update total and item count
      cartTotal.textContent = `$${totalAmount}`;
      cartCount.textContent = cartData.items.length;
  } catch (error) {
      console.error("Error fetching cart data:", error);
  }
});
