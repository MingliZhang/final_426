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
    let password = $("#hidden").val();
    console.log(password)
    // need to make a call to the backend and find the user id in this case;
    const $message = $("#message");
    if(!email || !password){
        let message = "Please provide all the needed fields above!";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return;
    }

    if(!ValidateEmail(email)){
        let message = "Please provide a valid email address!!";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return;
    }

    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
    });

    user = result.data.filter(user=>user.email === email)[0];
    if(!user) {
        let message = "Wrong email address";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
        return;
    }
    if (user.password===password) {
        window.location.href = `./main_interface/main_interface.html?username=${user.userName}`;
    }else {
        message = "Incorrect password";
        $message.empty();
        $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
    }
}



$(function () {
    $("#loginButton").on("click", handelLoginButtonPress);
});