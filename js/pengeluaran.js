document
  .getElementById("transactionForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const transaction = {
      date: document.getElementById("transactionDate").value,
      type: document.getElementById("transactionType").value,
      category: document.getElementById("category").value,
      description: document.getElementById("description").value,
      amount: document.getElementById("amount").value,
    };

    // Add transaction to the table
    const row = document.createElement("tr");
    const amountClass =
      transaction.type === "income" ? "text-white" : "text-red-600";
    const typeClass =
      transaction.type === "income"
        ? "bg-green-100 text-white"
        : "bg-red-100 text-red-800";
    const amountPrefix = transaction.type === "income" ? "+" : "-";
    const typeText =
      transaction.type === "income" ? "Pemasukan" : "Pengeluaran";

    row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${
                  transaction.date
                }</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="px-2 py-1 text-xs font-semibold rounded-full ${typeClass}">${typeText}</span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-800">${
                  transaction.category
                }</td>
                <td class="px-6 py-4 text-sm text-gray-800">${
                  transaction.description
                }</td>
                <td class="px-6 py-4 whitespace-nowrap text-sm ${amountClass}">${amountPrefix} Rp ${parseInt(
      transaction.amount
    ).toLocaleString()}</td>
            `;

    document.getElementById("transactionList").prepend(row);

    // Clear form
    this.reset();
  });

fetch("./component/sidebar.html")
  .then((response) => response.text())
  .then((data) => {
    document.querySelector(".sidebar-placeholder").innerHTML = data;
  })
  .catch((error) => console.error("Gagal memuat sidebar:", error));