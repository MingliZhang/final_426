// import axios from 'axios';
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

    const result = await axios({
        method: 'get',
        url: `http://localhost:3000/api/users/${email}`
    })
    let password1 = $("#password1").val();
    let password2 = $("#password2").val();
    
    // need to make a call to the backend and find the user id in this case;
    const $message = $("#message");
    if (result.data.length===0&&email.length !== 0 && password1.length !== 0 && ValidateEmail(email) && password2.length !== 0 && password1 === password2 ){
        axios({
            method: 'post',
            url: 'http://localhost:3000/api/users',
            data: {
                email: email,
                password: password1
            }
        })
        window.location.href = "../index.html";
    }else{
        let message = "";
        if(email.length ===0 || password1.length === 0 || password2.length === 0){
            message = "Please provide all the needed fields above!";
        }else if(! ValidateEmail(email)){
            message = "Please provide a valid email address!";
        }else if(password1 !== password2){
            message = "The two password provided does not match each other!";
        }else if(result.data.length!==0){
            message = "This email has been used!Try another one";
        }else{
            message = "This case is not covered!";
        }
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
    }
}



$(function () {
    $("#signUpButton").on("click", handelLoginButtonPress);
});