import {getUser, getUsers, upDateUser, addFriend, testAxios, getFakeUsers} from './script.js'
import getQuestions from './questions.js'


const user = getUser()
const questions = getQuestions()

const questionDisplay = document.getElementById("questionBody")
const rateDisplay = document.getElementById("rateBody")
const body = document.getElementById("body")
const gameDisplay = document.getElementById('gameDisplay')
const scoreDisplay = document.getElementById('scoreDisplay')
const submitDisplay = document.getElementById("submitDisplay")

const startButton = document.getElementById("startButton")
const matchButton = document.getElementById("matchButton")

let questionBlock
let blocks = []
let rateBox
let rateBoxes = []
let rate
let rates = []
let friend
let friends = []

let scores = new Array(10).fill(0)
let currentPage = 0

let clicked = new Array(50).fill(false);

// final scores
let finalScore = {
    extraversion : user.matchPoint[0],
    agreeableness : user.matchPoint[0],
    conscientiousness : user.matchPoint[0],
    emotional_stability : user.matchPoint[0],
    intellect : user.matchPoint[0]
}



function initialte() {
    // set score to 0 because a new game is started. The user choose to change his/her score
    finalScore.extraversion = 0
    finalScore.agreeableness = 0
    finalScore.conscientiousness = 0
    finalScore.emotional_stability = 0
    finalScore.intellect = 0

    startButton.onclick = null

    startButton.innerHTML = "&nbsp Back"
    startButton.classList.remove("fa-play")
    startButton.classList.add("fas")
    startButton.classList.add("fa-arrow-circle-left")
    startButton.addEventListener("click", ()=>{location.reload()})

    matchButton.style.visibility = "hidden"
    for(let i = 0; i < 10; i++){
        rateBox = document.createElement('div')
        rateBox.innerHTML = '<font size="3">' + (i+1) + '</font>'
        rateDisplay.appendChild(rateBox)
        for (let j = 0; j < 5; j++){
            rate = document.createElement('button')
            rate.classList.add((i % 2 == 0) ? "rateButtonEven" : "rateButtonOdd")
            rate.innerHTML = '<font size="3">' + (j+1) + '</font>'
            rate.setAttribute("id", "r"+i+"c"+j)
            rate.addEventListener("click", rateClickEvent)
            rateBox.appendChild(rate)
            rates.push(rate)
        } 
        rateBoxes.push(rateBox)
    }
    for (let i = 0; i < 1; i++){
        generateQuestions(i)
    }
    let nextButton = document.createElement('button')
    nextButton.innerHTML = "&nbsp Next"
    nextButton.classList.add("button")
    nextButton.classList.add("is-success")
    nextButton.classList.add("is-fullwidth")
    nextButton.classList.add("fas")
    nextButton.classList.add("fa-forward")
    nextButton.style.marginBottom="5%"
    submitDisplay.appendChild(nextButton)
    nextButton.addEventListener("click", continuePlay)
    nextButton.id = "next"
    nextButton.disabled = true
}
document.addEventListener("DOMContentLoaded",function(){
    document.getElementById("userName").innerHTML = ("&nbsp" + user.userName)
  })
startButton.onclick = initialte
matchButton.onclick = findMatches

function generateQuestions(pageNum){
    if (currentPage == 0){
        for (let i = 0; i < 10; i++){
            questionBlock = document.createElement('div')
            questionBlock.classList.add("questions")
            // questionBlock.id = ("ques" + i)
            questionBlock.innerHTML = '<font size="4">' + (i+1) + '</font>' + " " + questions[pageNum*10+i].question
            questionDisplay.appendChild(questionBlock)
            blocks.push(questionBlock)
        }
    } else {
        for (let i = 0; i < 10; i++){
            blocks[i].innerHTML = i+1 + " " + questions[pageNum*10+i].question
        }
    }
}

function rateClickEvent(e){
    let target = e.currentTarget
    let id = target.id

    if (target == undefined){
        target = e.currentTarget.parentNode
    }
    // console.log(target.type)

    target.style.backgroundColor = "rgb(242, 107, 107)"

    let rId = parseInt(id.charAt(1))
    let cId = parseInt(id.charAt(3))
    let score = cId+1
    console.log(score)
    // console.log(id + " " + rId + " " + cId)
    clicked[rId*5 + cId] = true
    for (let i = 0; i < 5; i++){
        if(clicked[rId*5+i] == true && rId*5+i != rId*5+cId){
            
            rates[rId*5+i].style.backgroundColor = (rId % 2 == 0) ? "rgb(131, 214, 247)" : "rgb(131, 247, 203)"
            clicked[rId*5+i] = false
        }
    }
    
    scores[rId] = parseInt(score)
    let flag = true
    for (let i = 0; i < scores.length; i++){
        if (scores[i] == 0){
            flag = false
            break
        } 
    }
    if (flag){
        document.getElementById('next').disabled = false
    }
}


function continuePlay(){
    // register final score
    registerScore()
    
    resetBoard()
    scroll(0,170)
    currentPage = currentPage+1
    document.getElementById("progress").innerHTML = currentPage*(20) + '%'
    if(currentPage == 4){
        document.getElementById("next").innerHTML = "Subumit New Score"
        generateQuestions(currentPage)
        document.getElementById("next").removeEventListener("click", continuePlay)
        document.getElementById("next").addEventListener("click", endGame)
    } else {
        generateQuestions(currentPage)
    }
}

function registerScore(){
    console.log(scores)
    finalScore.extraversion += scores[0]
    finalScore.agreeableness -= scores[1]
    finalScore.conscientiousness += scores[2]
    finalScore.emotional_stability-= scores[3]
    finalScore.intellect += scores[4]
    finalScore.extraversion -= scores[5]
    finalScore.agreeableness += scores[6]
    finalScore.conscientiousness -= scores[7]
    finalScore.emotional_stability += scores[8]
    finalScore.intellect -= scores[9]
}

function resetBoard(){
    rates.map((rate, i)=>rate.style.backgroundColor = (Math.floor(i / 5) % 2 == 0) ? "rgb(131, 214, 247)" : "rgb(131, 247, 203)")
    scores = scores.map((score)=> score = 0)
    clicked = clicked.map((c)=> c = false)
    document.getElementById('next').disabled = true
}

function endGame(){
    upDateUser(finalScore)
    document.getElementById("progress").innerHTML = "100%"
    // register final score
    registerScore()

    gameDisplay.remove()
    questionDisplay.remove()
    rateDisplay.remove()
    submitDisplay.remove()
    
    let extraversionDisplay = document.createElement('div')
    extraversionDisplay.innerHTML = "Extraversion: " + finalScore.extraversion
    let agreeablenessDisplay = document.createElement('div')
    agreeablenessDisplay.innerHTML = "Agreeableness: " + finalScore.agreeableness
    let conscientiousnessDisplay = document.createElement('div')
    conscientiousnessDisplay.innerHTML = "Conscientiousness: " + finalScore.conscientiousness
    let emotional_stabilityDisplay = document.createElement('div')
    emotional_stabilityDisplay.innerHTML = "Emotional stability: " + finalScore.emotional_stability
    let intellectDisplay = document.createElement('div')
    intellectDisplay.innerHTML = "Intellect: " + finalScore.intellect

    scoreDisplay.appendChild(extraversionDisplay)
    scoreDisplay.appendChild(agreeablenessDisplay)
    scoreDisplay.appendChild(conscientiousnessDisplay)
    scoreDisplay.appendChild(emotional_stabilityDisplay)
    scoreDisplay.appendChild(intellectDisplay)

    scoreDisplay.style.marginBottom = "3%"

    matchButton.style.visibility = "visible"
}

async function findMatches(){
    matchButton.disabled = true
    startButton.onclick = null

    startButton.innerHTML = "Back"
    startButton.addEventListener("click", ()=>{location.reload()})

    if (document.getElementById("next")){
        document.getElementById("next").style.visibility = "hidden"
    }

    gameDisplay.remove()
    questionDisplay.remove()
    rateDisplay.remove()

    let matches = document.createElement('div')

    // TODO Change this back
    // let users = await getUsers()
    let users = getFakeUsers()

    let filteredUsers = filterUsers(users)

    // for people who has no score
    if (finalScore.agreeableness+
        finalScore.conscientiousness+
        finalScore.emotional_stability+
        finalScore.extraversion+
        finalScore.intellect == -5){
            let noMatchDisplay = document.createElement('div')
            noMatchDisplay.innerHTML = "You have not completed the personality questionnaire..."
            scoreDisplay.classList.add("score")
            scoreDisplay.appendChild(noMatchDisplay)
    } else {
        filteredUsers.forEach((user)=>{
            let match = document.createElement('div')
            match.classList.add('columns')
    
            let uname = document.createElement('div')
            uname.classList.add('column')
            uname.innerHTML = user[1].userName
    
            let email = document.createElement('div')
            email.classList.add('column')
            email.innerHTML = user[1].email
    
            let similarity = document.createElement('div')
            similarity.classList.add('column')
            similarity.innerHTML = "Similarity: " + user[0] + "%"
    
            friend = document.createElement('button')
            friend.innerHTML = "Add to Your Friendlist"
            friend.classList.add('column')
            friend.classList.add('button')
            friend.classList.add('is-warning')
            friend.classList.add('fas')
            friend.classList.add('fa-user-plus')
            friend.id = user[1].userName + "add"
            friend.addEventListener("click", addFriend)
            friends.push(friend)
    
            match.appendChild(uname)
            match.appendChild(email)
            match.appendChild(similarity)
            match.appendChild(friend)
    
            matches.appendChild(match)
        })
        scoreDisplay.appendChild(matches)
        }    
    scoreDisplay.style.marginBottom = "3%"
}

function filterUsers(users){
    let thisPoints = []
    thisPoints.push(finalScore.extraversion)
    thisPoints.push(finalScore.agreeableness)
    thisPoints.push(finalScore.conscientiousness)
    thisPoints.push(finalScore.emotional_stability)
    thisPoints.push(finalScore.intellect)

    let theirPoints = []
    let diff = []
    let similarities = new Array(users.length);

    for (var i = 0; i < similarities.length; i++) {
        similarities[i] = new Array(2);
    }

    users.forEach((user)=>{
        theirPoints.push(user.matchPoint)
    })
    for (let i  = 0; i < theirPoints.length; i++){
        for (let j = 0; j < 5; j++){
            diff[j] = Math.abs(theirPoints[i][j] - thisPoints[j])
        }
        let t = 0
        for (let k = 0; k < diff.length; k++){
            t = t + diff[k]
        }
        similarities[i][0] = 100 - t
        similarities[i][1] = users[i]
    }

    similarities.sort(function(a,b) {
        return b[0]-a[0]
    });


    let filteredUsers = similarities.slice(0,5)    
    return filteredUsers
}

