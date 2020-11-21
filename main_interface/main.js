
var socket = undefined;
$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();  
  
});

function buildConnection(){
  socket = io();
  socket.on('message', message=>{
    console.log(message)
  })

  socket.on('chatMessage', message=>{
    renderOthers(message);
  })

}


$('.textarea').keydown(function (e) {

  if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey){
    const value = event.target.value;
    socket.emit('chatMessage', value);
    render(value);
    event.target.value='';
    event.target.focus();
  }
});

function showChat(){
  $('#black_shadow').css('visibility', 'visible');
  $('#black_shadow').css('visibility', 'visible');
  var temp = $('#chatWindow');
  temp.css('visibility', 'visible');
  buildConnection();
  let chat_ul = document.getElementById('chat-ul')
  //need to load history
  chat_ul.scrollTop = chat_ul.scrollHeight;
}

function leave(){
  socket.disconnect();
  $('#black_shadow').css('visibility', 'hidden');
  $('#chatWindow').css('visibility', 'hidden')
  socket = undefined;
}

function leave2(){
  $('#black_shadow').css('visibility', 'hidden');
  $('#add_fri_window').css('visibility', 'hidden')
}

async function showAddFriend(){
  $('#black_shadow').css('visibility', 'visible');
  $('#add_fri_window').css('visibility', 'visible');
  const result = await axios({
    method: "get",
    url: "https://us-central1-comp426-firebase.cloudfunctions.net/users"
  });
  localUsers.splice(0,localUsers.length)
  result.data.map(user=>{
    localUsers.push({id: user.id, username: user.userName})
  })
}

function addFri(){
  $('#fri_input').val('');
  $('#search_res').empty();
  leave2();
}

function render(msg){
  $('#chat-ul').append(`<li class = "me">${msg}</li>`);
  let chat_ul = document.getElementById('chat-ul')
  chat_ul.scrollTop = chat_ul.scrollHeight;
}

function renderOthers(msg){
  $('#chat-ul').append(`<li class = "him">${msg}</li>`);
  let chat_ul = document.getElementById('chat-ul')
  chat_ul.scrollTop = chat_ul.scrollHeight;
}