const registerForm =
document.getElementById("registerForm");

if (registerForm) {

registerForm.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const username =
document.getElementById("username").value;

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const res = await fetch(
"/api/users/register",
{
method: "POST",
headers: {
"Content-Type":
"application/json"
},
body: JSON.stringify({
username,
email,
password
})
}
);

const data = await res.json();

alert(data.message || "Registered");

window.location =
"login.html";
});
}

const loginForm =
document.getElementById("loginForm");

if (loginForm) {

loginForm.addEventListener(
"submit",
async (e) => {

e.preventDefault();

const email =
document.getElementById("email").value;

const password =
document.getElementById("password").value;

const res = await fetch(
"/api/users/login",
{
method: "POST",
headers: {
"Content-Type":
"application/json"
},
body: JSON.stringify({
email,
password
})
}
);

const data = await res.json();

localStorage.setItem(
"token",
data.token
);

window.location =
"profile.html";

});
}