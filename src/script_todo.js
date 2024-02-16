let value = document.querySelector('input');

let div = document.querySelector('div');

let button = document.querySelector('button');

let todos = [];

// Add a variable for the voice icon
const voiceIcon = document.getElementById('voice-icon');

// Check if the browser supports speech recognition
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
  // Enable the microphone icon
  voiceIcon.classList.add('active');

  // Create a new SpeechRecognition instance
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  // Set the properties for speech recognition
  recognition.lang = 'en-US'; // Specify the language
  recognition.continuous = false; // Stop listening when speech ends

  // Add an event listener to the voice icon
  voiceIcon.addEventListener('click', () => {
    // Start speech recognition when the icon is clicked
    recognition.start();
  });

  // Add an event listener for the recognition result
  recognition.addEventListener('result', (event) => {
    const transcript = event.results[0][0].transcript; // Get the recognized transcript

    value.value = transcript; // Set the input value to the recognized transcript
    button.click(); // Trigger the click event on the "Add" button
  });

  // Add an event listener for errors
  recognition.addEventListener('error', (event) => {
    console.error('Speech recognition error:', event.error);
  });
} else {
  // Disable the microphone icon if speech recognition is not supported
  voiceIcon.classList.add('disabled');
}


window.onload = () =>{

    todos = JSON.parse(localStorage.getItem('todos')) || [];

    todos.forEach(x => AddTask(x));

    
}

console.log(todos)

button.addEventListener('click',() =>{

    if(value.value == ""){

        alert("Must Enter One Task")
    }

    else 
    {
    todos.push(value.value);

    AddTask(value.value);

    localStorage.setItem('todos', JSON.stringify(todos))
    
    value.value ='';

    }
    
})



function AddTask(todo){

    let para = document.createElement('p');

    para.classList.add("para");

    para.innerHTML = todo;

    div.appendChild(para)

    para.addEventListener('click',()=>{

        para.style.textDecoration = "line-through"

        remove(todo);
    })

    para.addEventListener('dblclick',()=>{

        remove(todo);
        
        para.remove();
   
    })
}

function remove(todo){

    let index = todos.indexOf(todo)

    if(index > -1){

        todos.splice(index,1)
    }

    localStorage.setItem("todos", JSON.stringify(todos))

   
}