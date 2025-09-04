let tentativasNomeNamorado = 0;
let currentQuestion = 0;

function showPopup(message, callback) {
  const popup = document.getElementById('popup-container');
  const popupMsg = document.getElementById('popup-message');
  popupMsg.innerText = message;
  popup.classList.remove('hidden');
  document.getElementById('popup-ok').onclick = function() {
    popup.classList.add('hidden');
    if (callback) callback();
  };
}

function introYes() {
  document.getElementById('intro-form').classList.add('hidden');
  document.getElementById('form-page1').classList.remove('hidden');
}

function introNo() {
  showPopup("ENTÃO NÃO É PRA VOCÊ 😡");
}

function validatePage1() {
  const primeiro = document.getElementById('primeiroNome').value.trim().toLowerCase();
  const segundo = document.getElementById('segundoNome').value.trim().toLowerCase();
  const beleza = parseInt(document.getElementById('beleza').value);

  if (primeiro !== "maria" || segundo !== "luiza") {
    showPopup("ERROU! VOCÊ É ELA MESMO???🤨​");
    return;
  }
  if (beleza < 10) {
    showPopup("SÓ ISSO DE BELEZA??? TÁ ERRADO!!!😠​");
    return;
  }

  document.getElementById('form-page1').classList.add('hidden');
  document.getElementById('form-page2').classList.remove('hidden');
}

function validatePage2() {
  const nomeCompleto = document.getElementById('nomeCompleto').value.trim().toLowerCase();
  const nomeNamorado = document.getElementById('nomeNamorado').value.trim().toLowerCase();
  const idadeNamorado = parseInt(document.getElementById('idadeNamorado').value);

  if (!nomeCompleto.includes("maria luiza dos santos carneiro")) {
    showPopup("Seu nome Completo hein!");
    return;
  }

  if (idadeNamorado < 29) {
    showPopup("Fico lisonjeado, mas tá errado a idade 😡");
    return;
  }

  if (idadeNamorado > 29) {
    showPopup("Hey, não sou tão velho assim tbm né 😤");
    return;
  }

  if (idadeNamorado !== 29) {
    showPopup("Idade do namorado incorreta 😡");
    return;
  }

  if (nomeNamorado === "lucas") {
    showPopup("O do namorado completo tbm fia, tá achando que é bagunça");
    return;
  }

  if (nomeNamorado === "lucas henrique") {
    showPopup("COMPLETO!!");
    return;
  }

  if (!nomeNamorado.includes("lucas henrique monteiro ferreira")) {
    tentativasNomeNamorado++;
    const frases = [
      "Só pode ser piada né? 🤡​",
      "Ha ha ha, muito engraçado 🙄",
      "Tá inventando história agora? 🤔",
      "Piadas, Humor 🐒​"
    ];
    let frase = frases[(tentativasNomeNamorado - 1) % frases.length];
    showPopup(frase);
    return;
  }

  showPopup("Agora sim 😎", () => {
    document.getElementById('form-page2').classList.add('hidden');
    document.getElementById('quiz').classList.remove('hidden');
  });
}

/* QUIZ */
const questions = [
  {
    question: "Qual foi nosso primeiro encontro?",
    options: ["Cinema", "Restaurante", "Parque", "Shopping"],
    answer: 2
  },
  {
    question: "Qual nossa comida favorita juntos?",
    options: ["Pizza", "Sushi", "Hambúrguer", "Churrasco"],
    answer: 1
  },
  {
    question: "Qual foi nossa primeira viagem?",
    options: ["Praia", "Montanha", "Cidade grande", "Interior"],
    answer: 0
  },
  {
    question: "Qual cor eu mais gosto?",
    options: ["Roxo", "Azul", "Rosa", "Preto"],
    answer: 1
  },
  {
    question: "Qual foi a primeira coisa que mandei no seu Instagram quando te conheci?",
    options: ["Cantada", "Foto", "Oi tudo bem?", "Faz o L"],
    answer: 0
  },
  {
    question: "Qual foi o meu presente mais significativo pra você?",
    options: ["Aliança", "Ursinho", "Buquê de Chocolate", "Colar"],
    answer: 0
  }
];

function startQuiz() {
  document.querySelector('.heart-button').classList.add('hidden');
  document.getElementById('quiz-content').classList.remove('hidden');
  currentQuestion = 0;
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-title').innerText = q.question;
  document.getElementById('quiz-progress').innerText = `${currentQuestion + 1}/${questions.length}`;

  const container = document.getElementById('questions-container');
  container.innerHTML = "";
  q.options.forEach((opt, index) => {
    const div = document.createElement("div");
    div.classList.add("option");
    div.innerText = opt;
    div.onclick = () => checkAnswer(div, index);
    container.appendChild(div);
  });
}

/* Fogos de artifício */
function startFireworks() {
  const canvas = document.getElementById("fireworks");
  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  let particles = [];

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createFirework(x, y) {
    let count = 100;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: x,
        y: y,
        angle: random(0, Math.PI * 2),
        speed: random(2, 6),
        radius: 2,
        alpha: 1,
        decay: random(0.01, 0.02),
        color: `hsl(${random(0, 360)},100%,50%)`
      });
    }
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
      p.x += Math.cos(p.angle) * p.speed;
      p.y += Math.sin(p.angle) * p.speed;
      p.alpha -= p.decay;
      if (p.alpha <= 0) {
        particles.splice(i, 1);
      }
      ctx.globalAlpha = p.alpha;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    requestAnimationFrame(animate);
  }

  // dispara fogos em intervalos aleatórios
  let interval = setInterval(() => {
    createFirework(random(0, canvas.width), random(0, canvas.height / 2));
  }, 800);

  animate();

  // parar depois de 10 segundos
  setTimeout(() => {
    clearInterval(interval);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 6000);
}


function checkAnswer(selected, index) {
  const q = questions[currentQuestion];
  const options = document.querySelectorAll(".option");

  options.forEach((opt, i) => {
    opt.onclick = null;
    if (i === q.answer) {
      opt.classList.add("correct");
      opt.innerHTML += ' <span class="icon">✅</span>';
    }
    if (i === index && i !== q.answer) {
      opt.classList.add("incorrect");
      opt.innerHTML += ' <span class="icon">❌</span>';
    }
  });

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < questions.length) {
      loadQuestion();
    } else {
      document.getElementById('questions-container').innerHTML = "<h2>Parabéns minha Princesa! Respondeu tudo certinho!</h2>";
      document.getElementById('question-title').innerText = "";
      document.getElementById('quiz-progress').innerText = "";
      startFireworks();

    }
  }, 2000);
}

/* Corações animados */
function createHeart() {
  const heart = document.createElement('div');
  heart.classList.add('heart');
  heart.innerText = '❤';
  heart.style.left = Math.random() * 100 + 'vw';
  heart.style.fontSize = (Math.random() * 20 + 10) + 'px';
  heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.getElementById('hearts-container').appendChild(heart);
  setTimeout(() => { heart.remove(); }, 5000);
}
setInterval(createHeart, 500);
