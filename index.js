import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://playground-251ef-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")
const bookInDB = ref(database, "books")

const books = document.getElementById("books")

onValue(shoppingListInDB, function (snapshot) {

    if (snapshot.exists()) {
        console.log(snapshot.val())
        let shoppingListItems = Object.entries(snapshot.val())

        clearShoppingList()

        // append each item to the list
        for (let i = 0; i < shoppingListItems.length; i++) {
            let currentItem = shoppingListItems[i]
            let currentItemId = currentItem[0]
            let currentItemValue = currentItem[1]
            addItemToShoppingList(currentItem)
            //console.log(currentItem)
        }
    }
    else {
        clearShoppingList()
        addItemToShoppingList([0, "no items in your list"])
    }

})

function clearShoppingList() {
    const list = document.getElementById("list")
    list.innerHTML = ""
}

function addItemToDB() {
    //grab form and its value
    let value = document.getElementById("input").value

    //add item to database
    push(shoppingListInDB, value)

    //clear form input
    clearForm()
}

function clearForm() {
    let form = document.getElementById("input")
    form.value = ""
}

function addItemToShoppingList(item) {
    const shoppingList = document.getElementById("list")
    let newEl = document.createElement("li")
    let itemValue = item[1]
    let itemID = item[0]
    newEl.innerText = itemValue

    newEl.addEventListener("dblclick", function () {
        console.log("removing item")
        let exactLocationInDB = ref(database, `shoppingList/${itemID}`)
        console.log(exactLocationInDB)
        remove(exactLocationInDB)
    })
    shoppingList.appendChild(newEl)
}

document.getElementById("inputBtn").addEventListener('click', addItemToDB)
