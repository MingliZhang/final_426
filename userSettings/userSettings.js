import {getUser} from '../postbox/getUser.js'

$(async function () {
    let user = await getUser();
    let userName = user.userName;
    let userEmail = user.email
    let userMatchPoint = user.matchPoint
    let userGameScore = user.highestGameScore
    console.log(user)
    $('#title').append(`<h2 class = contents>Username: ${userName}</h2>`)
    $('#title').append(`<h2 class = contents>Email: ${userEmail}</h2>`)
    $('#title').append(`<h2 class = contents>Your Personality Score: </h2>`)
    $('#title').append(`<h2 class = contents>
        extraversion: ${userMatchPoint[0]}
        agreeableness: ${userMatchPoint[0]}
        conscientiousness: ${userMatchPoint[0]}
        emotional_stability: ${userMatchPoint[0]}
        intellect: ${userMatchPoint[0]}
        </h2>`)
    $('#title').append(`<h2 class = contents>Your Highest Game Point: ${userGameScore}</h2>`)

    $('#root').append(`<button type = "button" class = "fas fa-sign-out-alt button  is-danger" id = "logoutButton"> &nbsp Log Out</button>`)
    $('#logoutButton').on('click', handleLogOut);
});

const handleLogOut = function(){
    deleteCookie('info')
    window.location.href = "../index.html";
};