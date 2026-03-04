
//オブジェクトを保存するタグ.
const a_drop = document.getElementById("bg-a-drop");

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
    a_drop?.removeChild(drop);
    createDrop();
  });

  a_drop?.appendChild(drop);
}

//初期生成.
if (a_drop){
    for (let i = 0; i < 50; i++) {
      createDrop();
    }
}