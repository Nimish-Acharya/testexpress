const password=document.getElementById("password");
const username=document.getElementById("username");
const btn=document.getElementById("btn");

btn.addEventListener("click",login);

async  function login()
{
    await fetch
    ("/CheckCred",{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
        },
        body:JSON.stringify({
            username:username.value,
            password:password.value,

        }),

    });
}