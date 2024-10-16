const keys = document.querySelectorAll('.key');

keys.forEach(key =>{
    key.addEventListener('click', () => playNote(key),console.log("test"))
})

function playNote(key){
    console.log(1)
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
}
