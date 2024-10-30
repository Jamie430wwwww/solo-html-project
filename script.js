//default settings for keyboard keys
const white_Keys_Index = ['c3', 'd3', 'e3', 'f3', 'g3', 'a3', 'b3', 'c4', 'd4', 'e4', "f4", 'g4', 'a4', 'b4', 'c5', 'd5', 'e5', 'f5', 'g5', 'a5', 'b5']
const black_Keys_Index = ['Db3', 'Eb3' ,'Gb3', 'Ab3', 'Bb3', 'Db4', 'Eb4', 'Gb4', 'Ab4', 'Bb4', 'Db5', 'Eb5', 'Gb5', 'Ab5', 'Bb5']
var white_Keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
var black_Keys = ['`', '1' ,'2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace', '/']
const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');
const changeKey = document.getElementById('changeKey');
var keyChangeMode = false;

document.addEventListener('DOMContentLoaded', () => {
  // Get the saved color mode from local storage
  const savedMode = localStorage.getItem('colorMode');
  const piano = document.getElementById('piano');

  if (savedMode === 'dark') {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
      document.body.style.backgroundImage = ''
      document.body.style.backgroundColor = '#444';
      console.log('dark')
  } else if (savedMode === 'light') {
      document.body.style.backgroundColor = '#f4f4f4';
      document.body.style.color = '#000';
      document.body.style.backgroundImage = ''
      document.body.style.backgroundColor = '#fff';
      console.log('light')
  } else {
      // Classic mode with an online image
      document.body.style.backgroundColor = '#f4f4f4';
      document.body.style.color = '#000';
      document.body.style.backgroundImage = 'url(https://media.istockphoto.com/id/490056196/photo/guitar-amplifier-texture.jpg?s=612x612&w=0&k=20&c=noKID3b_8I95f-wCR8NWcdGTW8O2LF81WvNj29N9nUI=)'
      document.body.style.backgroundAttachment = 
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center';
      console.log('classic')
  }
})



let volumeControl = document.getElementById('vol-control');
let currentVolume = 1; // Default volume level (1 is max)

// Function to set volume for all audio elements
function setVolume() {
    console.clear();   
    const newVolume = volumeControl.value === "" ? 0 : volumeControl.value / 100; // Convert to a 0-1 range
    console.log('Setting volume to:', newVolume);
    
    // Update currentVolume to reflect the new value
    currentVolume = newVolume;

    // Get the array of audio elements and loop through them to set the new volume value
    Array.from(document.querySelectorAll("audio")).forEach(function(audio) {
        audio.volume = currentVolume; // Apply the new volume
    });
}

// Event listeners for volume control
volumeControl.addEventListener('change', setVolume);
volumeControl.addEventListener('input', setVolume);





// Prevent mouse clicks from triggering key changes unless in change mode
keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        if (!keyChangeMode) {
            playNote(key); // Only play note if not in change mode
            
        } 
        
    });
});

var clickCount = 0
changeKey.addEventListener('mousedown', ()=> {
  clickCount += 1
  changeKey.textContent = 'Press the key you want to change or press again to cancel'
  keyChangeMode = true;
  keys.forEach(key => {
    key.addEventListener('mousedown', () => {
        if (keyChangeMode) {
            var changeNote = key.dataset.note
            var changeNoteIndexWhite = white_Keys_Index.indexOf(changeNote)
            var changeNoteIndexblack = black_Keys_Index.indexOf(changeNote)
            var originalKeyWhite = white_Keys[changeNoteIndexWhite]
            var originalKeyBlack = black_Keys[changeNoteIndexblack]
            changeKey.textContent = 'Change ' + changeNote + ' to ? or press again to cancel'
            key.classList.add('active');
            document.addEventListener('keydown', e => {
              if(keyChangeMode){
                if (changeNoteIndexWhite > -1){
                  var tempIndex = white_Keys.indexOf(e.key)
                  console.log(tempIndex +'test')
                  if (tempIndex > -1){
                    console.log('same')
                    white_Keys[changeNoteIndexWhite] = e.key
                    key.textContent = e.key
                    white_Keys[tempIndex] = originalKeyWhite
                    whiteKeys[tempIndex].textContent = originalKeyWhite
                  }else if(tempIndex==-1){
                    tempIndex = black_Keys.indexOf(e.key)
                    white_Keys[changeNoteIndexWhite] = e.key
                    key.textContent = e.key
                    black_Keys[tempIndex] = originalKeyWhite
                    blackKeys[tempIndex].textContent = originalKeyWhite
                  }else{
                    white_Keys[changeNoteIndexWhite] = e.key
                    key.textContent = e.key
                  }
                  changeKey.textContent = 'Changed ' + changeNote + ' to ' + e.key + ', press again to stop'
                  key.classList.remove('active')
                }
                if (changeNoteIndexblack > -1){
                  var tempIndex = black_Keys.indexOf(e.key)
                  console.log(tempIndex +'test')
                  if (tempIndex > -1){
                    console.log('same')
                    black_Keys[changeNoteIndexBlack] = e.key
                    key.textContent = e.key
                    black_Keys[tempIndex] = originalKeyBlack
                    blackKeys[tempIndex].textContent = originalKeyBlack
                  }else if(tempIndex==-1){
                    tempIndex = white_Keys.indexOf(e.key)
                    black_Keys[changeNoteIndexblack] = e.key
                    key.textContent = e.key
                    white_Keys[tempIndex] = originalKeyBlack
                    whiteKeys[tempIndex].textContent = originalKeyBlack
                  }else{
                    black_Keys[changeNoteIndexblack] = e.key
                    key.textContent = e.key
                  }
                  changeKey.textContent = 'Changed ' + changeNote + ' to ' + e.key + ', press again to stop'
                  key.classList.remove('active')
                }
              }
            })
        }
    });
  
});
if (clickCount == 2){
  console.log('stop')
  keyChangeMode = false
  clickCount  = 0
  changeKey.textContent = 'Change keybinds'
}
})

document.addEventListener('keydown', e => {
    console.log(e.key)
    if (e.repeat) return
    //get key and return to playNote according to e event
    const key = e.key;
    const whiteKeysIndex = white_Keys.indexOf(key)
    const blackKeysIndex = black_Keys.indexOf(key)
    if (whiteKeysIndex > -1) playNote(whiteKeys[whiteKeysIndex])
    if (blackKeysIndex > -1) playNote(blackKeys[blackKeysIndex])
})
function playNote(key){
  let release;
    if(!keyChangeMode){
      console.log(key.dataset.note)
      const noteAudio = document.getElementById(key.dataset.note)
      if (!noteAudio.paused) {
        noteAudio.currentTime = 0; // Reset to start
        noteAudio.volume = currentVolume; // Ensure volume is max when replaying
      } else {
        // If not currently playing, just play it
        noteAudio.currentTime = 0; // Reset audio to start
        noteAudio.volume = currentVolume; // Ensure volume is max when first played
        noteAudio.play();
        key.classList.add('active');
      }
      function fadeOutNote() {
        console.log(key.classList)
        console.log('fade out')
        const fadeDuration = 350; // Duration in milliseconds
        const fadeInterval = 50; // Interval for volume change
        const volumeStep = fadeInterval / fadeDuration; // Calculate volume step
    
        // Gradually decrease volume
        const fadeOutInterval = setInterval(() => {
            if (noteAudio.volume > 0) {
                noteAudio.volume = Math.max(noteAudio.volume - volumeStep, 0);
            } else {
                clearInterval(fadeOutInterval);
                noteAudio.pause();
                key.classList.remove('active');
            }
        }, fadeInterval);
    }
      noteAudio.currentTime = 0
      noteAudio.play()
      key.classList.add('active')
      //key release
      key.addEventListener( 'mouseup', () => {
        console.log('mouseup')
        key.classList.remove('active')
        clearTimeout(release)
        fadeOutNote()
        return
    })
    //key release
    document.addEventListener( 'keyup', () => {
        console.log('keyup')
        key.classList.remove('active')
        //check if key preesed in time period
        clearTimeout(release)
        fadeOutNote()
        return
    
    })
    }
}

// Set up basic variables for app
const record = document.querySelector(".record");
const stop = document.querySelector(".stop");
const soundClips = document.querySelector(".sound-clips");
const canvas = document.querySelector(".visualizer");
const mainSection = document.querySelector(".main-controls");

// Disable stop button while not recording
stop.disabled = true;

// Visualiser setup - create web audio api context and canvas
let audioCtx;
const canvasCtx = canvas.getContext("2d");

// Main block for doing the audio recording
if (navigator.mediaDevices.getDisplayMedia) {
  console.log("The mediaDevices.getDisplayMedia() method is supported.");

  const constraints = { audio: true };
  let chunks = [];

  let onSuccess = function (stream) {
    
    const mediaRecorder = new MediaRecorder(stream);

    visualize(stream);

    record.onclick = function () {
      mediaRecorder.start();
      console.log(mediaRecorder.state);
      console.log("Recorder started.");
      record.style.background = "red";

      stop.disabled = false;
      record.disabled = true;
    };

    stop.onclick = function () {
      mediaRecorder.stop();
      console.log(mediaRecorder.state);
      console.log("Recorder stopped.");
      record.style.background = "";
      record.style.color = "";

      stop.disabled = true;
      record.disabled = false;
    };

    mediaRecorder.onstop = function (e) {
      console.log("Last data to read (after MediaRecorder.stop() called).");

      const clipName = prompt(
        "Enter a name for your sound clip?",
        "My unnamed clip"
      );

      const clipContainer = document.createElement("article");
      const clipLabel = document.createElement("p");
      const audio = document.createElement("audio");
      const deleteButton = document.createElement("button");

      clipContainer.classList.add("clip");
      audio.setAttribute("controls", "");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";

      if (clipName === null) {
        clipLabel.textContent = "My unnamed clip";
      } else {
        clipLabel.textContent = clipName;
      }

      clipContainer.appendChild(audio);
      clipContainer.appendChild(clipLabel);
      clipContainer.appendChild(deleteButton);
      soundClips.appendChild(clipContainer);

      audio.controls = true;
      const blob = new Blob(chunks, { type: mediaRecorder.mimeType });
      chunks = [];
      const audioURL = window.URL.createObjectURL(blob);
      audio.src = audioURL;
      console.log("recorder stopped");

      deleteButton.onclick = function (e) {
        e.target.closest(".clip").remove();
      };

      clipLabel.onclick = function () {
        const existingName = clipLabel.textContent;
        const newClipName = prompt("Enter a new name for your sound clip?");
        if (newClipName === null) {
          clipLabel.textContent = existingName;
        } else {
          clipLabel.textContent = newClipName;
        }
      };
    };

    mediaRecorder.ondataavailable = function (e) {
      chunks.push(e.data);
    };
  };

  let onError = function (err) {
    console.log("The following error occured: " + err);
  };

  navigator.mediaDevices.getDisplayMedia(constraints).then(onSuccess, onError);
} else {
  console.log("MediaDevices.getDisplayMedia() not supported on your browser!");
}

function visualize(stream) {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }

  const source = audioCtx.createMediaStreamSource(stream);

  const analyser = audioCtx.createAnalyser();
  analyser.fftSize = 2048;
  const bufferLength = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);

  source.connect(analyser);

  draw();

  function draw() {
    const WIDTH = canvas.width;
    const HEIGHT = canvas.height;

    requestAnimationFrame(draw);

    analyser.getByteTimeDomainData(dataArray);

    canvasCtx.fillStyle = "rgb(200, 200, 200)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    canvasCtx.lineWidth = 2;
    canvasCtx.strokeStyle = "rgb(0, 0, 0)";

    canvasCtx.beginPath();

    let sliceWidth = (WIDTH * 1.0) / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {
      let v = dataArray[i] / 128.0;
      let y = (v * HEIGHT) / 2;

      if (i === 0) {
        canvasCtx.moveTo(x, y);
      } else {
        canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    canvasCtx.lineTo(canvas.width, canvas.height / 2);
    canvasCtx.stroke();
  }
}

window.onresize = function () {
  canvas.width = mainSection.offsetWidth;
};

window.onresize();

/**
* Setting elements to constants and Decalring Variables
*/
const playButton = document.getElementById('playMetronome');
const stopButton = document.getElementById('stopMetronome');
const bpmSlider = document.getElementById('bpmSlider');
const bpmEl = document.getElementById('bpm');
const beatTxt = document.getElementById('beatsText');
const beatBTN = document.querySelectorAll('button.beatsBTN');
const audio = new AudioContext()
let audioBuffer;
let i =1;
let beat_count = 4
let metronome;
let bpm = 140;
let isplaying = false;
const audioBeat = document.getElementById('metronomeMp3')
  
/**
* Function for Playing the Metronome Click Sound
* @param int rate = to change playbackrate or the pitch
*/
function playClick() {
  audioBeat.currentTime = 0; // Reset to start
  audioBeat.play(); // Play the sound
}
 
 
/**
* Function that Loops the Metronome depending to provided tempo and beats
*/
function metronome_play(){
    // identifying that metronome is playing
    isplaying = true;
    
    // looping the beat
    metronome = setInterval(function() {
        playClick();
        i = (i % beat_count) + 1; // Cycle through beats
    }, (60000 / bpm)); // Calculate interval in milliseconds
}
 
// Function that stops the metronome
function metronome_stop(){
    clearInterval(metronome)
    i = 1;
    isplaying = false
}
 
//  function that updates the beats per measure
function change_beat(type = "plus"){
    if(type == 'plus'){
        beat_count = beat_count + 1;
    }else{
        beat_count = beat_count - 1;
    }
 
    if(beat_count < 2)
        beat_count = 2;
    beatTxt.innerText = beat_count
    if(isplaying){
        metronome_stop()
        metronome_play()
    }
 
}
 
/**
* Event Listener that triggers the metronome to play
*/
playButton.addEventListener('click', function(e){
    e.preventDefault()
    if(!isplaying){
        metronome_play()
    }
    // Hide Play Button
    playButton.style.display = 'none'
    // Show Stop Button
    stopButton.style.display = 'flex'
})
 
/**
* Event Listener that triggers the metronome to stop
*/
stopButton.addEventListener('click', function(e){
    e.preventDefault()
    metronome_stop()
    // Hide Stop Button
    stopButton.style.display = 'none'
    // Show Play Button
    playButton.style.display = 'flex'
})
 
/**
* Event Listener that triggers the metronome speed up or down
*/
bpmSlider.addEventListener('input', function(e){
    e.preventDefault()
    bpmEl.innerText = `${bpmSlider.value}`
    bpm = bpmSlider.value
    if(isplaying){
        metronome_stop()
        metronome_play()
    }
   
})
 
/**
* Event Listener that triggers the metronome to change the number of beats per measure
*/
beatBTN.forEach(el=>{
    el.addEventListener('click', function(e){
        e.preventDefault()
        change_beat(el.dataset.type)
    })
})
