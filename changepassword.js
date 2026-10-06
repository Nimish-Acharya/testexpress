const CurrPass= document.getElementById("current-pass")
const NewPass= document.getElementById("new-pass");
const ConfirmPass= document.getElementById("confirm-new-pass");
const button=document.getElementById("btn");
 
button.addEventListener("click",  async function(event){
    if(event) event.preventDefault();
    if(NewPass.value!==ConfirmPass.value){
        alert("  new password and confirm password dont match");
        return;
    }
    const jsn= fetch("/CheckCred" );
    const token =jsn.token;

    const response =await fetch("/changepassword",
        {
            method:POST,
            headers:{
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword: CurrPass.value,
                newPassword: NewPass.value,
            })
        }
    )

    

});

