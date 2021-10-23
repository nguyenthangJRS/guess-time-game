"use strict";


const timer = document.getElementById("timer");
const start = document.getElementById("start");
const stop = document.getElementById("stop");
const reset = document.getElementById("reset");
const time_container = document.querySelector('.time-container');
const message_container = document.querySelector('.message-container');

let startTime;       
let timeoutid;       
let stopTime = 0;    
let music;


// ボタンを"初期"状態とする
setButtonStateInitial()

// Startボタンクリック
start.addEventListener("click",
  function() {
    // ボタンをタイマー"動作中"状態とする
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  },false
);

// Stopボタンクリック
stop.addEventListener("click",
  function() {
    // タイマーを"停止中"状態とする
    setButtonStateStopped();
    clearTimeout(timeoutid); 
    stopTime = Date.now() - startTime;

    // check time equals 10s
    if(parseInt(timer.innerHTML.substr(3,2)) === 10){
      audio('sound/true2.mp3');
      time_container.style.animation = `trueTime ${2}s ease-in-out forwards`;
      time_container.querySelectorAll('i').forEach(e => e.style.color = '#e17055');
      message_container.querySelectorAll('i').forEach(e => e.style.color = '#e17055');
      time_container.addEventListener('animationend',() =>{
        time_container.style.animation = `none`;
      })
    }
    else{
      audio('sound/false1.mp3');
      time_container.style.animation = `falseTime ${2}s ease-in-out forwards`;
      time_container.addEventListener('animationend',() =>{
        time_container.style.animation = `none`;
      })
    }
  },false
);


// Resetボタンクリック
reset.addEventListener("click",
  function() {
    // ボタンを"初期"状態とする
    setButtonStateInitial()
    timer.textContent = "00:00.000";
    stopTime = 0;
    audio('sound/start.mp3');
    time_container.querySelectorAll('i').forEach(e => e.style.color = 'grey');
    message_container.querySelectorAll('i').forEach(e => e.style.color = 'grey');
  }
);


function countUp() {
  const d = new Date(Date.now() - startTime + stopTime);
  /* padStart()で２桁固定表示とする */
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  const ms = String(d.getMilliseconds()).padStart(3, "0");
  /* 描画 */
  timer.textContent = `${m}:${s}.${ms}`;

  timeoutid = setTimeout(() => {
    //再帰呼び出し
    countUp();
  }, 10);
}

// 初期 または Reset後
function setButtonStateInitial() {
  start.classList.remove("js-inactive");
  stop.classList.add("js-inactive");
  reset.classList.add("js-inactive");
  start.classList.remove("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー動作中
function setButtonStateRunning() {
  timer.classList.add("timer-fontColor_hidden"); //時間を見えなくする
  start.classList.add("js-inactive");   // 非活性
  stop.classList.remove("js-inactive");  // 活性
  reset.classList.add("js-inactive");   // 非活性
  start.classList.add("js-unclickable");
  stop.classList.remove("js-unclickable");
  reset.classList.add("js-unclickable");
}

// 状態:タイマー停止中
function setButtonStateStopped() {
  timer.classList.remove("timer-fontColor_hidden"); //時間を見えるようにする
  timer.classList.add(".timer_appear"); //時間をゆっくり表示
  start.classList.add("js-inactive"); // 活性
  stop.classList.add("js-inactive");    // 非活性
  reset.classList.remove("js-inactive"); // 活性
  start.classList.add("js-unclickable");
  stop.classList.add("js-unclickable");
  reset.classList.remove("js-unclickable");
};
// add audio 
const audio = (music) => {
  music = new Audio(music);
  music.currentTime = 0;
  music.play();
}