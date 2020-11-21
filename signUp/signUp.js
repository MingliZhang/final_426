// import axios from 'axios';
function ValidateEmail(mail) {
  let mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mail.match(mailformat)) {
    return true;
  } else {
    return false;
  }
}

const handelSignupButtonPress = async function (event) {
  // If I comment the below code out, the auto detection of email and password field goes off. But if I include it, the page will refresh everytime the button is pushed!
  event.preventDefault();
  event.stopPropagation();
  // window.location.href = "../index.html";
  let userName = $("#userName").val();
  let password = $("#hidden").val();
  let email = $("#email").val();
  let psConfirm = $("#hidden2").val();
  const $message = $("#message");
  let message = "";
  let problem = true;

  if (
    userName.length === 0 ||
    password.length === 0 ||
    email.length === 0 ||
    psConfirm.length === 0
  ) {
    message = "Please provide all the needed fields above!!";
  } else if (password !== psConfirm) {
    message = "The two password provided does not match each other!";
    // console.log(password);
    // console.log(psConfirm);
  } else if (!ValidateEmail(email)) {
    message = "Please provide a valid email address!!";
  } else {
    const result = await axios({
      method: "get",
      url: `https://us-central1-comp426-firebase.cloudfunctions.net/users`,
    });
    let data = result.data;
    let searchUserName = data.filter((user) => user.userName === userName);
    let searchEmail = data.filter((user) => user.email === email);
    if (searchUserName.length !== 0) {
      message = "This userName has already been taken! Try another one!";
    } else if (searchEmail.length !== 0) {
      message = "This email has already been registered!";
    } else {
      message = "please wait, we are creating your account!";
      $message.empty();
      $message.append(
        `<p style="font-weight: bold; color:green">${message}</p>`
      );
      const result2 = await axios({
        method: "post",
        url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
        data: {
          userName: userName,
          email: email,
          password: password,
        },
      });
      // This should jump to the personality test page, and it would be loged in already.
      createCookie("info", `${result2.data}, ${userName}, ${email}`);
      problem = false;
      window.location.href = "../questionnaire/index.html";
    }
  }
  if (problem) {
    $message.empty();
    $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
  }
};

$(function () {
  $("#signUpButton").on("click", handelSignupButtonPress);
});
