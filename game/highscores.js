const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];


// highScoresList.innerHTML = highScores
//   .map(score => {
//     return `<li class="high-score">${score.name} - ${score.score}</li>`;
//   })
//   .join("");

async function getUsers(){
  try{
      const result = await axios({
          method: 'get',
          url: 'https://us-central1-comp426-firebase.cloudfunctions.net/users'
      })
      //console.log(result.data)
      return result.data
  } catch {
      console.error(error);
  }
}


document.addEventListener("DOMContentLoaded", async function render(){
  let allUsers = await getUsers()
  //console.log(allUsers)

  // let scores = new Array(allUsers.length)
  // scores.map((score) => score = new Array(2))
  // for (let i = 0; i < allUsers.length; i++){
  // scores[i][0] = allUsers[i].data.highestGameScore
  // scores[i][1] = allUsers[i].data.userName
  // }

  // scores.sort(function(a,b) {
  //   return b[0]-a[0]
  // });

  // let highestFive = scores.slice(0, 11);


  // highScoresList.innerHTML = highestFive
  //   .map(score => {
  //     return `<li class="high-score">${score.name} - ${score.score}</li>`;
  //   })
  //   .join("")

})




