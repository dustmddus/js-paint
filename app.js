const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsPenSize");
const mode = document.getElementById("modeBtn");
const colors = document.getElementsByClassName("color");

const CANVAS_SIZE = 500;
const INITIAL_COLOR = "black";

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = INITIAL_COLOR; //초기 색깔
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 5;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //그리고 있지 않을 때 path를 찾아야한다. (마우스의 위치) 경로를 시작하거나 현재 경로를 재설정 한다.
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y); //선 연결
    ctx.stroke(); //선 그리기
  }
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Line Mode";
  } else {
    filling = true;
    mode.innerText = "Fill Mode";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;

  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //붓을 움직이면
  canvas.addEventListener("mousedown", startPainting); //붓으로 그리기 시작(첫 터치)
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
