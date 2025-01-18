document.getElementById('add-note-btn').addEventListener('click', function () {
    const noteForm = document.getElementById('note-form');
    noteForm.style.display = noteForm.style.display === 'none' || noteForm.style.display === '' ? 'flex' : 'none';
    clearForm();  // Clear the form when opening it for a new note
});

let notes = [];
let editingNoteId = null;  // Variable to track the note being edited

document.getElementById('save-note-btn').addEventListener('click', function () {
    const title = document.getElementById('note-title').value;
    const content = document.getElementById('note-content').value;
    const imageFile = document.getElementById('upload-image').files[0];

    if (title && content) {
        if (editingNoteId) {
            // Update existing note
            const note = notes.find(note => note.id === editingNoteId);
            note.title = title;
            note.content = content;
            note.image = imageFile ? URL.createObjectURL(imageFile) : null;
            editingNoteId = null;  // Reset editingNoteId after saving
        } else {
            // Add new note
            const note = {
                id: Date.now(),
                title,
                content,
                image: imageFile ? URL.createObjectURL(imageFile) : null
            };
            notes.push(note);
        }

        displayNotes();
        document.getElementById('note-form').style.display = 'none';  // Hide the form after saving
        document.getElementById('save-note-btn').textContent = 'Save Note';  // Reset the button text
    }
});

function displayNotes() {
    const noteContainer = document.getElementById('note-container');
    noteContainer.innerHTML = '';

    notes.forEach(note => {
        const noteBox = document.createElement('div');
        noteBox.classList.add('note-box');

        const noteTitle = document.createElement('h3');
        noteTitle.textContent = note.title;

        const noteContent = document.createElement('p');
        noteContent.textContent = note.content.substring(0, 100) + '...';

        if (note.image) {
            const noteImage = document.createElement('img');
            noteImage.src = note.image;
            noteBox.appendChild(noteImage);
        }

        const noteActions = document.createElement('div');
        noteActions.classList.add('note-actions');

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteNote(note.id);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.onclick = () => editNote(note.id);

        const displayButton = document.createElement('button');
        displayButton.textContent = 'Display';
        displayButton.onclick = () => displayNoteDetails(note.id);

        noteActions.appendChild(deleteButton);
        noteActions.appendChild(editButton);
        noteActions.appendChild(displayButton);

        noteBox.appendChild(noteTitle);
        noteBox.appendChild(noteContent);
        noteBox.appendChild(noteActions);

        noteContainer.appendChild(noteBox);
    });
}

function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    displayNotes();
}

function editNote(noteId) {
    const note = notes.find(note => note.id === noteId);
    document.getElementById('note-title').value = note.title;
    document.getElementById('note-content').value = note.content;
    document.getElementById('upload-image').value = '';  // Reset image input (no image preview)
    editingNoteId = noteId;  // Store the ID of the note being edited
    document.getElementById('save-note-btn').textContent = 'Save Changes';  // Change button text to "Save Changes"
    document.getElementById('note-form').style.display = 'flex';  // Show form to edit note
}

function displayNoteDetails(noteId) {
    const note = notes.find(note => note.id === noteId);
    document.getElementById('full-note-title').textContent = note.title;
    document.getElementById('full-note-content').textContent = note.content;
    document.getElementById('full-note-image').src = note.image || '';  // If there's no image, it will not display
    document.getElementById('note-details').style.display = 'block';  // Show the full note details
}

document.getElementById('close-note-details').addEventListener('click', function () {
    document.getElementById('note-details').style.display = 'none';  // Hide the full note details
});

function clearForm() {
    document.getElementById('note-title').value = '';
    document.getElementById('note-content').value = '';
    document.getElementById('upload-image').value = '';
}
