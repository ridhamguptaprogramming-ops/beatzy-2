const ADMIN_PASSWORD = "1234"; // change this

function login(){
  const pass = document.getElementById("password").value;

  if(pass === ADMIN_PASSWORD){
    localStorage.setItem("adminLoggedIn","true");
    window.location.href = "admin.html";
  }else{
    document.getElementById("error").textContent = "Wrong password ❌";
  }
}
