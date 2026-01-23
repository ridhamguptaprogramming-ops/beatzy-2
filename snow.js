setInterval(()=>{
  const snow=document.createElement("div");
  snow.innerHTML="❄";
  snow.style.position="fixed";
  snow.style.top="-10px";
  snow.style.left=Math.random()*100+"vw";
  snow.style.fontSize=Math.random()*20+10+"px";
  snow.style.opacity=Math.random();
  snow.style.transition="top 5s linear";
  document.body.appendChild(snow);

  setTimeout(()=>snow.style.top="110vh",50);
  setTimeout(()=>snow.remove(),5000);
},300);

