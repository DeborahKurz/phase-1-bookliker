//Deliverable 1: 10min

document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});
//fetch books
function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(booksArr => {
        createBooksList(booksArr);
    });
};
//render titles on dom
function createBooksList(booksArr){
    let ul = document.getElementById("list");
    booksArr.map(bookObj => {
        let bookLi = document.createElement("li");
        bookLi.textContent = bookObj.title;
        bookLi.className = "bookLi";
        ul.appendChild(bookLi);
        attachListener(bookObj, bookLi);
    });
};

//when book  title is clicked, render it's info to DOM.

//Deliverable 2: 18min
function attachListener(bookObj, bookLi){
    let displayDiv = document.getElementById("show-panel");
    bookLi.addEventListener("click", ()=>{
        clearOldBooks();

        let bookDiv = document.createElement("div");
        bookDiv.className = "bookDiv";
        displayDiv.appendChild(bookDiv);

        let img = document.createElement("img");
        img.src = bookObj.img_url;
        let p = document.createElement("p");
        p.textContent = bookObj.description;
        bookDiv.append(img, p);
        
        //creates a div to put users in
        let userDiv = document.createElement("div");
        userDiv.id = "userDiv";
        bookDiv.appendChild(userDiv);

        let usersArr = bookObj.users;
        createUsers(usersArr);

        let btn = document.createElement("button");
        btn.textContent = " LIKE ";
        bookDiv.appendChild(btn);

        btn.addEventListener("click", ()=> {
            let bookId = bookObj.id;
            clearUserList();
            patchUsers(usersArr, bookId);
        });
    });
};

//Creates only the users who have liked the item
function createUsers(usersArr){
    usersArr.forEach(userObj =>{
        let userLi = document.createElement("li");
        userLi.textContent = userObj.username;
        userLi.className = "userLi";
        let userDiv = document.getElementById("userDiv");
        userDiv.appendChild(userLi);
    });
}

//updates the users and returns the update suers
function patchUsers (usersArr, bookId) {
    let newUser = {id: 1, username: "fluffy-bear"};
    usersArr.push(newUser);

    fetch(`http://localhost:3000/books/${bookId}`,{
        method: "PATCH",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({
            users: usersArr

        })
    })
    .then(resp => resp.json())
    .then(bookObj => {
        clearUserList;
        let users = bookObj.users;
        createUsers(users);
    });
};

function clearUserList(){
    let oldUserList = document.getElementsByClassName("userLi");
    for(const user of oldUserList){
        user.remove();
    }   
};

function clearOldBooks(){
    let bookDiv = document.getElementsByClassName("bookDiv");
    for(const book of bookDiv){
        book.remove();
    }
};
