$(function () {
  loadNavIntoDom();
  $("body").css("display", "flex");
  $("#navbar").css({ "padding-left": "1vw", "padding-right": "1vw" });
  $("#topicons").css("margin-top", "30%");
  $(".icons a").css({ "font-size": "3vw", color: "#0c3327" });
  $("#usericon").css("margin-top", "60%");
  // loadContent();
});

const loadNavIntoDom = function () {
  const $navbar = $(`#navbar`);
  let navbar = `
    <div class = "column">
        <div id = "topicons">
            <div class = "icons" id = "homeicon"><a href = "#"><i class="fas fa-home"></i><span> Home</span></a></div>
            <div class = "icons" id = "gameicon"><a href = "#"><i class="fas fa-gamepad"></i><span> Game</span></a></div>
            <div class = "icons" id = "inboxicon"><a href = "#"><i class="fas fa-envelope-open-text"></i><span> inbox</span></a></div>
            <div class = "icons" id = "chaticon"><a href = "#"><i class="fas fa-comments"></i><span> chat</span></a></div>
            <div class = "icons" id = "questionicon"><a href = "#"><i class="far fa-map"></i></i></a></div>
        </div>
        <div class = "icons" id = "usericon">
            <a href = "#"><i class="fas fa-user-circle"></i></a>
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
