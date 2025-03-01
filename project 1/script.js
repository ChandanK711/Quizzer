document.addEventListener("DOMContentLoaded", function () {
    let contactButton = document.getElementById("cont"); 
    let contactModal = document.querySelector(".contactme"); 

    
    if (contactButton && contactModal) {
        contactButton.addEventListener("click", function () {
            contactModal.style.display = "flex"; 
        });

        
        contactModal.addEventListener("click", function (event) {
            if (event.target === contactModal) { 
                contactModal.style.display = "none";
            }
        });
    } else {
        console.error("Element not found! Check your HTML structure.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const exit=document.querySelector(".cross");
    let contactModal = document.querySelector(".contactme"); 
    
    exit.addEventListener("click",function(){
        contactModal.style.display="none"
        

        
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const start=document.querySelector("#strt-btn");
    const quiz = document.querySelector(".question-con");
    const reset=document.querySelector(".reset");
    const next=document.querySelector(".next");
    const restrt=document.querySelector(".restart-btn");
    const resultcont=document.querySelector(".result-con")
   
    start.addEventListener("click",function(){
        if(quiz.style.display==="none"){
            quiz.style.display="flex";
            fetchquestions()
        }
        else{
            quiz.style.display="none"
        }
    });

    reset.addEventListener("click",function(){
        resetQuiz();
    })

    next.addEventListener("click",function(){
        nextQuestion();
    })

    restrt.addEventListener("click",function(){
        resetQuiz();
        resultcont.style.display="none"

    })
   
});

document.addEventListener("DOMContentLoaded", function () {
    const exit2=document.querySelector(".cross2");
    const quiz = document.querySelector(".question-con");
    exit2.addEventListener("click",function() {
        quiz.style.display="none"
          
    });
});

let questions=[];
let currentindex=0;
let score;
const quediv=document.querySelector(".question")
const allopt=document.querySelectorAll(".option")
       
async function fetchquestions(){
    try{
        const api=await fetch('https://opentdb.com/api.php?amount=10&type=multiple')
        const data=await api.json();
        questions=data.results;
        currentindex=0;
        score=0;
        QandA();
        updateScore();
        
        
    }catch(error){
        console.error('Error:', error);
    }
}

    
function QandA(){
    const quediv=document.querySelector(".question")
    const allopt=document.querySelectorAll(".option")
    if(currentindex<questions.length){
        
        const q=questions[currentindex]

        quediv.innerHTML=`${q.question} <span style="font-style: bold;">(  Category :${q.category})</span>`;

        const alloptions=[...q.incorrect_answers,q.correct_answer].sort(() => Math.random() - 0.5);

        allopt.forEach((div, index) => {
            if (alloptions[index]) {
                div.innerHTML = alloptions[index]; 
                div.style.backgroundColor = "";
                div.style.color="white"
                div.style.pointerEvents = "auto";
                div.onclick = () => checkAnswer(div,alloptions[index], q.correct_answer);
                div.style.cursor = "pointer";
            } else {
              div.style.display = "none"; 
            }
        });
        
    }
}

function checkAnswer(div,selected, correct) {
    const quediv=document.querySelector(".question")
    const allopt=document.querySelectorAll(".option")
    
    allopt.forEach(div => div.style.pointerEvents = "none");
    if(selected==correct){
        score=score+10;
        div.style.backgroundColor="rgb(3, 253, 3)"
        div.style.color="black"
    }
    else{
        div.style.backgroundColor="red"
        div.style.color="black"
        allopt.forEach(div => {
            if (div.innerHTML === correct) {
                div.style.backgroundColor = "rgb(3, 253, 3)";
            }
        });
    }

   
    updateScore();
}
  
function nextQuestion() {
    const resultcont=document.querySelector(".result-con")
    if (currentindex < questions.length - 1) {
      currentindex++;
      QandA();
    } else {
      alert("Quiz Completed!");
      document.querySelector(".question-con").style.display="none"
      document.querySelector(".result-con").style.display = "flex";
      
    }
}

function resetQuiz() {
    currentindex = 0;
    score = 0;
    updateScore();
    fetchquestions();
    document.querySelector(".result-con").style.display = "none";
}
  
function updateScore() {
    document.getElementById("score").textContent = `SCORE: ${score}/100`;
    document.getElementById("res-score").textContent=`YOUR SCORE:${score}/100`
}
