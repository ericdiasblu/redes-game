document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    container.classList.add('zoom-in'); // Adiciona a animação de zoom in ao carregar a página
});

const allQuestions = [
    { 
        question: "Qual é a principal diferença entre cabos UTP e STP?", 
        answers: [
            { text: "Blindagem adicional", correct: true }, 
            { text: "Custo mais baixo", correct: false }, 
            { text: "Mais flexível", correct: false }, 
            { text: "Melhor velocidade", correct: false }
        ] 
    },
    { 
        question: "Quando é mais vantajoso utilizar fibra óptica em vez de cabeamento de rede convencional?", 
        answers: [
            { text: "Facilidade de instalação", correct: false }, 
            { text: "Longas distâncias", correct: true }, 
            { text: "Compatibilidade universal", correct: false }, 
            { text: "Baixo custo", correct: false }
        ] 
    },
    { 
        question: "Qual é a topologia de rede mais recomendada para uma casa de 120m² com diversos dispositivos?", 
        answers: [
            { text: "Topologia em estrela", correct: true }, 
            { text: "Topologia em barramento", correct: false }, 
            { text: "Topologia em anel", correct: false }, 
            { text: "Topologia mesh", correct: false }
        ] 
    },
    { 
        question: "Por que o uso de Ethernet é preferível para PCs em uma rede residencial?", 
        answers: [
            { text: "Menor custo", correct: false }, 
            { text: "Conexão sem fio", correct: false },
            { text: "Maior estabilidade", correct: true },  
            { text: "Mais fácil de instalar", correct: false }
        ] 
    },
    { 
        question: "Como a demanda por dispositivos IoT pode influenciar a escolha do cabeamento?", 
        answers: [
            { text: "Menos dispositivos", correct: false }, 
            { text: "Custo mais alto", correct: false }, 
            { text: "Simplicidade na instalação", correct: false },
            { text: "Rede robusta necessária", correct: true }, 

        ] 
    },
    { 
        question: "Qual é a vantagem de usar switches gerenciáveis em um comércio de médio porte?", 
        answers: [
            { text: "Controle e eficiência", correct: true }, 
            { text: "Mais fácil de usar", correct: false }, 
            { text: "Conexão sem fio", correct: false }, 
            { text: "Redução de custos", correct: false }
        ] 
    },
    { 
        question: "Qual a função de um servidor em um comércio de médio porte?", 
        answers: [
            { text: "Conectar dispositivos", correct: false }, 
            { text: "Armazenar e gerenciar", correct: true }, 
            { text: "Reduzir o custo", correct: false }, 
            { text: "Aumentar a velocidade", correct: false }
        ] 
    },
    { 
        question: "Por que é importante ter um sistema de monitoramento de câmeras de segurança conectado à rede?", 
        answers: [
            { text: "Reduzir custos", correct: false }, 
            { text: "Melhorar sinal", correct: false },
            { text: "Acesso remoto seguro", correct: true }, 
            { text: "Facilitar instalação", correct: false }
        ] 
    },
    { 
        question: "Como o Cisco Packet Tracer pode ser útil na configuração de redes?", 
        answers: [
            { text: "Simulação de redes", correct: true }, 
            { text: "Redução de custos", correct: false }, 
            { text: "Melhorar sinal", correct: false }, 
            { text: "Aumentar velocidade", correct: false }
        ] 
    },
    { 
        question: "Qual dos seguintes dispositivos seria mais adequado para conectar PCs em um comércio?", 
        answers: [
            { text: "Roteador sem fio", correct: false }, 
            { text: "Switch gerenciável", correct: true }, 
            { text: "Modem DSL", correct: false }, 
            { text: "Repetidor de sinal", correct: false }
        ] 
    }
    
    
];
let score = 0;
let currentQuestionIndex = 0;
let selectedQuestions = allQuestions; // Usar perguntas na ordem original

function startGame() {
    score = 0; // Reinicia o score
    currentQuestionIndex = 0; // Reinicia o índice da pergunta

    document.getElementById('score-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    document.querySelector('hr').style.display = 'block'; // Mostra a linha
    document.getElementById('questionIndex').style.display = 'block'; // Mostra o índice da pergunta
    showQuestion(selectedQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
    const questionElement = document.getElementById('question');
    const answersElement = document.getElementById('answers');
    questionElement.innerText = question.question;
    answersElement.innerHTML = '';

    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer');
        button.addEventListener('click', () => selectAnswer(answer));
        answersElement.appendChild(button);
    });

    const questionIndexElement = document.getElementById("questionIndex");
    questionIndexElement.innerText = `${currentQuestionIndex + 1}`;
}

function selectAnswer(answer) {
    const correctColor = '#4CAF50'; // Verde escuro
    const wrongColor = '#F44336'; // Vermelho

    if (answer.correct) {
        score++;
    } else {
        highlightIncorrectAnswers();
    }

    const answers = document.querySelectorAll('.answer');
    answers.forEach(button => {
        button.disabled = true;
        if (button.innerText === answer.text) {
            button.style.backgroundColor = answer.correct ? correctColor : wrongColor;
        } else if (button.innerText === allQuestions[currentQuestionIndex].answers.find(a => a.correct).text) {
            button.style.backgroundColor = correctColor;
        }
    });

    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < selectedQuestions.length) {
            showQuestion(selectedQuestions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }, 1000);
}

function highlightIncorrectAnswers() {
    const answers = document.querySelectorAll('.answer');
    answers.forEach(button => {
        if (!allQuestions[currentQuestionIndex].answers.find(a => a.text === button.innerText).correct) {
            button.style.backgroundColor = '#F44336'; // Vermelho
        }
    });
}

function showScore() {
    document.getElementById('quiz-container').style.display = 'none';

    document.querySelector('hr').style.display = 'none'; // Oculta a linha
    document.getElementById('questionIndex').style.display = 'none'; // Oculta o índice da pergunta
    
    const apelido = getApelido(score);
    const scoreElement = document.getElementById('score');
    const apelidoElement = document.getElementById('apelido');

    scoreElement.innerText = `Você acertou ${score} de ${selectedQuestions.length} perguntas!`;
    apelidoElement.innerText = `${apelido}`;

    document.getElementById('score-container').style.display = 'block';
}

function getApelido(acertos) {
    if (acertos === 10) {
        return "Gênio";
    } else if (acertos >= 8) {
        return "Expert";
    } else if (acertos >= 6) {
        return "Sábio";
    } else if (acertos >= 4) {
        return "Estudioso";
    } else if (acertos >= 2) {
        return "Curioso";
    } else if (acertos === 1) {
        return "Iniciante";
    } else {
        return "Desafiante";
    }
}

// Função para reiniciar o jogo
document.getElementById('restart-button').addEventListener('click', () => {
    startGame();
    document.getElementById('score-container').style.display = 'none'; // Esconde a tela de pontuação
    document.getElementById('quiz-container').style.display = 'block'; // Mostra o quiz novamente
});

// Inicia o jogo
startGame();
