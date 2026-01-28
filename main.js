const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDarkMode = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
});

document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('dark-mode');
    themeToggle.textContent = '🌙';
  }
});
let drawCount = 0;

    function getBallColor(num) {
      if (num <= 10) return 'yellow';
      if (num <= 20) return 'blue';
      if (num <= 30) return 'red';
      if (num <= 40) return 'gray';
      return 'green';
    }

    function drawLotto() {
      const numbers = [];
      while (numbers.length < 7) {
        const num = Math.floor(Math.random() * 45) + 1;
        if (!numbers.includes(num)) {
          numbers.push(num);
        }
      }

      const mainNumbers = numbers.slice(0, 6).sort((a, b) => a - b);
      const bonusNumber = numbers[6];

      const mainBallsContainer = document.getElementById('mainBalls');
      mainBallsContainer.innerHTML = '';

      mainNumbers.forEach((num, index) => {
        setTimeout(() => {
          const ball = document.createElement('div');
          ball.className = `ball ${getBallColor(num)} animate`;
          ball.textContent = num;
          mainBallsContainer.appendChild(ball);
        }, index * 100);
      });

      setTimeout(() => {
        const bonusBallContainer = document.getElementById('bonusBall');
        bonusBallContainer.innerHTML = '';
        const bonusBall = document.createElement('div');
        bonusBall.className = `ball ${getBallColor(bonusNumber)} animate`;
        bonusBall.textContent = bonusNumber;
        bonusBallContainer.appendChild(bonusBall);
      }, 700);

      drawCount++;
      addToHistory(mainNumbers, bonusNumber);
    }

    function addToHistory(numbers, bonus) {
      const historyList = document.getElementById('historyList');

      if (drawCount === 1) {
        historyList.innerHTML = '';
      }

      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `<strong>#${drawCount}</strong> : ${numbers.join(', ')} + <span style="color: #764ba2;">${bonus}</span>`;

      historyList.insertBefore(historyItem, historyList.firstChild);
    }