
/* ===============================
  背景 (あ)
================================ */
//オブジェクトを保存するタグ.
const bg_a_drop = document.getElementById("bg-a-drop");

function createDrop() {
  const drop = document.createElement('div');
  drop.className = 'a-drop';
  drop.textContent = 'あ';

  //横位置ランダム.
  drop.style.left = Math.random() * 100 + 'vw';
  //ランダムサイズで奥行き感.
  const size = 16 + Math.random() * 24; // 16px〜40px
  drop.style.fontSize = size + 'px';
  //透明度もサイズに連動.
  drop.style.setProperty('--opacity', (0.4 + (size/40)*0.6).toFixed(2));
  //落下時間もサイズに連動.
  const duration = 3 + (40 - size) / 10; 
  drop.style.animationDuration = duration + 's';
  //ランダム遅延.
  drop.style.animationDelay = Math.random() * 5 + 's';

  //位置再抽選のため、落ちた後は再召喚する.
  drop.addEventListener('animationend', () => {
    bg_a_drop?.removeChild(drop);
    createDrop();
  });

  bg_a_drop?.appendChild(drop);
}
//生成処理.
if (bg_a_drop){
    for (let i = 0; i < 50; i++) {
      createDrop();
    }
}

/* ===============================
  背景 (?)
================================ */
//オブジェクトを保存するタグ.
const bg_q = document.getElementById("bg-question");

function spawnQuestion(){

  const q = document.createElement("div");
  q.className="bg-question";
  q.textContent="?";

  q.style.left = Math.random()*100+"vw";
  q.style.top = Math.random()*100+"vh";

//  q.style.fontSize = 10 + Math.random()*10 + "px";
  q.style.fontSize = "clamp(12px, 2.5vw, 36px)";

  bg_q.appendChild(q);
  setTimeout(()=>q.remove(),4000);
}
//生成処理.
if (bg_q){
  setInterval(spawnQuestion,200);
}

/* ===============================
  文章の折りたたみ
================================ */
document.querySelectorAll(".spoiler-btn").forEach(button => {
  button.addEventListener("click", function(){

    const section = this.closest("section");
    const content = section.querySelector(".spoiler-content");

    content.classList.add("show");

    this.classList.add("hide");
  });
});

/* ===============================
  路線図
================================ */
const dots = document.querySelectorAll(".dot");

let index = 0;

function animateRoute(){

  dots.forEach(dot => {
    dot.style.background = "#ccc";
    dot.style.boxShadow = "none";
  });

  const station = dots[index];
  const color = station.parentElement.style.getPropertyValue("--color");

  station.style.background = color;
  station.style.boxShadow = `0 0 10px ${color}`;

  index++;

  if(index >= dots.length){
    index = 0;
  }
}

setInterval(animateRoute, 700);
