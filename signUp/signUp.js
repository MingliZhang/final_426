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
    console.log(searchUserName);
    console.log(searchEmail);
    if (searchUserName.length !== 0) {
      message = "This userName has already been taken! Try another one!";
    } else if (searchEmail.length !== 0) {
      message = "This email has already been registered!";
    } else {
      const result2 = await axios({
        method: "post",
        url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
        data: {
          userName: username,
          email: email,
          password: password,
        },
      });
      // This should jump to the personality test page, and it would be loged in already.
      window.location.href = "../index.html";
    }
  }
  $message.empty();
  $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
};

$(function () {
  $("#signUpButton").on("click", handelSignupButtonPress);
});

//   if (!email || !password || !psConfirm) {
//     let message = "Please provide all the needed fields above!";
//     $message.empty();
//     $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
//     return;
//   }
//   if (psConfirm !== password) {
//     let message = "The two password provided do not match each other!";
//     $message.empty();
//     $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
//     return;
//   }
//   if (!ValidateEmail(email)) {
//     let message = "Invalid email address!";
//     $message.empty();
//     $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
//     return;
//   }
//   const result = await axios({
//     method: "get",
//     url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
//   });
//   let user = result.data.filter((user) => user.email === email)[0];
//   if (user) {
//     let message = "This email has been used!Try another one.";
//     $message.empty();
//     $message.append(`<p style="font-weight: bold; color:red">${message}</p>`);
//     return;
//   }
//   const username = email.split("@")[0];
//   const result2 = await axios({
//     method: "post",
//     url: "https://us-central1-comp426-firebase.cloudfunctions.net/users",
//     data: {
//       userName: username,
//       email: email,
//       password: password,
//     },
//   });
//   $("body").append(
//     '<h1 style="position: absolute; left : 40%; top: 20%;color: white">Add some message about successful signup</h1>'
//   );
//   setTimeout(function () {
//     window.location.href = "../index.html";
//   }, 1000);
