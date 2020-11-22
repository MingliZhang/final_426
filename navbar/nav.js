$(function () {
  loadNavIntoDom();
  $("body").css("display", "flex");
  $("#navbar").css({ "padding-left": "1vw", "padding-right": "1vw" });
  $("#topicons").css("margin-top", "30%");
  $(".icons a").css({ "font-size": "3vw", "color": "#0c3327" });
  $(".icons span").css({ "font-size": "2vw", "color": "#f3ECDB", "padding-left": "1vw" });
  $("#usericon").css("margin-top", "60%");
  // loadContent();
});

const loadNavIntoDom = function () {
  const $navbar = $(`#navbar`);
  let navbar = `
    <div class = "column" style = "width: 20vw;">
        <div id = "topicons">
            <div class = "icons" id = "homeicon"><a href = "#"><i class="fas fa-home"></i><span>Home</span></a></div>
            <div class = "icons" id = "gameicon"><a href = "#"><i class="fas fa-gamepad"></i><span>Game</span></a></div>
            <div class = "icons" id = "inboxicon"><a href = "#"><i class="fas fa-envelope-open-text"></i><span>Inbox</span></a></div>
            <div class = "icons" id = "chaticon"><a href = "#"><i class="fas fa-box-open"></i><span>Post Box</span></a></div>
            <div class = "icons" id = "questionicon"><a href = "#"><i class="far fa-map"></i><span>Questionnaire</span></a></div>
        </div>
        <div class = "icons" id = "usericon">
            <a href = "#"><i class="fas fa-user-circle"></i><span>User</span></a>
        </div>
    </div>`;

  $navbar.append(navbar);
};

const loadContent = function () {
  const body = $(`body`);
  let content = `
    <div class = "box" 
    style= "background-color: #2f4f4f; 
            width: 60%; 
            height: 30em; 
            display: box;
    "></div>`;
  body.append(content);
};
