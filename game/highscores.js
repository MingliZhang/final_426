const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

// highScoresList.innerHTML = highScores
//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
//   .join("");

const friendScores = [{
  name: "Zhang Three",
  score: 100
},
{
  name: "Li Four",
  score: 100
},
{
  name: "Wang Two Mazi",
  score: 100
}]

highScoresList.innerHTML = friendScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("")