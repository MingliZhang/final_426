import {getUser} from '../postbox/getUser.js'

$(async function () {
    let user = await getUser();
    let userName = user.userName;
    $('#title').append(`<h2>${userName}</h2>`)

    $('#root').append(`<button type = "button" class = "button" id = "logoutButton">Log Out</button>`)
    $('#logoutButton').on('click', handleLogOut);
});

const handleLogOut = function(){
    deleteCookie('info')
    window.location.href = "../index.html";
};