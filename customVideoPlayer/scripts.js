//get our elements
const player= document.querySelector('.player')
const video= player.querySelector('.viewer')
const progress= player.querySelector('.progress')
const progressBar= player.querySelector('.progress__filled')

const toggle= player.querySelector('.toggle')
const skipButtons= player.querySelectorAll('[data-skip]')
const ranges= player.querySelectorAll('.player__slider')


// build our functions


const togglePlay= ()=>{
const method= video.paused?'play':'pause'
video[method]()

}

const updateButton=(event)=>{
    const icon= event.type === 'pause' ? '►' : '❚ ❚'
    toggle.textContent= icon
}

//const skip= (event)=>{
//    console.log(event)
//}
function skip(){
    console.log(this.dataset)
    video.currentTime += parseFloat(this.dataset.skip) 
}

function handleRangeUpdate(){
    video[this.name]= this.value

}

function handleProgress(){
    const percent= (video.currentTime/video.duration)*100
    progressBar.style.flexBasis= `${percent}%`
}

function scrub(event){
    const scrubTime= (event.offsetX/progress.offsetWidth)*video.duration
    video.currentTime= scrubTime
//    progressBar.style.flexBasis= `${}%`
    console.log(scrubTime)
}

// set up the event listeners
video.addEventListener('click',togglePlay)
video.addEventListener('play',updateButton)
video.addEventListener('pause',updateButton)
video.addEventListener('timeupdate',handleProgress)

toggle.addEventListener('click',togglePlay)
skipButtons.forEach(button=> button.addEventListener('click',skip))
ranges.forEach(range=> range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range=> range.addEventListener('mousemove',handleRangeUpdate))

let mouseDown= false
progress.addEventListener('click',scrub)
progress.addEventListener('mousemove',(event)=> mouseDown && scrub(event))
progress.addEventListener('mousedown',()=> mouseDown=true)
progress.addEventListener('mouseup',()=> mouseDown=false)
