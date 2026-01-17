const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
if (!fs.existsSync("songs.json")) fs.writeFileSync("songs.json","[]");

const upload = multer({ dest: "uploads/" });

app.get("/", (req,res)=>res.send("Server Running"));

app.get("/songs",(req,res)=>{
  res.json(JSON.parse(fs.readFileSync("songs.json")));
});

app.post("/upload",
  upload.fields([{name:"song"},{name:"cover"}]),
  (req,res)=>{
    const songs = JSON.parse(fs.readFileSync("songs.json"));
    songs.push({
      title:req.body.title,
      artist:req.body.artist,
      src:"/uploads/"+req.files.song[0].filename,
      cover:"/uploads/"+req.files.cover[0].filename,
      plays:0
    });
    fs.writeFileSync("songs.json",JSON.stringify(songs,null,2));
    res.json({success:true});
  }
);

app.listen(PORT,()=>console.log("Running on http://localhost:"+PORT));
