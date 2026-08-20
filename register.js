const FullName=document.getElementById("fullname");
const password=document.getElementById("password");
const username=document.getElementById("username");
const email=document.getElementById("email");
const ConfirmPassword=document.getElementById("confirm-password");
const reg= document.getElementById("reg");

reg.addEventListener("click",register);

async function register(e)
{
if(e) e.preventDefault();
if(password.value!==ConfirmPassword.value)
{
    alert("Password and Confirm Password do not match");
    return;
}
 
const response = await fetch("/register",
    {
        method:"POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            fullname:FullName.value,
            username:username.value,
            password:password.value,
            email:email.value,

        }),
    });
    const status= await response.json();
     if (status.success)
     {
        alert("new user created");
        console.log("new user created");
        window.location.href="index.html";
     }
     else
     {
        alert("user already exists");
     }
}