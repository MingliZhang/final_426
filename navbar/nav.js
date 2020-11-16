$(function(){
    loadNavIntoDom();
    $('#homeicon')
    loadContent();
});

const loadNavIntoDom = function(){
    const $navbar = $(`#navbar`);
    let navbar = `
    <div class = "column">
        <div id = "topicons">
            <div class = "icons" id = "homeicon"><a href = "../main_interface/main_interface.html"><i class="fas fa-home"></i></a></div>
            <div class = "icons" id = "gameicon"><a href = "#"><i class="fas fa-gamepad"></i></a></div>
            <div class = "icons" id = "inboxicon"><a href = "#"><i class="fas fa-envelope-open-text"></i></a></div>
            <div class = "icons" id = "chaticon"><a href = "#"><i class="fas fa-comments"></i></a></div>
        </div>
        <div id = "usericon">
            <div class = "icons"><a href = "#"><i class="fas fa-user-circle"></i></a></div>
        </div>
    </div>`

    $navbar.append(navbar)
};

const loadContent = function(){
    const body = $(`body`);
    let content = `
    <div class = "box" 
    style= "background-color: #2f4f4f; 
            width: 60%; 
            height: 30em; 
            display: box;
    "></div>`
    body.append(content)
}