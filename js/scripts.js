const question = document.querySelector("#question");
const answersBox = document.querySelector("#answers-box");
const quizzContainer = document.querySelector("#quizz");
const scoreContainer = document.querySelector("#score-container");
const letters = ["a","b","c","d"];
let points = 0;
let actualQuestion = 0;

// perguntas
const questions = [
    // 1
    {
        "question": "Qual montadora de carros lançou o modelo Mustang?",
        "answers":[
            {
                "answer":"Ford",
                "correct": true
            },
            {
                "answer":"Chevrolet",
                "correct": false
            },
            {
                "answer":"Toyota",
                "correct": false
            },
            {
                "answer":"Honda",
                "correct": false
            },
        ] 
    },
    // 2
    {
        "question": "Em que ano foi lançado o primeiro carro híbrido comercialmente disponível?",
        "answers":[
            {
                "answer":"1997",
                "correct": true
            },
            {
                "answer":"2001",
                "correct": false
            },
            {
                "answer":"2005",
                "correct": false
            },
            {
                "answer":"2010",
                "correct": false
            },
        ] 
    },
    // 3
    {
        "question": "Qual destes carros é conhecido por ser um ícone dos anos 60 e associado à cultura hippie?",
        "answers":[
            {
                "answer":"Ford Mustang",
                "correct": false
            },
            {
                "answer":"Volkswagen Fusca",
                "correct": true
            },
            {
                "answer":"Chevrolet Camaro",
                "correct": false
            },
            {
                "answer":"Dodge Charger",
                "correct": false
            },
        ] 
    },
    // 4
    {
        "question": "O que significa a sigla SUV em carros?",
        "answers":[
            {
                "answer":"Super Urban Vehicle",
                "correct": false
            },
            {
                "answer":"Sport Utility Vehicle",
                "correct": true
            },
            {
                "answer":"Small Utility Van",
                "correct": false
            },
            {
                "answer":"Speedy Undercarriage Vehicle",
                "correct": false
            },
        ] 
    },
    // 5
    {
        "question": "Qual é o país de origem da montadora de carros Toyota?",
        "answers":[
            {
                "answer":"Japão",
                "correct": true
            },
            {
                "answer":"Alemanha",
                "correct": false
            },
            {
                "answer":"Estados Unidos",
                "correct": false
            },
            {
                "answer":"Itália",
                "correct": false
            },
        ] 
    },
    // 6
    {
        "question": "Qual é o carro mais vendido de todos os tempos?",
        "answers":[
            {
                "answer":"Toyota Corolla",
                "correct": true
            },
            {
                "answer":"Ford F-Series",
                "correct": false
            },
            {
                "answer":"Volkswagen Golf",
                "correct": false
            },
            {
                "answer":"Honda Civic",
                "correct": false
            },
        ] 
    },
    // 7
    {
        "question": "O que significa a sigla ABS em sistemas de freios de carros?",
        "answers":[
            {
                "answer":"Automatic Brake System",
                "correct": false
            },
            {
                "answer":"Anti-Lock Braking System",
                "correct": true
            },
            {
                "answer":"Advanced Braking Solution",
                "correct": false
            },
            {
                "answer":"Auto Brake Security",
                "correct": false
            },
        ] 
    },
    // 8
    {
        "question": "Qual é o primeiro carro produzido em massa na história?",
        "answers":[
            {
                "answer":"Ford Model T",
                "correct": true
            },
            {
                "answer":"Chevrolet Bel Air",
                "correct": false
            },
            {
                "answer":"Volkswagen Beetle",
                "correct": false
            },
            {
                "answer":"Toyota Prius",
                "correct": false
            },
        ] 
    }
];

// Substituição do quizz para primeira pergunta
function init(){
    // criar a primeira pergunta;
    createQuestion(0);
}

// cria a pergunta - i = atual question
function createQuestion(i){ 
    // limpar a questão anterior
    const oldButtons = answersBox.querySelectorAll("button");
    oldButtons.forEach(function(btn){
        btn.remove();
    });

    // alterar o texto da pergunta
    const questionText = question.querySelector("#question-text");
    const questionNumber = question.querySelector("#question-number");

    questionText.textContent = questions[i].question;
    questionNumber.textContent = i + 1;

    // Exibindo as alternativas
    questions[i].answers.forEach(function(answer, i){
        // cria o template do btao do quizz
        const answerTemplate = document.querySelector(".answer-template").cloneNode(true);
        const letterBtn = answerTemplate.querySelector(".btn-letter");
        const answerText = answerTemplate.querySelector(".question-answer");

        letterBtn.textContent = letters[i];
        answerText.textContent = answer['answer'];

        answerTemplate.setAttribute("correct-answer", answer["correct"]);

        // remover hide e template class
        answerTemplate.classList.remove("hide");
        answerTemplate.classList.remove("answer-template");

        // inserir as alternativas
        answersBox.appendChild(answerTemplate);

        // inserir evento de click
        answerTemplate.addEventListener("click", function() {
            checkAnswer(this);
        })
    })

    // incrementar  o numero da questao
    actualQuestion++;

}


// Verificando a resposta do usuario
function checkAnswer(btn){
    // seleciona todos os botoes
    const buttons = answersBox.querySelectorAll("button");
    // verifica se a resposta esta correta
    buttons.forEach(function(button){
        if(button.getAttribute("correct-answer") === 'true'){
            button.classList.add("correct-answer");

            //checa se o usuario acertou a pergunta
            if(btn == button){
                // incremento dos pontos
                points++;
            }

        } else {
            button.classList.add("wrong-answer");
        }
    });

    // exibir proxima pergunta
    nextQuestion()

}

// exibi a proxima pergunta no quizz
function nextQuestion(){
    // timer para o usuario ver as respostas
    setTimeout(function(){
        // verifica se ainda há perguntas
        if(actualQuestion >= questions.length){
            // mensagem de sucesso
            showSuccessMessage();
            return
        }

    createQuestion(actualQuestion);

    }, 5000)
}

// exibe a tela final
function showSuccessMessage(){
    hideOrShowQuizz();

    // trocar dados da tela de sucesso

    // calcular score
    const score = ((points / questions.length) * 100).toFixed(2);

    const displayScore = document.querySelector("#display-score span");
    displayScore.textContent = score.toString();

    // alterar o numero de perguntas corretas
    const correctAnswer = document.querySelector("#correct-answers");
    correctAnswer.textContent = points;

    // alterar o total de perguntas
    const totalQuestions = document.querySelector("#questions-qty");
    totalQuestions.textContent = questions.length;
}

function hideOrShowQuizz(){
    quizzContainer.classList.toggle("hide");
    scoreContainer.classList.toggle("hide");
}

// Reiniciar quizz
const restartBtn = document.querySelector("#restart");
restartBtn.addEventListener("click", function(){
    // zerar o jogo
    actualQuestion = 0;
    points = 0;
    hideOrShowQuizz();
    init();
})

// Inicia o jogo
init();
