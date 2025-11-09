document.getElementById("signupForm").addEventListener("submit", function(event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const msg = document.getElementById("successMessage");

  if (!name || !email || !password || !confirmPassword) {
    alert("Please fill all required fields.");
    return;
  }

  // Check password match
  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  msg.style.display = "block";     // show the message

  // Optional: hide it again after 3 seconds
  setTimeout(() => {
    msg.style.display = "none";
  }, 3000);

    // Clear form fields
  document.getElementById("signupForm").reset();
});
