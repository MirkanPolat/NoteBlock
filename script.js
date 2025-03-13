// meine arrays
let notes = ["haus","maus"];
let notesTitles = ['Aufgabe', 'test'];

let trashNotes = [];
let trashNotesTitles = [];

let archivNotes = [];
let archivNotesTitles = [];

function unit(){
    getFromLocalStorage();
    renderNotes()
    renderTrashNotes()
    renderArchiv();
}

// Rendert alle Notizen aus dem notes Array
function renderNotes(){
    let contentRef = document.getElementById('content')
    contentRef.innerHTML = "";
    
    for (let indexNote = 0; indexNote < notes.length; indexNote++) {
        contentRef.innerHTML += getNoteTemplate(indexNote);
        
    }
}

// rendert alles aus dem trashNote array
function renderTrashNotes(){
    let trashContentRef = document.getElementById('trash-content');
    trashContentRef.innerHTML = "";

    for (let indexTrashNote = 0; indexTrashNote < trashNotes.length; indexTrashNote++) {
        trashContentRef.innerHTML += getTrashNoteTemplate(indexTrashNote); 
        
    }
}

// rendern archiv 
function renderArchiv(){
    let archivNotesRef = document.getElementById('archiv');
    archivNotesRef.innerHTML = "";

    for (let indexArchiv = 0; indexArchiv < archivNotes.length; indexArchiv++) {
        archivNotesRef.innerHTML += getArchivNotesTemplate(indexArchiv);
        
    }
}

// der text der bei rendernotes eingefügt wird 
function getNoteTemplate(indexNote){
    return /*html*/`
        <p>+ Title: ${notesTitles[indexNote]} -> ${notes[indexNote]} 
            <button onclick="pushToTrash(${indexNote})" class="btn" >X</button>
            <button onclick="pushToArchiv(${indexNote})" class="btn" >Archive</button>
        </p>
    `;
}

// der html inhalt vom trash 
function getTrashNoteTemplate(indexTrashNote){
    return /*html*/`
        <p>+ Title: ${trashNotesTitles[indexTrashNote]} -> ${trashNotes[indexTrashNote]}
            <button onclick="deleteNotes(${indexTrashNote})" class="btn" >X</button>
            <button onclick="pushTrashToArchiv(${indexTrashNote})" class="btn" >Archive</button>
            <button onclick="pushToNotes(${indexTrashNote})" class="btn" >back to notes</button>
        </p>
    `
}
function getArchivNotesTemplate(indexArchiv){
    return /*html*/`
        <p>+ Title: ${archivNotesTitles[indexArchiv]} -> ${archivNotes[indexArchiv]}
            <button onclick="pushArchiveToTrash(${indexArchiv})" class="btn" >back to trash</button>
        </p>
    `
}
// holt sich den value vom inputfeld
function addNote(){
    let noteInputRef = document.getElementById('note-input');
    let noteInput = noteInputRef.value;

    let noteTitleRef = document.getElementById('note-title');
    let noteTitle = noteTitleRef.value;

    if(!noteInput || !noteTitle ){
        alert("bitte füge einen title und text ein")
        return
    }

    //eingabe den Notizen hinzufügen 
    notes.push(noteInput);
    notesTitles.push(noteTitle);


    renderNotes(); // führt die render wieder aus damit es geaddet wird 
    saveToLocalStorage();

    noteInputRef.value = ""; // leert den input nach dem click 
    noteTitleRef.value = "";
}

function pushToArchiv(indexNote){

    let archivNote = notes.splice(indexNote,1);
    archivNotes.push(archivNote[0]);

    let archivTitle = notesTitles.splice(indexNote,1);
    archivNotesTitles.push(archivTitle[0]);

    renderNotes();
    renderArchiv();
    saveToLocalStorage();
}
// fügt es den archiv hinzu 
function pushTrashToArchiv(indexTrashNote){
    let trashToArchive = trashNotes.splice(indexTrashNote,1);
    archivNotes.push(trashToArchive[0])

    let trashToArchiveTitle = trashNotesTitles.splice(indexTrashNote,1);
    archivNotesTitles.push(trashToArchiveTitle[0]);

    renderTrashNotes();
    renderArchiv();
    saveToLocalStorage();
}

// überträgt es zu trash on click
function pushToTrash(indexNote){

   let trashNote = notes.splice(indexNote,1); //tut das entfernte ins trashnote 
   trashNotes.push(trashNote[0]);

   let trashNoteTitle = notesTitles.splice(indexNote,1); // pusht es in variable 
   trashNotesTitles.push(trashNoteTitle[0]); // pusht es in die notetitle 

    renderNotes(); // aktualisiert 
    renderTrashNotes();
    saveToLocalStorage();
}
function pushToNotes(indexTrashNote){
    let trashPushNotes = trashNotes.splice(indexTrashNote,1);
    notes.push(trashPushNotes[0]);

    let trashPushTitles = trashNotesTitles.splice(indexTrashNote,1);
    notesTitles.push(trashPushTitles[0]);

    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();


}
// deleted das objekt full 
function deleteNotes(indexTrashNote){
    trashNotes.splice(indexTrashNote,1); // tut das entfernte in s trashnote
    trashNotesTitles.splice(indexTrashNote,1)

    renderNotes();
    renderTrashNotes();
    saveToLocalStorage();
}
function pushArchiveToTrash(indexArchiv){
    let backToTrash = archivNotes.splice(indexArchiv,1);
    trashNotes.push(backToTrash[0]);

    let backToTrashTitle = archivNotesTitles.splice(indexArchiv,1);
    trashNotesTitles.push(backToTrashTitle);

    renderTrashNotes();
    renderArchiv();
    saveToLocalStorage();

}

// speichert es im local storage
function saveToLocalStorage(){
    localStorage.setItem("myNotes", JSON.stringify(notes));
    localStorage.setItem("myNotesTitles", JSON.stringify(notesTitles));
    localStorage.setItem("myTrashNotes", JSON.stringify(trashNotes));
    localStorage.setItem("myTrashNotesTitles", JSON.stringify(trashNotesTitles));
    localStorage.setItem("myArchivNotes", JSON.stringify(archivNotes));
    localStorage.setItem("myArchivNotesTitles", JSON.stringify(archivNotesTitles));
}

// wirft es in den array back 
function getFromLocalStorage(){
    let myArrNotes = JSON.parse(localStorage.getItem("myNotes"));
    let myArrNotesTitles = JSON.parse(localStorage.getItem("myNotesTitles"));
    let myArrTrashNotes = JSON.parse(localStorage.getItem("myTrashNotes"));
    let myArrTrashNotesTitles = JSON.parse(localStorage.getItem("myTrashNotesTitles"));
    let myArrArchivNotes = JSON.parse(localStorage.getItem("myArchivNotes"));
    let myArrArchivNotesTitles = JSON.parse(localStorage.getItem("myArchivNotesTitles"));


    if (myArrNotes!= null){ // wenn es zb arrnotes gibt & nicht null ist dann wird der wert gespeichert
        notes = myArrNotes;
    } 
    if(myArrNotesTitles != null){
        notesTitles = myArrNotesTitles;
    }
    if(myArrTrashNotes != null){
        trashNotes = myArrTrashNotes;
    }
    if(myArrTrashNotesTitles != null ){
        trashNotesTitles = myArrTrashNotesTitles;
    }
    if(myArrArchivNotes != null){
        archivNotes = myArrArchivNotes;
    }
    if(myArrArchivNotesTitles != null){
        archivNotesTitles = myArrArchivNotesTitles;
    }
}

