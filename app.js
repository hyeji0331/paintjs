const canvas = document.getElementById("jsCanvas");
//mdn ctx 찾아봐
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
//width와 heigt를 설정해줘야만 선이 그려져!!(onMouseMove 정상 작동)
//(캔버스의 사이즈를 알려줘야함)

//디폴트값 설정
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

//일단 처음 들어가면 그리기모드는 아니지
let painting = false;
//채우기도 마찬가지
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    //그리기모드가 false가 아니면 -> 그리기모드가 true이면
    ctx.beginPath();
    //path는 선!
    ctx.moveTo(x, y);
  } else {
    //그리기모드가 멈추면(선을 그리다가 마우스를 떼는 순간)
    ctx.lineTo(x, y);
    ctx.stroke();
    //스트로크는 선을 그리게 하는 ctx 태그임 (스트로크: 획을 긋다)
  }
}

function onMouseUp(event) {
  stopPainting();
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}
//fill버튼 누르면 paint로 바뀌고 paint누르면 fill로 바뀌고!

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}
//filleRect는 채우기 메소드

function handleCM(event) {
  event.preventDefault();
}
//우리는 save버튼을 눌러서 저장하기를 바라지, 우클릭해서 저장하길 원하는게 아냐
//그걸 방지하는게 event.preventDefault(); 임!!!

function handleSaveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "PaintJS[🎨]";
  link.click();
}
//download는 a 태그의 속성. a href 대신 a download 사용 가능(링크로 가는 대신 url을 다운로드해라)

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  //onMouseMove가 메인!!
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}
//contextmenu 이벤트는 마우스 우클릭했을때 뜨는 그거!

Array.from(colors).forEach((color) =>
  color.addEventListener("click", handleColorClick)
);
//Array.from 메소드는 object로부터 어레이를 만듦
//그 어레이 안에서 forEach로 color를 가질 수 있음.

if (range) {
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleSaveClick);
}
