function ValidateEmail(mail) {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mail.match(mailformat)){
        return true;
    }else {
        return false;
    }
}

const handelLoginButtonPress = async function (event) {
    // If I comment the below code out, the auto detection of email and password field goes off. But if I include it, the page will refresh everytime the button is pushed!
    event.preventDefault();
    event.stopPropagation();
    let email = $("#email").val();
    let password = $("#password").val();

    // need to make a call to the backend and find the user id in this case;
    const $message = $("#message");
    
    const result = await axios({
        method: 'get',
        url: `/api/users/${email}`
    })

    if (result.data.length!==0&&result.data[0].password===password&&email.length !== 0 && password.length !== 0 && ValidateEmail(email)) {
        window.location.href = "./main_interface/main_interface.html";
    }else {
        let message = "";
        if(email.length === 0 || password.length === 0){
            message = "Please provide all the needed fields above!";
        }else if (!ValidateEmail(email)){
            message = "Please provide a valid email address!!";
        } else if(result.data.length===0){
            message = "Email not found";
        } else {
            message = "Incorrect password";
        }
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
    }
}



$(function () {
    $("#loginButton").on("click", handelLoginButtonPress);
});