const notif = document.querySelector(".notif");
const notif_close = document.querySelector(".notif__close");

if (notif_close) {
  notif_close.addEventListener("click", () => {
    notif.classList.remove("opacity");
    notif.classList.remove("notif--transform");
    setTimeout(() => {
      notif.classList.remove("notif--active");
    }, 300);
  });
}
