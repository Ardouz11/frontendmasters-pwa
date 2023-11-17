var notes = [];

// Registering all the event handlers when the page loads
document.addEventListener("DOMContentLoaded", event => {
    if(localStorage.getItem("notes")){
        notes=JSON.parse(localStorage.getItem("notes"))
    }
    renderNotes();
 
    document.querySelector("form").addEventListener("submit", event => {
        event.preventDefault();
        const note = document.querySelector("textarea").value;
        if (note.length==0) {
            alert("You didn't input any content");
        } else {
            notes.push(note);
            saveNotes()
            renderNotes();
            document.querySelector("textarea").value = "";
        }
    });

    document.querySelector("#btnLearn").addEventListener("click", event => {
        location.href = "https://frontendmasters.com";
    })
    let bigEvent;
    window.addEventListener("beforeinstallprompt",event=>{
            event.preventDefault()
            bigEvent=event
    })
    document.querySelector("#btnInstall").addEventListener("click",event=>{
        if(bigEvent){
            bigEvent.prompt()
        }else{
            alert("Try installation using Add to HomeScreen")
        }
    })
    document.querySelector("#btnShare").addEventListener("click",event=>{
        let notesStrig="";
        for(let note of notes){
            notesStrig+=note
        }
        if(navigator.canShare){
        navigator.share({
        title:"Codepad",
        text:notesStrig
        })
    }
    })
})

// Render the notes on the DOM
function renderNotes() {
    const ul = document.querySelector("#notes");
    ul.innerHTML = "";
    notes.forEach( (note, index) => {
        // Create the note LI
        const li = document.createElement("li");
        li.innerHTML = note;
        // Delete element for each note
        const deleteButton = document.createElement("a");
        deleteButton.innerHTML = '<span class="icon">delete</span>';
        deleteButton.addEventListener("click", event => {
            if (confirm("Do you want to delete this note?")) {
                notes.splice(index, 1);
                saveNotes()
                renderNotes();
            }
        });
        li.appendChild(deleteButton);
        ul.appendChild(li);
    })
}
function saveNotes(){
    localStorage.setItem("notes",JSON.stringify(notes))
}
