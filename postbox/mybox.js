import {getUser} from './getUser.js'

$(function() {
    loadHeaderIntoDom();
    loadPostsIntoDOM();
});

const renderPost = function(post) {
    let render = `
    <div class = "post card" id = "question${post.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${post.userName}</h2>
        </div>
        <p class = "body card-content">${post.body}</p>
    `;

    let bottom  = ``;
        bottom = `        
        <div class = "bottom card-footer">
            <button type = "button" class = "button" id = "reply${post.id}">Reply</button>`;

    bottom += `</div>`
    render += bottom;
    render += `</div>`;
    
    return render;        
};

const renderReply = function(reply) {
    let render = `
    <div class = "post card" id = "replyBox${reply.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${reply.userName}</h2>
        </div>
        <p class = "body card-content">${reply.body}</p>
        <div class = "bottom card-footer">
            <button type = "button" class = "button" id = "editReply${reply.id}">Edit</button>
            <button type = "button" class = "button" id = "deleteReply${reply.id}">Delete</button>
        </div>
    </div>`;
    
    return render;        
};

const loadPostsIntoDOM = async function() {
    const $root = $('#root');

    let user = await getUser();
    const userid = user.id
    const result = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/postTo/${userid}`,
      });

    const QuestionList = result.data;
    for (let i=0; i<QuestionList.length;i++){
        $root.append(renderPost(QuestionList[i]));
        console.log(QuestionList[i].comments)
        if(QuestionList[i].comments.length != 0){
            $root.append(`<div class = "commentBox" id = "commentBox${QuestionList[i].id}"></div>`)
            console.log(renderReply(QuestionList[i].comments[0]))
            $(`#commentBox${QuestionList[i].id}`).append(renderReply(QuestionList[i].comments[0]))
        }
        registerListeners(QuestionList[i]);
    };

};

//Load title
const loadHeaderIntoDom = async function(){
    const $title = $(`#title`);


    let postHeader = `
        <div class = "header">
            <h1 class="hero-head">My Question Inbox</h1>
        </div>`;
    $title.append(postHeader)
};

const handleQuestionReply = function (event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('reply', '');
    $(`#question${questionid}`).after(renderReplyForm(questionid))
    $(`#cancelReply${questionid}`).on('click', handleCancelReply);
    $(`#submitReply${questionid}`).on('click', handleSubmitReply);
}

const renderReplyForm = function(id){
    let form = `
    <form class = "newReply card post" id = "replybox${id}">
    <textarea name = "bodytext" class = "textarea newPostText">Type your response here</textarea>
    <div class = "card-footer">
        <button type = "button" class = "button" id = "cancelReply${id}">Cancel</button>
        <button type = "button" class = "button" id = "submitReply${id}">Submit</button>
    </div>
    </form>`;
    return form;
};

const handleCancelReply = function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const id = buttonid.replace('cancelReply', '');
    $(`#replybox${id}`).remove();
};

const handleSubmitReply = async function(event){
    event.preventDefault();
    const buttonid = $(event.target).attr("id")
    const questionid = buttonid.replace('submitReply', '');

    let user = await getUser();

    const question = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`
    });
    const questionbody = question.data.body;
    const uid = question.data.uid
    const username = question.data.userName;
    const postTo = question.data.postTo;
    const comments = question.data.comments;
    const text = $(`#replybox${questionid}`).serializeArray()[0].value;
    const comment = {"id":questionid,
                    "userName": user.userName,
                    "body":text
                    }
    comments.push(comment)
    const result = await axios({
        method: 'put',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${questionid}`,
        data:{
        "body": questionbody,
        "uid": uid,
        "userName": username,
        "anonymous": true,
        "comments": comments,
        "likes": [],
        "postTo": postTo,
        }
    });
    
    $(`#question${questionid}`).after(renderReply(comment))
};

//register listeners
const registerListeners = function(post){

    $(`#reply${post.id}`).on('click', handleQuestionReply);

};


