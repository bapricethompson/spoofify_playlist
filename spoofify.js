let audio = new Audio();
let playButton =document.querySelector("#playButton");
let timeDiv=document.querySelector("#time");
let stopButton =document.querySelector("#stop");
let replayButton =document.querySelector("#replay");
let progressBar = document.querySelector('#progress-bar');
let progressBarVol = document.querySelector('#progress-bar-vol');
let volUp = document.querySelector('#volUp');
let volDown = document.querySelector('#volDown');
let rewind=document.querySelector("#rewind");
let forward=document.querySelector("#fastForward");

let nameH2=document.querySelector("#songName");
let artistH5=document.querySelector("#artistName");

let songList = document.querySelector("#songCollection")

let songCollection = [
    {
        name: "Man, I Feel Like A Woman!",
        artist: "Shania Twain",
        filename: "woman.mp3"
    },
    {
        name: "Girls Just Wanna Have Fun",
        artist: "Cyndi Lauper",
        filename: "havefun.mp3"
    },
    {
        name: "Pink Pony Club",
        artist: "Chappell Roan",
        filename: "pinkpony.mp3"
    },
    {
        name: "Get the Party Started",
        artist: "P!nk",
        filename: "party.mp3"
    },
    {
        name: "Fergalicious (feat. will.i.am)",
        artist: "Fergie",
        filename: "ferg.mp3"
    }];

    let currentSongInd = -1;  
    let songItems = [];  
    
    function showSongs() {
        for (let i = 0; i < songCollection.length; i++) {
            let song = songCollection[i];
            let newLi = document.createElement("li");
            songList.appendChild(newLi);

            let trackNumberDiv = document.createElement("div");
            trackNumberDiv.textContent = `${i + 1}.`;  
            trackNumberDiv.classList.add("numDiv");
            newLi.appendChild(trackNumberDiv);

            let bigDiv = document.createElement("div");
            bigDiv.classList.add("bigDiv");
        
            let nameDiv = document.createElement("div");
            nameDiv.textContent = song.name;
            bigDiv.appendChild(nameDiv);
        
            let artistDiv = document.createElement("div");
            artistDiv.textContent = song.artist;
            bigDiv.appendChild(artistDiv);

            newLi.appendChild(bigDiv);
             
        
            songItems.push(newLi);
    
            newLi.addEventListener("click", function() {
                playSong(i);  
            });
        }
    }
    
    function playSong(index) {
        
        songItems.forEach(item => item.style.backgroundColor="#E47A85");
    
        
        currentSongInd = index;
    
        
        songItems[currentSongInd].style.backgroundColor = "#7D3D4B";
    
        
        nameH2.textContent = songCollection[currentSongInd].name;
        artistH5.textContent = songCollection[currentSongInd].artist;
    
        
        audio.src = songCollection[currentSongInd].filename;
        audio.currentTime = 0;
        audio.play();
    }
    
    
    showSongs();


audio.addEventListener('ended', () => {
            if (currentSongInd<songCollection.length-1){
                currentSongInd+=1;
            }
            else{
                currentSongInd=0;
            }
            playSong(currentSongInd);
            
        });


rewind.addEventListener("click", function(){
    if (currentSongInd != 0){
        currentSongInd-=1;
    }
    else{
        currentSongInd=songCollection.length-1;
    }
    playSong(currentSongInd);

});


forward.addEventListener("click", function(){
    if (currentSongInd != songCollection.length-1){
        currentSongInd+=1;
    }
    else{
        currentSongInd=0;
    }
    playSong(currentSongInd);

});




volUp.addEventListener("click",function(){
    if (audio.volume != 1){
        audio.volume =audio.volume+.1;
    }
});

volDown.addEventListener("click",function(){
    if (audio.volume != 0){
        audio.volume =audio.volume-.1;
    }
});

audio.addEventListener('timeupdate', function() {
    const progress = (audio.volume/ 1) * 100;
    progressBarVol.style.width = progress + '%';
});

function formatTime(seconds){
    let minutes = Math.floor(seconds/60);
    let sec = Math.floor(seconds % 60);

    if (minutes < 10){
        minutes="0"+minutes.toString();
    }
    if (sec < 10){
        sec="0"+sec.toString();
    }
    return minutes + ":"+sec;

}

audio.addEventListener("play", function(){
    playButton.textContent = "pause_circle";
})

audio.addEventListener("pause", function(){
    playButton.textContent = "play_circle";
})

playButton.addEventListener("click", function(){
    if (audio.paused){
        audio.play();
    }
    else{
        audio.pause();
    }
});


stopButton.addEventListener("click", function(){
    audio.pause();
    audio.currentTime=0;
});
replayButton.addEventListener("click", function(){
    audio.currentTime=audio.currentTime-10;
});

audio.addEventListener('timeupdate', function() {
    const progress = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = progress + '%';
});

timeDiv.textContent=audio.currentTime; //convert to minutes and seconds
setInterval(function () {
    timeDiv.textContent=formatTime(audio.currentTime);
 }, 100) //ten times per sec
