$(function() {
    loadHeaderIntoDom();
    $(`#create`).on('click', handleCreateButtonPress);
    loadPostsIntoDOM();
});


const renderPost = function(post) {
    let render = `
    <div class = "post card" id = "post${post.id}">
        <div class = "card-header">
            <h3 class = "author card-header-title">${post.userName}</h2>
        </div>
        <p class = "body card-content">${post.body}</p>
    `;

    let bottom = `        
    <div class = "bottom card-footer">
        <button type = "button" class = "button detail${post.id}">Details</button>`;

    // console.log(post.isMine)
    // if(post.isMine){
    //     bottom += `<button type = "button" class = "button edit${post.id}"><i class="far fa-edit edit${post.id}"></i></button>
    //     <button type = "button" class = "button delete${post.id}"><i class="fas fa-trash-alt delete${post.id}"></i></button>`;
    // }

    bottom += `</div>`
    render += bottom;
    render += `</div>`;
    
    return render;        
};

const loadPostsIntoDOM = async function() {
    const $root = $('#root');

    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/posts',
      });

    let posts = result.data;
    for (let i=0; i<posts.length;i++){
        $root.append(renderPost(posts[i]));
        registerListeners(posts[i]);
    };

};

//Load title
const loadHeaderIntoDom = function(){
    const $title = $(`#title`);
    let postHeader = `
        <div class = "header">
            <h1 class="hero-head">Anonymous Mailbox</h1>
            <button type = "button" class = "button" id = "create"><i class="fas fa-pen-square" style = "color: #FFA883"></i>Write a post</button>
        </div>`;
    $title.append(postHeader)
};

//Handle create new Post button
const handleCreateButtonPress = function(event){
    event.preventDefault();
    let form = `
        <form class = "newPost card post">
            <textarea name = "bodytext" class = "textarea newPostText">Type your post here!</textarea>
            <div class = "card-footer">
                <button type = "button" class = "button" id = "cancelNew">Cancel</button>
                <button type = "button" class = "button" id = "submitNew">Submit</button>
            </div>
        </form>
    `;
    $(`#root`).prepend(form);

    $(`#cancelNew`).on('click', handlenewPostCancel);
    $(`#submitNew`).on('click', handlenewPostSubmit);
    $(`#create`).off('click', handleCreateButtonPress);
};

//Handle cancel new post button
const handlenewPostCancel = function(event){
    event.preventDefault();
    $(`.newPost`).remove();
    $(`#create`).on('click', handleCreateButtonPress);
};

//Handle submit new post button
const handlenewPostSubmit = async function (event) {
    event.preventDefault();
    let $root = $(`#root`);
    let text = $(`.newPostText`).serializeArray()[0].value;
    const result = await axios({
        method: 'post',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/posts',
        data:{
        "body": text,
        "uid": 'todo',
        "userName": 'Eva',
        "anonymous": true,
        "isMine": true,
        }
      });
    $(`.newPost`).remove();
    location.reload(true);
};

//Handle delete post
const handledeletePost = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('delete', '');
    // alert(postid);
    $(`#post${postid}`).remove();

    const result = await axios({
        method: 'delete',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${postid}`,
      });
    location.reload(true);
};

//render post edit form
const renderPostEditForm = function(post){
    let form = `
        <form class = "newPost card post" id = "form${post.id}">
            <textarea name = "bodytext" class = "textarea newPostText">${post.body}</textarea><br>
            <div class = "card-footer">
                <button type = "button" class = "cancelEdit${post.id}"><i class="fas fa-trash-alt cancelEdit${post.id}"></i>Cancel</button>
                <button type = "button" class = "submitEdit${post.id}"><i class="far fa-check-square submitEdit${post.id}"></i>Submit</button>
            </div>
        </form>
    `;
    return form;
};

//Handle edit post
const handleEditPost = async function(event){
    event.preventDefault();
    // alert('edit');
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('edit', '');
    let read = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${postid}`,
    });
    $(renderPostEditForm(read.data)).insertAfter(`#post${postid}`);
    $(`#post${postid}`).remove();
    $(`.cancelEdit${read.data.id}`).on('click', handleEditCancel);
    $(`.submitEdit${read.data.id}`).on('click', handleEditSubmit);
};

const handleEditCancel = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('cancelEdit', '');
    const read = await axios({
        method: 'get',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${postid}`,
        withCredentials: true,
    });
    $(renderpost(read.data)).insertAfter(`#form${postid}`);
    $(`#form${postid}`).remove();
    registerListeners(read.data);

};

const handleEditSubmit = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('submitEdit','');
    let newBody = $(`#form${postid}`).serializeArray()[0].value;
    const result = await axios({
        method: 'put',
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${postid}`,
        data: {
          body: newBody
        },
    });
    location.reload(true);
    $(`#form${postid}`).remove();
};

const handleDetailPost = async function(event){
    event.preventDefault();
    const buttonclass = $(event.target).attr("class").split(" ");
    const buttonid = buttonclass[buttonclass.length -1]
    const postid = buttonid.replace('detail','');
    loadDetailPopup(postid);
}

const loadDetailPopup = async function(id){
    const result = await axios({
        method: 'get',
        //TODO
        url: `https://us-central1-comp426-firebase.cloudfunctions.net/posts/${id}`
      });

    const userName = result.data.userName;
    const detailPage = `
        <div class = "container" id = "popup">
            <div class = "message" style = "border:2px solid #485550; ">
                <div class = "message-header"><p>${userName}</p><i onclick = "handleExitDetailPage()" type = "button" id = "exit${id}" class="fas fa-times-circle"></i></div>
                <div style="height:80vh; width:80vw; overflow:auto; padding-top: 0">
                    <div class = "message-body" id = "content${id}"></div>
                </div>
            </div>
        </div>
    `;
    $('#details').append(detailPage)
    // $(`#exit${id}`).on('click', handleExitDetailPage());
    loadDetailContent(id, userName);

}

const handleExitDetailPage = function(){
    $(`#popup`).remove();
}

const loadDetailContent = async function (id, userName) {
    console.log(id)
    const content = $(`#content${id}`);

    const result = await axios({
        method: 'get',
        url: 'https://us-central1-comp426-firebase.cloudfunctions.net/posts',
      });

    let posts = result.data;
    for (let i=0; i<posts.length;i++){
        console.log(posts[i].userName == userName)
        if(posts[i].userName == userName){
            console.log(posts[i]);
            content.append(renderComment(posts[i]));
        }
    };
}

const renderComment = function(post){
    let comment =  `
        <div class = "card" id = "comment${post.id}">
            <div class = "card-header">${post.userName}</div>
            <div class = "card-content">${post.body}</div>
            <div class = "card-footer">footer</div>
        </div>
    `;

    return comment;
}

//register listeners
const registerListeners = function(post){

    $(`.delete${post.id}`).on('click', handledeletePost);
    $(`.edit${post.id}`).on('click', handleEditPost);
    $(`.detail${post.id}`).on('click', handleDetailPost);
};

