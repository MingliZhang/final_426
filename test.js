$(function () {
    const $root = $("#root");
    console.log(window.location.search);
    console.log(window.location.href);
    let urlParams = new URLSearchParams(window.location.search);
    let email = urlParams.get("email");
    let password = urlParams.get("password");
    $root.append(`<p>The email is: ${email}</p>`);
    $root.append(`<p>The password is: ${password}</p>`);
});