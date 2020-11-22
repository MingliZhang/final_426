import {getUser, getUsers} from './getUser.js'

$(function() {
    loadHeaderIntoDom();
    loadPostsIntoDOM();
});

const renderPost = async function(post) {
    let render = `
    <div class = "post card" id = "post${post.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${post.userName}</h2>
        </div>
        <p class = "body card-content">Welcome to my Mailbox! Please leave any question you have for me!</p>
    `;

    let user = await getUser();

    let bottom  = ``;
    if(user.id == post.id){
        bottom = `        
        <div class = "bottom card-footer">
            <button type = "button" class = "button detail${post.id}">View My Mailbox</button>`;
    }else{
        bottom = `        
        <div class = "bottom card-footer">
            <button type = "button" class = "button detail${post.id}">Details</button>`;
    }

    bottom += `</div>`
    render += bottom;
    render += `</div>`;
    
    return render;        
};

const loadPostsIntoDOM = async function() {
    const $root = $('#root');

    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users',
      });

    const users = result.data;
    for (let i=0; i<users.length;i++){
        // console.log(users[i].userName)
        $root.append(await renderPost(users[i]));
        registerListeners(users[i]);
    };

};

//Load title
const loadHeaderIntoDom = async function(){
    const $title = $(`#title`);


    let postHeader = `
        <div class = "header">
            <h1 class="hero-head">Anonymous Mailbox</h1>
        </div>`;
    $title.append(postHeader)
};


const handleDetailPost = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('detail','');
    // console.log(postid)
    loadDetailPopup(postid);
}

const loadDetailPopup = async function(id){

    const box = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/users/${id}`
    });
    const boxUser = box.data.userName;
    // console.log(boxUser);

    const detailPage = `
        <div class = "container" id = "popup">
            <div class = "message" style = "border:2px solid #485550; ">
                <div class = "message-header"><p>${boxUser}'s box</p><i onclick = "handleExitDetailPage()" type = "button" id = "exit${id}" class="fas fa-times-circle"></i></div>
                <div style="height:80vh; width:80vw; overflow:auto; padding-top: 0">
                    <div class = "message-body" id = "content${id}"></div>
                </div>
            </div>
        </div>
    `;
    $('#details').append(detailPage)
    loadDetailContent(id);
    $(`#exit${id}`).on('click', handleExitDetailPage);

}

const handleExitDetailPage = function(){
    $(`#popup`).remove();
};

const loadDetailContent = async function (id) {
    const content = $(`#content${id}`);

    const result = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/postTo/${id}`
      });
    const postList = result.data;
    for (let i=0; i<postList.length;i++){
        content.append(renderComment(postList[i]));
        $(`#replyComment${postList[i].id}`).on('click', handleCommentReply)
    };

    if(postList.length == 0){
        let message = `
            <p style = "text-align: center;
            font-size: 3vh;
            margin-bottom: 3vh;">There's no question yet!</p>
        `;
        content.append(message);
    }
    const replyButton = `
    <div style = "text-align: center;"><button type = "button" class = "button" id = "postQuestion${id}">Post Question Here</button></div>`;
    content.append(replyButton);
    $(`#postQuestion${id}`).on('click', handlePostQuestion);
}

const handlePostQuestion = function(event){
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('postQuestion','');
    let form = `
        <form class = "newPost card post">
            <textarea name = "bodytext" class = "textarea newPostText">Type your question here</textarea>
            <div class = "card-footer">
                <button type = "button" class = "button" id = "cancelNew${postToId}">Cancel</button>
                <button type = "button" class = "button" id = "submitNew${postToId}">Submit</button>
            </div>
        </form>
    `;
    $(`#content${postToId} p`).remove();
    $(`#content${postToId}`).prepend(form);

    $(`#cancelNew${postToId}`).on('click', handlenewQuestionCancel);
    $(`#submitNew${postToId}`).on('click', handlenewQuestionSubmit);
    
    $(`#postQuestion${postToId}`).off();
}

const handlenewQuestionSubmit = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('submitNew','');
    let text = $(`.newPostText`).serializeArray()[0].value;
    let user = await getUser();
    console.log(user.userName);
    const result = await axios({
        method: 'post',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/posts',
        data:{
        "body": text,
        "uid": user.id,
        "userName": user.name,
        "anonymous": true,
        "postTo": postToId
        }
      });
    $(`.newPost`).remove();
    $(`#postQuestion${postToId}`).on('click', handlePostQuestion);
    location.reload(true);
}

const handlenewQuestionCancel = function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const postToId = buttonid.replace('cancelNew','');
    $(`.newPost`).remove();
    $(`#postQuestion${postToId}`).on('click', handlePostQuestion);
}

const renderComment = function(post){
    let comment =  `
        <div class = "card comment" id = "comment${post.id}">
            <div class = "card-header"><p class= "card-header-title">${post.userName}</p></div>
            <div class = "card-content">${post.body}</div>
            <div class = "card-footer">
                <button type = "button" class = "button" id = "replyComment${post.id}">Reply</button>
            </div>
        </div>
    `;

    return comment;
}

const handleCommentReply = async function (event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const commentid = buttonid.replace('reply', '');
    const read = await axios({
        method: 'get',
        // TODO
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts`,
    });

    //TODO
    const reply = read.data[0];
    alert('reply')
}

const renderCommentReply = function(){

}

//register listeners
const registerListeners = function(post){

    $(`.detail${post.id}`).on('click', handleDetailPost);

};


