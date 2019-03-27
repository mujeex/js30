let countdown;
const timerDisplay= document.querySelector('.display__time-left')
const endTime= document.querySelector('.display__end-time')
const buttons= document.querySelectorAll('[data-time]')

function timer(seconds){
    const now= Date.now()
    const then= now+ seconds*1000;

    clearInterval(countdown)
    displayTimeLeft(seconds)
    displayEndTime(then)

    
   countdown= setInterval(()=>{
        //divided by 1000 to get back seconds in miliseconds
        const secondsLeft= Math.round((then-Date.now())/1000)
        if(secondsLeft<0){
            clearInterval(countdown)
            return
        }
       displayTimeLeft(secondsLeft)
    },1000)
}

function displayTimeLeft(seconds){
    const minutes= Math.floor(seconds/60)
    const remainderSeconds= seconds%60;
    const display=`${minutes}: ${remainderSeconds<10?'0'+remainderSeconds:remainderSeconds}`
    document.title=display
    timerDisplay.textContent=display
    
    
//    console.log(seconds)
}

function displayEndTime(timeStamp){
    const end= new Date(timeStamp)
    const hour= end.getHours()
    const minutes= end.getMinutes()
    endTime.textContent=`Be back at ${hour>12?hour-12:hour}:${minutes<10?`0${minutes}`:minutes}`
}

function startTimer(){
    const seconds=parseInt(this.dataset.time)
    timer(seconds)
    console.log(seconds)
}
buttons.forEach(button=>button.addEventListener('click',startTimer))

document.customForm.addEventListener('submit',function(event){    
    event.preventDefault()
    const mins= this.minutes.value;
    timer(mins*60)
    this.reset()
                                     })