// Add New Note
function addNewNote() {
    const noteContainer = document.createElement('div');
    noteContainer.classList.add('note');
    
    const titleInput = document.createElement('input');
    titleInput.classList.add('note-title');
    titleInput.placeholder = 'Enter note title...';
    noteContainer.appendChild(titleInput);

    const contentTextarea = document.createElement('textarea');
    contentTextarea.classList.add('note-content');
    contentTextarea.placeholder = 'Write your note here...';
    noteContainer.appendChild(contentTextarea);

    const imageContainer = document.createElement('div');
    noteContainer.appendChild(imageContainer);

    const uploadButton = document.createElement('button');
    uploadButton.classList.add('upload-btn');
    uploadButton.innerText = 'Upload Image';
    uploadButton.onclick = function () { uploadImage(noteContainer, imageContainer); };
    noteContainer.appendChild(uploadButton);

    const saveButton = document.createElement('button');
    saveButton.classList.add('save-btn');
    saveButton.innerText = 'Save Note';
    saveButton.onclick = function () { saveNote(noteContainer, titleInput, contentTextarea, imageContainer); };
    noteContainer.appendChild(saveButton);

    document.getElementById('noteContainer').appendChild(noteContainer);
}

// Upload Image
function uploadImage(note, imageContainer) {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = function (e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function (event) {
            const img = document.createElement('img');
            img.src = event.target.result;
            imageContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
    };
    input.click();
}

// Save the note after writing
function saveNote(note, titleInput, contentTextarea, imageContainer) {
    const savedTitle = titleInput.value;
    const savedContent = contentTextarea.value;

    const savedNote = document.createElement('div');
    savedNote.classList.add('note');

    const savedNoteTitle = document.createElement('div');
    savedNoteTitle.classList.add('note-title');
    savedNoteTitle.textContent = savedTitle;
    savedNote.appendChild(savedNoteTitle);

    const savedNoteContent = document.createElement('div');
    savedNoteContent.classList.add('note-content');
    savedNoteContent.textContent = savedContent.length > 100 ? savedContent.substring(0, 100) + '...' : savedContent;
    savedNote.appendChild(savedNoteContent);

    const images = imageContainer.querySelectorAll('img');
    images.forEach(img => {
        const imgClone = img.cloneNode();
        savedNote.appendChild(imgClone);
    });

    const noteButtons = document.createElement('div');
    noteButtons.classList.add('note-buttons');
    savedNote.appendChild(noteButtons);

    const editButton = document.createElement('button');
    editButton.classList.add('edit-btn');
    editButton.innerText = 'Edit';
    editButton.onclick = function () { editNote(savedNote, titleInput, contentTextarea, imageContainer); };
    noteButtons.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-btn');
    deleteButton.innerText = 'Delete';
    deleteButton.onclick = function () { deleteNote(savedNote); };
    noteButtons.appendChild(deleteButton);

    const viewButton = document.createElement('button');
    viewButton.classList.add('view-btn');
    viewButton.innerText = 'View';
    viewButton.onclick = function () { viewNote(savedNote); };
    noteButtons.appendChild(viewButton);

    document.getElementById('noteContainer').appendChild(savedNote);

    note.style.display = 'none';  // Hide the new note editor after saving
}

// Edit the saved note
function editNote(savedNote, titleInput, contentTextarea, imageContainer) {
    titleInput.disabled = false;
    contentTextarea.disabled = false;

    const savedNoteTitle = savedNote.querySelector('.note-title');
    const savedNoteContent = savedNote.querySelector('.note-content');

    titleInput.value = savedNoteTitle.textContent;
    contentTextarea.value = savedNoteContent.textContent;

    // Show images again
    const images = savedNote.querySelectorAll('img');
    imageContainer.innerHTML = ''; // Clear existing images
    images.forEach(img => {
        const imgClone = img.cloneNode();
        imageContainer.appendChild(imgClone);
    });

    // Add buttons for adding/removing images
    const uploadButton = document.createElement('button');
    uploadButton.classList.add('upload-btn');
    uploadButton.innerText = 'Add Image';
    uploadButton.onclick = function () { uploadImage(savedNote, imageContainer); };
    savedNote.querySelector('.note-buttons').appendChild(uploadButton);

    const deleteImageButton = document.createElement('button');
    deleteImageButton.classList.add('delete-btn');
    deleteImageButton.innerText = 'Delete Image';
    deleteImageButton.onclick = function () { deleteImage(imageContainer); };
    savedNote.querySelector('.note-buttons').appendChild(deleteImageButton);

    // Change the button to "Save" for saving the edited content
    const saveButton = document.createElement('button');
    saveButton.classList.add('save-btn');
    saveButton.innerText = 'Save Edits';
    saveButton.onclick = function () { saveEdits(savedNote, titleInput, contentTextarea, imageContainer); };
    savedNote.querySelector('.note-buttons').appendChild(saveButton);
}

// Save the edited note
function saveEdits(savedNote, titleInput, contentTextarea, imageContainer) {
    const savedTitle = titleInput.value;
    const savedContent = contentTextarea.value;

    savedNote.querySelector('.note-title').textContent = savedTitle;
    savedNote.querySelector('.note-content').textContent = savedContent;

    // Remove the "Save Edits" button
    savedNote.querySelector('.save-btn').remove();

    // Return the input fields to their non-editable state
    titleInput.disabled = true;
    contentTextarea.disabled = true;

    // Remove the add image and delete image buttons
    savedNote.querySelector('.upload-btn').remove();
    savedNote.querySelector('.delete-btn').remove();
}

// Delete a note
function deleteNote(savedNote) {
    savedNote.remove();
}

// Delete an image from the note
function deleteImage(imageContainer) {
    const images = imageContainer.querySelectorAll('img');
    if (images.length > 0) {
        images[images.length - 1].remove();  // Remove the last image
    }
}

// View a note in modal
function viewNote(savedNote) {
    const modal = document.getElementById('viewModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');
    const modalImage = document.getElementById('modalImage');

    modalTitle.textContent = savedNote.querySelector('.note-title').textContent;
    modalContent.textContent = savedNote.querySelector('.note-content').textContent;

    modalImage.innerHTML = '';
    const images = savedNote.querySelectorAll('img');
    images.forEach(img => {
        const imgClone = img.cloneNode();
        modalImage.appendChild(imgClone);
    });

    modal.style.display = 'block';
}

// Close the modal
function closeModal() {
    document.getElementById('viewModal').style.display = 'none';
}

// Go to home
function goToHome() {
    window.location.href = '/home/home.php';
}
