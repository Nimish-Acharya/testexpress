const password=document.getElementById("password");
const username=document.getElementById("username");
const btn=document.getElementById("btn");

btn.addEventListener("click", login);

async function login(e) 
{
    if (e) e.preventDefault();

    const response = await fetch("/CheckCred", 
    {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
        }),
    });

    const status = await response.json();

    if (status.success) {
        window.location.href = "index.html";
    } else {
        alert("Invalid credentials");
    }
}
