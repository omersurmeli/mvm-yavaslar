// Kampanyaları değiştirmek için yalnızca aşağıdaki listeyi düzenleyin.
// Yeni ürün eklemek için mevcut satırlardan birini kopyalayabilirsiniz.
const campaigns = [
  { badge: "Haftanın Fırsatı", name: "Seçili El Aletleri", description: "Tamirat ve montaj işleriniz için avantajlı ürünler.", message: "Seçili el aletleri kampanyası hakkında bilgi almak istiyorum." },
  { badge: "Mağazaya Özel", name: "Boya & Yardımcı Malzemeler", description: "Yenileme işleriniz için seçili ürünlerde mağazaya özel fırsatlar.", message: "Boya ve yardımcı malzeme kampanyası hakkında bilgi almak istiyorum." },
  { badge: "Stoklarla Sınırlı", name: "Tesisat Ürünleri", description: "İhtiyacınıza uygun tesisat ürünleri için güncel stok bilgisini sorun.", message: "Tesisat ürünleri kampanyası hakkında bilgi almak istiyorum." }
];

const phone = "905389705265";
const list = document.querySelector("#campaign-list");
list.innerHTML = campaigns.map(item => `
  <article class="campaign-card">
    <span class="badge">${item.badge}</span>
    <h3>${item.name}</h3>
    <p>${item.description}</p>
    <a href="https://wa.me/${phone}?text=${encodeURIComponent(`Merhaba MVM Yavaşlar Yapı Market, ${item.message}`)}" target="_blank" rel="noopener">WhatsApp'tan bilgi al →</a>
  </article>`).join("");

document.querySelector("#year").textContent = new Date().getFullYear();
const menuButton = document.querySelector(".menu-button");
const nav = document.querySelector("#main-nav");
menuButton.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
}));
