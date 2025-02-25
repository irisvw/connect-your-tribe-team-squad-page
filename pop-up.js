const chatButtonOpen = document.querySelector("open-btn");
const chatDialog = document.querySelector("dialog");
const chatButtonClose = document.querySelector(".close-btn");

chatButtonOpen.addEventListener("click", () => {
  chatDialog.showModal();
});
chatButtonClose.addEventListener("click", () => {
  chatDialog.close();
});