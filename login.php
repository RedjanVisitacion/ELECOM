
<?php

  session_start();
  include_once 'connection.php';


  // Error handling for connection
  if (!$con) {
    die("Connection failed: " . mysqli_connect_error());
  }

  $con->close();
?>








<!-- login.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
  <title>Login - Voting System</title>
</head>
<body>
  <div class="container py-4">
    <h1 class="text-center mb-4">ELECOM Voting System</h1>

    <div id="roleSelectionForm">
      <h2>Choose Role</h2>
      <div class="d-grid gap-2">
        <button onclick="selectRole('student')" class="btn btn-primary">I am a Student</button>
        <button onclick="selectRole('comelec')" class="btn btn-secondary">I am a COMELEC Officer</button>
      </div>
    </div>

    <div id="loginForm" class="d-none mt-4">
      <h2>Login</h2>
      <input type="text" id="id" class="form-control mb-2" placeholder="Enter ID" />
      <input type="password" id="password" class="form-control mb-2" placeholder="Enter password" />
      <select id="department" class="form-select mb-3">
        <option value="">Select Department</option>
        <option value="IT">IT</option>
        <option value="Food Processing">Food Processing</option>
        <option value="Education">Education</option>
      </select>
      <div class="d-grid gap-2">
        <button onclick="login()" class="btn btn-primary">Login</button>
      </div>
    </div>
  </div>

  <script>
    let role = "";

    function selectRole(selectedRole) {
      role = selectedRole;
      document.getElementById("roleSelectionForm").classList.add("d-none");
      document.getElementById("loginForm").classList.remove("d-none");

      const departmentField = document.getElementById("department");
      departmentField.classList.toggle("d-none", role === "comelec");
    }

    function login() {
      const id = document.getElementById("id").value;
      const password = document.getElementById("password").value;
      const department = document.getElementById("department").value;

      if (!id || !password || (role === 'student' && !department)) {
        alert("Please fill in all fields.");
        return;
      }

      if (password !== "1234") {
        alert("Incorrect password.");
        return;
      }

      const user = {
        role: role,
        id: id,
        department: role === "student" ? department : ""
      };

      localStorage.setItem("currentUser", JSON.stringify(user));
      window.location.href = "voting.html";
    }
  </script>
</body>
</html>
