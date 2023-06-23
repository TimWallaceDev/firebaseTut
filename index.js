import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-251ef-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

console.log(app)

function addItem() {
    //console.log("adding item")
    let input = document.getElementById("input")
    let value = input.value

    push(shoppingListInDB, value)
    console.log("adding " + value + " to db.")
    input.value = ""

    //add new li element
    const list = document.getElementById("list")

    let newEl = document.createElement("li")
    newEl.innerText = value

    list.appendChild(newEl)
}

document.getElementById("inputBtn").addEventListener('click', addItem)
