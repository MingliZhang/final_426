// import axios from 'axios';
function ValidateEmail(mail) {
    let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (mail.match(mailformat)){
        return true;
    }else {
        return false;
    }
}

const handelSignupButtonPress = async function (event) {
    // If I comment the below code out, the auto detection of email and password field goes off. But if I include it, the page will refresh everytime the button is pushed!
    event.preventDefault();
    event.stopPropagation();
    // window.location.href = "../index.html";
    let password = $("#hidden").val();
    let email = $("#email").val();
    let psConfirm = $("#hidden2").val();
    const $message = $("#message");
    if(!email || !password || !psConfirm){
        let message = 'Please provide all the needed fields above!';
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return
    }
    if(psConfirm!==password){
        let message = "The two password provided do not match each other!";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return
    }
    if(!ValidateEmail(email)){
        let message = "Invalid email address!";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return
    }
    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
    })
    let user = result.data.filter(user=>user.email===email)[0];
    if(user){
        let message = 'This email has been used!Try another one.';
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return
    }
    const username = email.split('@')[0];
    const result2 = await axios({
        method: 'post',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users',
        data:{
            "userName" : username,
            "email": email, 
            "password": password
        }
    })
    $('body').append('<h1 style="position: absolute; left : 40%; top: 20%;color: white">Add some message about successful signup</h1>')
    setTimeout(function(){ window.location.href = "../index.html"; }, 1000);
}

$(function () {
    $("#signUpButton").on("click", handelSignupButtonPress);
});