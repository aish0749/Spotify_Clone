console.log("Welcome to Spotify");
let songindex=0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myprogressbar');
let songItems=Array.from(document.getElementsByClassName('songitem'));
let masterSongName=document.getElementById('masterSongName');
let songItemPlay=document.getElementsByClassName('songItemPlay');

let songs = [
    {songName:"Let me Love you", filePath : "songs/1.mp3", coverPath : "covers/cover1.png"},
    {songName:"Hymn for the Weekend", filePath : "songs/2.mp3", coverPath : "covers/cover2.png"},
    {songName:"Perfect", filePath : "songs/3.mp3", coverPath : "covers/cover3.png"},
    {songName:"Baby", filePath : "songs/4.mp3", coverPath : "covers/cover4.png"},
    {songName:"Shape of You", filePath : "songs/5.mp3", coverPath : "covers/cover5.png"},
    {songName:"On my Way", filePath : "songs/6.mp3", coverPath : "covers/cover6.png"},
    {songName:"Dont Let me Down", filePath : "songs/7.mp3", coverPath : "covers/cover7.png"}
]

// audioElement.play();

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
});

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
    }
})

audioElement.addEventListener('timeupdate', ()=>{
    // console.log('timeupdate')
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    // console.log(progress);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songindex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songindex+1}.mp3`;
        audioElement.currentTime=0;
        audioElement.play();
        masterSongName.innerText=songs[songindex].songName;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');

    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songindex>=6){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText=songs[songindex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<=0){
        songindex=6;
    }
    else{
        songindex-=1;
    }
    audioElement.src=`songs/${songindex+1}.mp3`;
    audioElement.currentTime=0;
    audioElement.play();
    masterSongName.innerText=songs[songindex].songName;
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})