let localUsers = [];

const search = $('#fri_input');
const res = $('#search_res');

// function fillOut(username){
//     search.val(username);
// }

const searchUser = text=>{
    let matches = localUsers.filter(user=>{
        const regex = new RegExp(`^${text}`, 'gi');
        return user.username.match(regex);
    })
    if(matches.length === 0){
        res.empty();
        res.append('<h2 style="font-size: 20px;color: lightgray;">No result. Try refreshing it and search again</h2>')
    } else {
        matches.map(matchUser=>{
            res.append(`<h2 onclick="$('#search_res').empty();$('#fri_input').val('${matchUser.username}')" class="text-primary" style="font-size: 30px;">${matchUser.username}</h2>`)
        })
    }
}

search.on('input', ()=>{
    res.empty();
    if(!search.val()) {
        return;
    }
    searchUser(search.val());
})