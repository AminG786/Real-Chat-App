const socket = io()

let nam;
do {
    nam=prompt("hello")
}while(!nam);
//message enter kro
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector(".message__area");



textarea.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        sendMessage(e.target.value);
    }
})

function sendMessage(message){
    let msg = {
        user : nam,
        message: message.trim()
    }
        //append message
        appendMessage(msg,'outgoing')
        textarea.value="";
        scrollToBottom();

        //server py msg bjna ha
        //socket use krygy
        socket.emit('message',msg)


}

function appendMessage(msg,type){
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className,'message')//we can give multipl classes followed by commas


    let markup = `
            <h4>${msg.user}</h4>
            <p>${msg.message}
    
    `
    mainDiv.innerHTML=markup;
    messageArea.appendChild(mainDiv);
}





//reciie msg 
socket.on('message',(msg)=>{
   // console.log(msg)
   appendMessage(msg,'incoming')
   scrollToBottom();

})

// scroll hona chaye jasy jasy msg aye
function scrollToBottom(){
    messageArea.scrollTop=messageArea.scrollHeight;
}