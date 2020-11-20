

let socket = io();
socket.on('message', message=>{
  console.log(message)
})

socket.on('chatMessage', message=>{
  render(message);
})



$(document).ready(function(){
  $('[data-toggle="tooltip"]').tooltip();  
  
});

$('.textarea').keydown(function (e) {

  if ((event.keyCode == 10 || event.keyCode == 13) && event.ctrlKey){
    const value = event.target.value;
    socket.emit('chatMessage', value);
    
    
    event.target.value='';
    event.target.focus();
  }
});

function showChat(){
  var temp = $('#chatWindow');
  temp.css('visibility', 'visible')
  let chat_ul = document.getElementById('chat-ul')
  //need to load history
  chat_ul.scrollTop = chat_ul.scrollHeight;
}

function leave(){
  $('#chatWindow').css('visibility', 'hidden')
}



function render(msg){
  $('#chat-ul').append(`<li class = "me">${msg}</li>`);
  let chat_ul = document.getElementById('chat-ul')
  chat_ul.scrollTop = chat_ul.scrollHeight;
}