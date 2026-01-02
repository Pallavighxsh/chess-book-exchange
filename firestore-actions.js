import {
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { db } from "./firebase.js";

/* --------------------------------------------------
   TOGGLE BOOK STATUS
-------------------------------------------------- */

export async function toggleStatus(bookId, currentStatus) {
  const bookRef = doc(db, "books", bookId);

  await updateDoc(bookRef, {
    status: currentStatus === "available" ? "borrowed" : "available",
    currentHolder: currentStatus === "available" ? "Someone" : ""
  });
}

/* --------------------------------------------------
   UPDATE CURRENT HOLDER
-------------------------------------------------- */

export async function updateHolder(bookId, newHolder) {
  const bookRef = doc(db, "books", bookId);

  await updateDoc(bookRef, {
    currentHolder: newHolder
  });
}
