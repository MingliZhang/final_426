import getUser from './script.js'
import getQuestions from './questions.js'


const user = getUser()
const questions = getQuestions()
const questionDisplay = document.getElementById("questionBody")
const rateDisplay = document.getElementById("rateBody")
const body = document.getElementById("body")
const submitDisplay = document.getElementById("submitDisplay")

const startButton = document.getElementById("startButton")
const matchButton = document.getElementById("matchButton")

let questionBlock
let blocks = []
let rateBox
let rateBoxes = []
let rate
let rates = []

let scores = new Array(10).fill(0)
let currentPage = 0

let clicked = new Array(50).fill(false);

// final scores
let finalScore = {
    extraversion : 0,
    agreeableness : 0,
    conscientiousness : 0,
    emotional_stability : 0,
    intellect : 0
}



function initialte() {
    document.getElementById("scoreBoard").style.visibility = "visible"
    startButton.style.visibility = "hidden"
    matchButton.style.visibility = "hidden"
    document.getElementById("userName").innerHTML = (user.userName)
    for(let i = 0; i < 10; i++){
        rateBox = document.createElement('div')
        rateBox.innerHTML = i+1
        rateDisplay.appendChild(rateBox)
        for (let j = 0; j < 5; j++){
            rate = document.createElement('button')
            // rate.classList.add("button")
            // rate.classList.add("is-info")
            rate.classList.add("rateButton")
            rate.innerHTML = j+1
            rate.id = "r"+i+"c"+j
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
    nextButton.innerHTML = "Next"
    nextButton.classList.add("button")
    nextButton.classList.add("is-success")
    nextButton.classList.add("is-fullwidth")
    nextButton.style.marginBottom="5%"
    submitDisplay.appendChild(nextButton)
    nextButton.addEventListener("click", continuePlay)
    nextButton.id = "next"
}
startButton.onclick = initialte

function generateQuestions(pageNum){
    if (currentPage == 0){
        for (let i = 0; i < 10; i++){
            questionBlock = document.createElement('div')
            questionBlock.classList.add("questions")
            // questionBlock.id = ("ques" + i)
            questionBlock.innerHTML = i+1 + " " + questions[pageNum*10+i].question
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
    let target = e.target
    let score = target.innerHTML
    let id = target.id

    e.target.style.backgroundColor = "red"

    let rId = parseInt(id[1])
    let cId = parseInt(id[3])
    clicked[rId*5 + cId] = true
    for (let i = 0; i < 5; i++){
        if(clicked[rId*5+i] == true && rId*5+i != rId*5+cId){
            // console.log(rates[i])
            rates[rId*5+i].style.backgroundColor = "#008CBA"
            clicked[rId*5+i] = false
            //console.log(clicked)
        }
    }
    
    scores[rId] = parseInt(score)
}


function continuePlay(){
    // register final score
    registerScore()
    
    resetBoard()
    // console.log(scores)
    currentPage = currentPage+1
    document.getElementById("progress").innerHTML = currentPage*(20) + '%'
    if(currentPage == 4){
        document.getElementById("next").innerHTML = "Finish"
        generateQuestions(currentPage)
        document.getElementById("next").removeEventListener("click", continuePlay)
        document.getElementById("next").addEventListener("click", endGame)
    } else {
        generateQuestions(currentPage)
    }
}

function registerScore(){
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
    rates.map((rate)=>rate.style.backgroundColor = "#008CBA")
    scores = scores.map((score)=> score = 0)
    clicked = clicked.map((c)=> c = false)

    // console.log("reset")
}

function endGame(){
    document.getElementById("progress").innerHTML = "100%"
    // register final score
    registerScore()

    document.getElementById("gameDisplay").remove()

    let ScoreDisplay = document.createElement('div')
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

    ScoreDisplay.appendChild(extraversionDisplay)
    ScoreDisplay.appendChild(agreeablenessDisplay)
    ScoreDisplay.appendChild(conscientiousnessDisplay)
    ScoreDisplay.appendChild(emotional_stabilityDisplay)
    ScoreDisplay.appendChild(intellectDisplay)

    ScoreDisplay.classList.add("center")
    body.appendChild(ScoreDisplay)
    ScoreDisplay.style.marginBottom = "3%"

    document.getElementById("next").innerHTML = "Find Your Matches"
    document.getElementById("next").removeEventListener("click", endGame)
    document.getElementById("next").addEventListener("click", findMatches)
}

function findMatches(){
    alert("Find your Matches")
}


