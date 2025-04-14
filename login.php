<?php
session_start();
include_once 'connection.php';

// Ensure required fields are set
if (!isset($_POST['id'], $_POST['password'], $_POST['role'])) {
  echo json_encode(["success" => false, "message" => "Missing required fields."]);
  exit();
}

$id = $_POST['id'];
$password = $_POST['password'];
$role = $_POST['role'];
$department = isset($_POST['department']) ? $_POST['department'] : null;

// Validate inputs are not empty
if (empty($id) || empty($password) || empty($role)) {
  echo json_encode(["success" => false, "message" => "All fields are required."]);
  exit();
}

// Prepare and execute query
$sql = "SELECT * FROM users WHERE id = ? AND password = ? AND role = ?";
$stmt = $con->prepare($sql);
$stmt->bind_param("sss", $id, $password, $role);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
  $user = $result->fetch_assoc();

  if ($role === "student" && $user['department'] !== $department) {
    echo json_encode(["success" => false, "message" => "Wrong department."]);
  } else {
    $_SESSION['user'] = $user;
    echo json_encode(["success" => true]);
  }
} else {
  echo json_encode(["success" => false, "message" => "Invalid ID, password, or role."]);
}

$stmt->close();
$con->close();
?>


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

      fetch("login.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          id,
          password,
          role,
          department
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const user = {
            role: role,
            id: id,
            department: role === "student" ? department : ""
          };
          localStorage.setItem("currentUser", JSON.stringify(user));
          window.location.href = "voting.html";
        } else {
          alert(data.message || "Login failed");
        }
      })
      .catch(err => {
        alert("Something went wrong.");
        console.error(err);
      });
    }
  </script>
</body>
</html>
