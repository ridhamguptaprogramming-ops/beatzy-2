let playing = false;

function toggle(btn){
  playing = !playing;
  btn.textContent = playing ? "⏸" : "▶";
}

document.getElementById("miniPlay").onclick = function(){
  toggle(this);
};

document.getElementById("mainPlay").onclick = function(){
  toggle(this);
};

document.querySelectorAll(".play").forEach(b=>{
  b.onclick = ()=>toggle(b);
});