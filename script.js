document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      header.style.position = "sticky";
      header.style.top = "0px";
    } else {
      header.style.position = "static";
    }
  });
});

const NUMBER_OF_SNOWFLAKES = 300;
const MAX_SNOWFLAKE_SIZE = 5;
const MAX_SNOWFLAKE_SPEED = 2;
const SNOWFLAKE_COLOUR = "#ddd";
const snowflakes = [];

const canvas = document.createElement("canvas");
canvas.style.position = "absolute";
canvas.style.pointerEvents = "none";
canvas.style.top = "0px";
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");

const createSnowflake = () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  radius: Math.floor(Math.random() * MAX_SNOWFLAKE_SIZE) + 1,
  color: SNOWFLAKE_COLOUR,
  speed: Math.random() * MAX_SNOWFLAKE_SPEED + 1,
  sway: Math.random() - 0.5, // next
});

const drawSnowflake = (snowflake) => {
  ctx.beginPath();
  ctx.arc(snowflake.x, snowflake.y, snowflake.radius, 0, Math.PI * 2);
  ctx.fillStyle = snowflake.color;
  ctx.fill();
  ctx.closePath();
};

const updateSnowflake = (snowflake) => {
  snowflake.y += snowflake.speed;
  snowflake.x += snowflake.sway; // next
  if (snowflake.y > canvas.height) {
    Object.assign(snowflake, createSnowflake());
  }
};

const animate = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snowflakes.forEach((snowflake) => {
    updateSnowflake(snowflake);
    drawSnowflake(snowflake);
  });

  requestAnimationFrame(animate);
};

for (let i = 0; i < NUMBER_OF_SNOWFLAKES; i++) {
  snowflakes.push(createSnowflake());
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

window.addEventListener("scroll", () => {
  canvas.style.top = `${window.scrollY}px`;
});

// setInterval(animate, 15);
animate();

const audioPlayer = document.getElementById("audioPlayer");
const playlist = document.getElementById("playlist");
const songs = playlist.getElementsByTagName("li");

function playSong(song) {
  const songFile = song.getAttribute("data-audio");
  audioPlayer.src = songFile;
  audioPlayer.play();
}

for (let i = 0; i < songs.length; i++) {
  songs[i].addEventListener("click", function () {
    playSong(songs[i]);
  });
}

window.onload = function () {
  playSong(songs[0]);
};

const timerInterval = setInterval(updateCountdown, 1000);

updateCountdown();

const buyButtons = document.querySelectorAll(".buy-button");

buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    alert("Куплено!");
  });
});