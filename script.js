//default settings for keyboard keys
const white_Keys = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', "'", 'Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.']
const black_Keys = ['9', 'q' ,'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '219', '220', '221']


const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

keys.forEach(key =>{
    key.addEventListener('mousedown', () => playNote(key))
})


document.addEventListener('keydown', e => {

    console.log(e.key)

    if (e.repeat) return

    const key = e.key;
    const whiteKeysIndex = white_Keys.indexOf(key)
    const blackKeysIndex = black_Keys.indexOf(key)

    if (whiteKeysIndex > -1) playNote(whiteKeys[whiteKeysIndex])
    if (blackKeysIndex > -1) playNote(blackKeys[blackKeysIndex])

    
})







function playNote(key){
    console.log(key.dataset.note)
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime = 0
    noteAudio.play()
    key.classList.add('active')
    
    key.addEventListener( 'mouseup'||'keyup', () => {
        console.log('mouseup')
        key.classList.remove('active')
        setTimeout(function() {
            noteAudio.pause()
        }, 350);
    })

    document.addEventListener( 'keyup', () => {
        console.log('keyup')
        key.classList.remove('active')
        setTimeout(function() {
            noteAudio.pause()
        }, 350);
    
    })
}





