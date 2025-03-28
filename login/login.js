function signInWithGoogle() {
    alert("Google Sign-In feature coming soon!");
}

function signInWithInstagram() {
    alert("Instagram Sign-In feature coming soon!");
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
  event.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
      const response = await fetch(`${CONFIG.BACKEND_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
          credentials: "include",
      });

      const data = await response.json();
      // console.log('data: ', data);

      // console.log('response: ', response);
      if (response.ok) {
          localStorage.setItem("username", data.name);
          localStorage.setItem("userid", data.userId);
          alert("Login successful!");
          window.location.href = "../index.html";
      } else {
          alert(data.msg || "Invalid email or password.");
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Please try again.");
  }
});

