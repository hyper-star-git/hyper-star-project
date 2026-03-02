
// Scroll Animation.
const sections = document.querySelectorAll("section");
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    if(sec.getBoundingClientRect().top < window.innerHeight - 100){
      sec.classList.add("show");
    }
  });
});

// Floating squares.
const bg = document.getElementById("bg");
for(let i=0;i<70;i++){
  const pixel = document.createElement("div");
  pixel.className="pixel";
  pixel.style.left=Math.random()*100+"vw";
  pixel.style.animationDuration=12+Math.random()*10+"s";
  bg.appendChild(pixel);
}