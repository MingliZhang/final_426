import getUser from './script.js'
import getQuestions from './questions.js'


const user = getUser()
const questions = getQuestions()
const questionDisplay = document.getElementById("questionBody")
const rateDisplay = document.getElementById("rateBody")
let questionBlock
let blocks = []
let rateBox
let rateBoxes = []
let rate
let rates = []
let score = 0


function initialte() {
    document.getElementById("userName").innerHTML = (user.userName)
    for(let i = 0; i < 10; i++){
        rateBox = document.createElement('div')
        rateDisplay.appendChild(rateBox)
        for (let j = 0; j < 5; j++){
            rate = document.createElement('button')
            rate.innerHTML = j+1
            rate.addEventListener("click", registerScore, false)
            rateBox.appendChild(rate)
            rates.push(questionBlock)
        } 
        rateBoxes.push(rateBox)
    }
    for (let i = 0; i < 1; i++){
        generateQuestions(i)
    }
}

initialte()

function generateQuestions(index){
    for (let i = index; i < index*10+9; i++){
        questionBlock = document.createElement('div')
        questionBlock.innerHTML = questions[i].question
        questionDisplay.appendChild(questionBlock)
        blocks.push(questionBlock)
    }
}

function registerScore(e){
    score = e.target.innerHTML
    console.log(score)
}



