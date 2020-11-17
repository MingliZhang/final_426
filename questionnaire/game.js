import getUser from './script.js'
import getQuestions from './questions.js'


const user = getUser()
const questions = getQuestions()
const questionDisplay = document.getElementById("questionBody")
const rateDisplay = document.getElementById("rateBody")
const startButton = document.getElementById("startButton")
const matchButton = document.getElementById("matchButton")

let questionBlock
let blocks = []
let rateBox
let rateBoxes = []
let rate
let rates = []
let score = 0
let currentPage = 0

let clicked = new Array(50).fill(false);


function initialte() {
    startButton.style.visibility = "hidden"
    matchButton.style.visibility = "hidden"
    document.getElementById("userName").innerHTML = (user.userName)
    for(let i = 0; i < 10; i++){
        rateBox = document.createElement('div')
        rateDisplay.appendChild(rateBox)
        for (let j = 0; j < 5; j++){
            rate = document.createElement('button')
            rate.innerHTML = j+1
            rate.id = "r"+i+"c"+j
            rate.addEventListener("click", registerScore, false)
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
    rateDisplay.appendChild(nextButton)
    nextButton.addEventListener("click", continuePlay, true)
    nextButton.id = "next"
}
startButton.onclick = initialte

function generateQuestions(pageNum){
    if (currentPage == 0){
        for (let i = 0; i < 10; i++){
            questionBlock = document.createElement('div')
            // questionBlock.id = ("ques" + i)
            questionBlock.innerHTML = questions[pageNum*10+i].question
            questionDisplay.appendChild(questionBlock)
            blocks.push(questionBlock)
        }
    } else {
        for (let i = 0; i < 10; i++){
            blocks[i].innerHTML = questions[pageNum*10+i].question
        }
    }
    
}

function registerScore(e){
    let target = e.target
    let score = target.innerHTML
    let id = target.id

    e.target.style.backgroundColor = "red"
    document.getElementById("test").innerHTML = ("今天哪位小宝贝被点到了呢：" + id + "---" + score)

    let rId = parseInt(id[1])
    let cId = parseInt(id[3])
    for (let i = 0; i < 5; i++){
        if(clicked[rId*5+i] == true){
            // console.log(rates[i])
            rates[rId*5+i].style.backgroundColor = "blue"
        }
    }
    clicked[rId*5 + cId] = true
    console.log(rId*5 + cId)
}

function continuePlay(){
    currentPage = currentPage+1
    document.getElementById("progress").innerHTML = currentPage*(20) + '%'
    if(currentPage == 4){
        document.getElementById("next").innerHTML = "Finish"
        generateQuestions(currentPage)
        endGame()
    } else {
        generateQuestions(currentPage)
    }
}

function endGame(){
   console.log("you have fucking finished what do you want?")
}


