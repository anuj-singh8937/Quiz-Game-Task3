const quizData = [
  {
    type: "single",
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    answer: "Paris"
  },
  {
    type: "multi",
    question: "Which of the following are programming languages?",
    options: ["HTML", "Python", "JavaScript", "CSS"],
    answer: ["Python", "JavaScript"]
  },
  {
    type: "fill",
    question: "Fill in the blank: The chemical symbol for water is ____.",
    answer: "H2O"
  }
];

const quizContainer = document.getElementById("quiz");

quizData.forEach((q, index) => {
  const div = document.createElement("div");
  div.className = "question";
  div.innerHTML = `<p>${index + 1}. ${q.question}</p>`;

  if (q.type === "single") {
    const opts = q.options.map(opt =>
      `<label><input type="radio" name="q${index}" value="${opt}">${opt}</label><br>`
    ).join("");
    div.innerHTML += `<div class="options">${opts}</div>`;
  } else if (q.type === "multi") {
    const opts = q.options.map(opt =>
      `<label><input type="checkbox" name="q${index}" value="${opt}">${opt}</label><br>`
    ).join("");
    div.innerHTML += `<div class="options">${opts}</div>`;
  } else if (q.type === "fill") {
    div.innerHTML += `<input type="text" name="q${index}" />`;
  }

  quizContainer.appendChild(div);
});

document.getElementById("submit").addEventListener("click", () => {
  let score = 0;

  quizData.forEach((q, index) => {
    const name = `q${index}`;
    if (q.type === "single") {
      const selected = document.querySelector(`input[name="${name}"]:checked`);
      if (selected && selected.value === q.answer) score++;
    } else if (q.type === "multi") {
      const selected = Array.from(document.querySelectorAll(`input[name="${name}"]:checked`)).map(el => el.value);
      if (JSON.stringify(selected.sort()) === JSON.stringify(q.answer.sort())) score++;
    } else if (q.type === "fill") {
      const textInput = document.querySelector(`input[name="${name}"]`);
      if (textInput && textInput.value.trim().toLowerCase() === q.answer.toLowerCase()) score++;
    }
  });

  document.getElementById("result").textContent = `Your score: ${score} / ${quizData.length}`;
});