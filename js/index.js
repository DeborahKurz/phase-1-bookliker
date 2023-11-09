document.addEventListener("DOMContentLoaded", function() {
    fetchBooks();
});

function fetchBooks(){
    fetch('http://localhost:3000/books')
    .then(resp => resp.json())
    .then(booksArr => {
        createBooksList(booksArr);
    });
};

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

function createUsers(usersArr){
    usersArr.forEach(userObj =>{
        let userLi = document.createElement("li");
        userLi.textContent = userObj.username;
        userLi.className = "userLi";
        let userDiv = document.getElementById("userDiv");
        userDiv.appendChild(userLi);
    });
};

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