const keys = document.querySelectorAll('.key');

keys.forEach(key =>{
    key.addEventListener('mousedown', () => playNote(key))
})

function playNote(key){
    console.log(key.dataset.note)
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    key.addEventListener( 'mouseup', () => {
        console.log('key up')
        key.classList.remove('active')
        noteAudio.pause()
    })
}
