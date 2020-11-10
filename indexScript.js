const handelLoginButtonPress = function(event){
    // If I comment the below code out, the auto detection of email and password field goes off. But if I include it, the page will refresh everytime the button is pushed!
    // event.preventDefault();
    // event.stopPropagation();
    let email = $("#email").val();
    let password = $("#password").val();
    console.log("The email input is : " + email);
    console.log("The password input is : "+ password);
    
    // need to make a call to the backend and find the user id in this case;
    let id = 10;
    // window.location.href = "test.html?email="+email + "&password="+ password;
}

$(function () {
    $("#loginButton").on("click",handelLoginButtonPress)
});