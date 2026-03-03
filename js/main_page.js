
/* ===============================
   Scroll Animation
================================ */
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    if(sec.getBoundingClientRect().top < window.innerHeight - 100){
      sec.classList.add("show");
    }
  });
});

/* ===============================
   Floating squares
================================ */
const bg = document.getElementById("bg");

for(let i=0;i<70;i++){
  const pixel = document.createElement("div");
  pixel.className="pixel";

  //初期位置ランダム.
  pixel.style.setProperty("--x", Math.random()*100+"vw");
  pixel.style.setProperty("--z", (Math.random()*400 - 200)+"px");

  //初期角度ランダム.
  pixel.style.setProperty("--rx", Math.random()*360+"deg");
  pixel.style.setProperty("--ry", Math.random()*360+"deg");

  // 横揺れ
  pixel.style.setProperty("--dx", (Math.random()*100 - 50)+"px");

  pixel.style.animationDuration = 15 + Math.random()*15 + "s";
  pixel.style.animationDelay = i * 0.5 + "s"; //順番に出現させる.
  
  // 6面を追加.
  const faces = ["front","back","right","left","top","bottom"];
  faces.forEach(f=>{
    const face = document.createElement("div");
    face.className = f;
    pixel.appendChild(face);
  });

  bg.appendChild(pixel);
}

/* ===============================
   シリアル(キーワード入力)
================================ */
const serialBtn     = document.getElementById("serialBtn");
const serialInput   = document.getElementById("serialInput");
//const secretContent = document.getElementById("secretContent");

/*【キーワードリスト】*/
const keywords = {
  //"キーワード" : "開くモーダルID"
  "STAR": "modal-star",
  "ﾆｮｮｮｮ": "modal-nyo"
};

//[OK]を押したら.
serialBtn.addEventListener("click", async () => {

  //大文字小文字どちらでもいいようにする.
  const input = serialInput.value.trim().toUpperCase();
  if (!input) return;

  try {
    //Netlify Functionに送信.
    const res = await fetch("/.netlify/functions/checkKeyword", {
      method: "POST",
      body: JSON.stringify({ keyword: input })
    });
    //結果を受け取る.
    const data = await res.json();

    //成功.
    if (data.success) {
      window.location.href = data.url; //ページ移動.
    }
    //失敗. 
    else {
    }
  } 
  //エラー.
  catch (err) {
    console.error(err);
  }
  
  serialInput.value = ""; //入力欄を空に.
});
