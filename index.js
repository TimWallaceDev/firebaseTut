import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, push } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-251ef-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const moviesInDB = ref(database, "movies")

console.log(app)

function addItem() {
    //console.log("adding item")
    let input = document.getElementById("input").value

    push(moviesInDB, input)
    console.log("adding " + input + " to db.")
}

document.getElementById("inputBtn").addEventListener('click', addItem)
