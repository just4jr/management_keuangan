function toggleSidebar() {
  const sidebar = document.getElementById("sidebar");
  const mainContent = document.getElementById("mainContent");

  const isHidden = sidebar.classList.toggle("-translate-x-full");

  if (isHidden) {
    mainContent.classList.remove("ml-64");
  } else {
    mainContent.classList.add("ml-64");
  }
}

function getKategoriIcon(nama) {
  // Daftar kategori dan ikon terkait
  const icons = {
    makanan: "bi-cup-hot",
    transportasi: "bi-car-front",
    belanja: "bi-basket",
    hiburan: "bi-music-note",
    kesehatan: "bi-heart-pulse",
    // Bisa ditambahkan kategori lain
  };

  // Menggunakan kategori nama untuk menentukan ikon yang tepat
  const kategoriLower = nama.toLowerCase();
  for (let key in icons) {
    if (kategoriLower.includes(key)) {
      return icons[key];
    }
  }
  return "bi-question-circle"; // Default ikon kalau tidak ada kategori yang cocok
}

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function hitungTotal() {
  const cards = document.querySelectorAll(".budget-card");
  let totalAnggaran = 0;
  let totalPengeluaran = 0;
  cards.forEach((card) => {
    const anggaran = parseInt(card.getAttribute("data-anggaran")) || 0;
    const pengeluaran = parseInt(card.getAttribute("data-pengeluaran")) || 0;
    totalAnggaran += anggaran;
    totalPengeluaran += pengeluaran;
  });
  document.getElementById("total-anggaran").textContent =
    formatRupiah(totalAnggaran);
  document.getElementById("total-pengeluaran").textContent =
    formatRupiah(totalPengeluaran);
  document.getElementById("sisa-anggaran").textContent = formatRupiah(
    totalAnggaran - totalPengeluaran
  );
}

function tambahKategori() {
  const nama = document.getElementById("namaKategori").value;
  const anggaran = parseInt(document.getElementById("anggaranKategori").value);
  const pengeluaran = parseInt(
    document.getElementById("pengeluaranKategori").value
  );
  if (!nama || isNaN(anggaran) || isNaN(pengeluaran)) {
    alert("Lengkapi semua data kategori!");
    return;
  }

  const persentase = Math.min(100, Math.round((pengeluaran / anggaran) * 100));
  const warna = "blue"; // Bisa dikembangkan jadi random warna
  const ikon = getKategoriIcon(nama); // Mendapatkan ikon kategori

  const cardHTML = `
            <div class="budget-card bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-xl transition-shadow border-l-4 border-${warna}-500" data-anggaran="${anggaran}" data-pengeluaran="${pengeluaran}">
              <div class="flex items-center mb-4">
                <div class="bg-${warna}-100 text-${warna}-600 dark:bg-${warna}-800 dark:text-white rounded-full p-3 mr-3">
                  <i class="bi ${ikon} text-2xl"></i>
                </div>
                <h2 class="text-xl font-semibold">${nama}</h2>
              </div>
              <p class="mb-1 text-sm">Anggaran: <span class="font-semibold text-blue-600 dark:text-blue-300">Rp ${anggaran.toLocaleString(
                "id-ID"
              )}</span></p>
              <p class="mb-2 text-sm">Pengeluaran: <span class="font-semibold text-red-500">Rp ${pengeluaran.toLocaleString(
                "id-ID"
              )}</span></p>
              <div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3">
                <div class="bg-${warna}-500 h-3 rounded-full" style="width: ${persentase}%"></div>
              </div>
            </div>`;

  document
    .getElementById("budget-container")
    .insertAdjacentHTML("beforeend", cardHTML);
  hitungTotal();

  // Reset form
  document.getElementById("namaKategori").value = "";
  document.getElementById("anggaranKategori").value = "";
  document.getElementById("pengeluaranKategori").value = "";
}

document.addEventListener("DOMContentLoaded", hitungTotal);

fetch("./component/sidebar.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".sidebar-placeholder").innerHTML = data;
  })
  .catch((error) => console.error("Gagal memuat sidebar:", error));