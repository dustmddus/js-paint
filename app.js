const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsPenSize");
const mode = document.getElementById("modeBtn");
const colors = document.getElementsByClassName("color");
const saveBtn = document.getElementById("saveBtn");

const CANVAS_SIZE = 500;
const INITIAL_COLOR = "black";

let painting = false;
let filling = false;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

//배경을 설정하지 않고 이미지 파일을 저장하면 배경이 transparent로 설정이 되는데 그것을 흰 배경으로 만들어주기 위한 코드
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

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
  let x = event.offsetX;
  let y = event.offsetY;
  if (!painting) {
    //그리고 있지 않을 때 path를 찾아야한다. (마우스의 위치) 경로를 시작하거나 현재 경로를 재설정 한다.
    ctx.beginPath();
  } else {
    ctx.lineTo(x, y); //선 연결
    ctx.stroke(); //선 그리기
  }
}

function onMouseEnter(event) {
  x = event.offsetX;
  y = event.offsetY;

  ctx.moveTo(x, y);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Line";
  } else {
    filling = true;
    mode.innerText = "Fill";
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

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick() {
  const image = canvas.toDataURL(); //default 가 png이다.
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[EXPORT]";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove); //붓을 움직이면
  canvas.addEventListener("mousedown", startPainting); //붓으로 그리기 시작(첫 터치)
  document.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("mouseenter", onMouseEnter);
  canvas.addEventListener("contextmenu", handleCM); //context menu는 마우스 우클릭시 나오는 메뉴를 말한다.
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
