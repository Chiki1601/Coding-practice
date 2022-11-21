const mainDiv = document.querySelector('#main');
const addBookBtn = document.querySelector('.add-book');
const submitBookBtn = document.querySelector('#submitBookBtn');
const addBookForm = document.querySelector('.add-book-form');
const whiteOverlay = document.querySelector('.white_overlay');
const formHeading = document.querySelector('.form-heading');
const alertDiv = document.querySelector('.alert-div');

const bookTitle = document.querySelector('#book-title');
const author = document.querySelector('#author');
const pages = document.querySelector('#pages');
const readStatus = document.querySelector('#read-status');

let myLibrary = [];

addBookForm.style.visibility = 'hidden';
whiteOverlay.style.display = 'none';

function removeBook(idx){
    
    myLibrary.splice(idx, 1)
    mainDiv.innerHTML = '';
    addBookToDOM();
}

function changeStatus(idx){
    myLibrary[idx].readStatus = !myLibrary[idx].readStatus;
    mainDiv.innerHTML = '';
    addBookToDOM();
}

class Book{
    constructor(title, author, pageCount, readStatus){
        this.title = title;
        this.author = author;
        this.pageCount = pageCount;
        this.readStatus = readStatus;
    }
}

function addBook(){
    addBookForm.style.visibility = 'visible';
    whiteOverlay.style.display = 'block';
}

function submitBook(e){
    e.preventDefault();
    if(bookTitle.value !== '' && author.value !== '' && pages.value !== ''){
        const book = new Book(bookTitle.value, author.value, parseInt(pages.value), readStatus.checked)
        myLibrary.push(book);
        clearForm();
        mainDiv.innerHTML = '';
        
        addBookToDOM(bookTitle.value);
        addBookForm.style.visibility = 'hidden';
        whiteOverlay.style.display = 'none';
    } else {
        alertDiv.innerHTML = `<div>Please Fill in Every Box!</div>`;
        setTimeout(()=>{
            alertDiv.innerHTML = '';
        }, 1000)
    }

}

function clearForm(){
    bookTitle.value = '';
    author.value = '';
    pages.value = '';
    readStatus.checked = false;
}

submitBookBtn.addEventListener('click', submitBook);

whiteOverlay.addEventListener('click', ()=>{
    whiteOverlay.style.display = 'none';
    addBookForm.style.visibility = 'hidden';
});

let hunch = new Book('Hunchback of Notre Dame', 'Victor Hugo', 940, false);
myLibrary.push(hunch)

addBookBtn.addEventListener('click', addBook);

function addBookToDOM(title){
    
   
    for (const [idx, book] of myLibrary.entries()){
        let newBookDiv = document.createElement('div');
        
        newBookDiv.innerHTML = `
            <div class="book" data-index="${idx}">
                <h3 class="title">${book.title}</h3>
                <div class="cover">
                <p class="author">${book.author}</p>
                <p class="pages">${book.pageCount}</p>
                <p class="read-status">${book.readStatus ? 'Read' : 'Not Read'}</p>
                <button class="change-status" onclick="changeStatus(${idx})"><i class="far fa-edit"></i></button>
                <button class="remove" onclick="removeBook(${idx})" data-index=${idx}><i class="far fa-trash-alt"></i></button>
                </div>
            </div>
        `;
        
        mainDiv.appendChild(newBookDiv)
    }
}

window.onload = () => {
    addBookToDOM();
}
