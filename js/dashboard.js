fetch("./component/sidebar.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".sidebar-placeholder").innerHTML = data;
  })
  .catch((error) => console.error("Gagal memuat sidebar:", error));