
/* ===============================
  スクロールアニメーション (content-boxのみ)
================================ */
const sections = document.querySelectorAll(".content-box");

//画面に入ったら出現.
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    }
  });
}, {
  threshold: 0.1
});
sections.forEach(sec => observer.observe(sec));

/* ===============================
  浮遊キューブ
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

  //横揺れ.
  pixel.style.setProperty("--dx", (Math.random()*100 - 50)+"px");

  pixel.style.animationDuration = 15 + Math.random()*15 + "s";
  pixel.style.animationDelay = i * 0.5 + "s"; //順番に出現させる.
  
  //6面を追加.
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
const serialInput = document.getElementById("serial-input");
const serialBtn   = document.getElementById("serial-btn");

//[OK]を押したら.
serialBtn?.addEventListener("click", async () => {

  //大文字小文字どちらでもいいようにする.
  const input = serialInput.value.trim().toUpperCase();
  if (!input) return;

  serialSuccess("http://192.168.56.102/hyper-star-project/ver1/public/pages/kw_star_f3a91c8x.html"); //ページ移動.

  try {
    //Netlify Functionに送信.
    const res = await fetch(
      "/.netlify/functions/check_keywords", //ファイルパス.
      {
        method: "POST",
        headers: { "Content-Type": "application/json" }, //拡張子は".js"
        body: JSON.stringify({ keyword: input })
      }
    );
    //結果を受け取る.
    const data = await res.json();

    //成功.
    if (data.success) {
      serialSuccess(data.url); //ページ移動.
    }
    //失敗. 
    else {
      serialFailure();
    }

    serialInput.value = ""; //入力欄を空に.
  } 
  //エラー.
  catch (err) {
    console.error(err);
    serialInput.value = "Error: 通信エラーが発生しました";
    serialFailure();
  }
});

//成功演出.
function serialSuccess(url){
  const t = document.getElementById("page-transition");
  t.classList.add("active");

  setTimeout(()=>{
    window.location.href = url;
  }, 400);
}

//失敗演出.
function serialFailure(){
  serialInput.classList.add("shake"); //class追加.
  //アニメーション終了後にclassを外す.
  serialInput.addEventListener("animationend", () => {
  serialInput.classList.remove("shake");
  }, { once: true });
}

/* ===============================
  ページ遷移
================================ */
const t = document.getElementById("page-transition");

//ページ読み込み時.
window.addEventListener("load", () => {
  setTimeout(() => {
    t.classList.remove("active");
  }, 50);
});

//戻る/進むでキャッシュから復帰した時.
window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    t.classList.remove("active");
  }
});