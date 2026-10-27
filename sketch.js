let spriteSheet;
let frames = [];
const totalFrames = 8;
const sheetWidth = 1425;
const sheetHeight = 125;
let frameWidth;

// 角色位置與狀態變數
let x, y;
let speed = 4;
let currentFrame = 0;
let animTimer = 0;
let animSpeed = 6; // 控制動畫播放速度（數字越小越快）
let isMoving = false;
let direction = 1; // 1 表示面向右邊，-1 表示面向左邊

function preload() {
  // 直接讀取你上傳的精靈圖檔名 all.png
  spriteSheet = loadImage('all.png', 
    () => console.log('圖片載入成功！'), 
    () => console.error('圖片載入失敗，請確認 all.png 是否與程式碼放在同一個資料夾！')
  );
}

function setup() {
  // 建立全螢幕畫布
  createCanvas(windowWidth, windowHeight);

  // 計算單張影格寬度 (1425 / 8 = 178.125)
  frameWidth = sheetWidth / totalFrames;

  // 切割圖片精靈成 8 張獨立的圖片
  for (let i = 0; i < totalFrames; i++) {
    let img = spriteSheet.get(i * frameWidth, 0, frameWidth, sheetHeight);
    frames.push(img);
  }

  // 設定角色初始位置於畫面中央
  x = width / 2;
  y = height / 2;

  imageMode(CENTER);
}

function draw() {
  // 設定背景顏色 #caf0f8
  background('#caf0f8');

  // 每次畫布更新前重置移動狀態
  isMoving = false;

  // 鍵盤按鍵偵測 (左右方向鍵)
  if (keyIsDown(RIGHT_ARROW)) {
    x += speed;
    direction = 1;  // 面向右
    isMoving = true;
  } else if (keyIsDown(LEFT_ARROW)) {
    x -= speed;
    direction = -1; // 面向左
    isMoving = true;
  }

  // 動畫影格切換邏輯
  if (isMoving) {
    animTimer++;
    if (animTimer >= animSpeed) {
      currentFrame = (currentFrame + 1) % totalFrames;
      animTimer = 0;
    }
  } else {
    // 靜止時固定顯示第一影格
    currentFrame = 0;
    animTimer = 0;
  }

  // 繪製角色（包含左右鏡像翻轉處理）
  push();
  translate(x, y);
  scale(direction, 1); // 透過 scale 實現向左時水平翻轉
  image(frames[currentFrame], 0, 0);
  pop();
}

// 當瀏覽器視窗大小改變時，自動調整畫布大小
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}