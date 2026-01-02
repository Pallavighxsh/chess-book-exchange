import {
  collection,
  onSnapshot,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";
import { toggleStatus, updateHolder } from "./firestore-actions.js";

document.addEventListener("DOMContentLoaded", () => {

  /* --------------------------------------------------
     DOM REFERENCES
  -------------------------------------------------- */

  const booksGrid = document.querySelector(".books-grid");
  const addBookBtn = document.getElementById("add-book-btn");

  if (!booksGrid) {
    console.error("❌ .books-grid not found in DOM");
    return;
  }

  /* --------------------------------------------------
     REALTIME BOOK RENDER
  -------------------------------------------------- */

  const booksRef = collection(db, "books");

  onSnapshot(booksRef, (snapshot) => {
    console.log("📚 Books snapshot size:", snapshot.size);

    booksGrid.innerHTML = "";

    snapshot.forEach((docSnap) => {
      const book = docSnap.data();
      const id = docSnap.id;

      const card = document.createElement("div");
      card.className = "book-card";

      card.innerHTML = `
        <h3>${book.title || "The Complete Book of Chess Strategy — Silman"}</h3>
        <p class="author">${book.author || ""}</p>

        <p class="meta">
          <span>Status:</span>
          <button class="status-btn ${book.status}">
            ${book.status}
          </button>
        </p>

        <p class="meta">
          <span>Original Owner:</span>
          <span class="owner">
            ${book.originalOwner || "Pallavi"}
          </span>
        </p>

        <p class="meta">
          <span>Current Holder:</span>
          <span class="holder" contenteditable="true">
            ${book.currentHolder || "Pallavi"}
          </span>
        </p>
      `;

      card.querySelector(".status-btn").onclick = () => {
        toggleStatus(id, book.status);
      };

      const holderEl = card.querySelector(".holder");
      holderEl.onblur = () => {
        updateHolder(id, holderEl.innerText.trim());
      };

      booksGrid.appendChild(card);
    });
  });

  /* --------------------------------------------------
     ADD BOOK FLOW
  -------------------------------------------------- */

  if (addBookBtn) {
    addBookBtn.onclick = () => {

      if (document.querySelector(".add-book-card")) return;

      const formCard = document.createElement("div");
      formCard.className = "book-card add-book-card";

      formCard.innerHTML = `
        <input class="input" placeholder="Title" />
        <input class="input" placeholder="Author" />
        <button class="save">Save</button>
      `;

      formCard.querySelector(".save").onclick = async () => {
        const inputs = formCard.querySelectorAll("input");

        const title = inputs[0].value.trim();
        const author = inputs[1].value.trim();

        if (!title || !author) {
          alert("Please fill all fields");
          return;
        }

        await addDoc(booksRef, {
          title,
          author,
          originalOwner: "Pallavi",
          currentHolder: "Pallavi",
          status: "available"
        });

        formCard.remove();
      };

      booksGrid.prepend(formCard);
    };
  }

});
