/* -----------------------------
 * Konfigurasi
 * ----------------------------- */
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbz0BRw_TJOYP0UjPIpFTb6YHTZXTZK3tdw_CaKKwzA-1febUDYDRh7XURLyWYSD-Nrz/exec";

/* -----------------------------
 * Helpers
 * ----------------------------- */
const $ = (sel, parent = document) => parent.querySelector(sel);
const $$ = (sel, parent = document) => Array.from(parent.querySelectorAll(sel));

function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  const val = params.get(name);
  return val ? decodeURIComponent(val.replace(/\+/g, " ")) : "";
}

function niceName(str) {
  if (!str) return "";
  // Capitalize each word, keep spaces
  return str
    .trim()
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/* -----------------------------
 * Auto-fill nama penerima (hero, info, rsvp) - revised
 * ----------------------------- */
(function autofillRecipient() {
  const params = new URLSearchParams(window.location.search);
  const hasTo = params.has("to"); // true jika param 'to' ada (meski kosong)
  const rawTo = params.get("to") || ""; // bisa "" (kosong)
  const cleaned = niceName(rawTo.replace(/\+/g, " ").trim()); // normalisasi

  const heroRecipient = document.querySelector("#hero-recipient");
  const infoRecipient = document.querySelector("#nama-penerima");
  const namaInput = document.querySelector("#nama");

  if (hasTo && cleaned === "") {
    // 'to' ada tapi kosong -> pakai default untuk tampilan, kosongkan input RSVP
    if (heroRecipient) {
      heroRecipient.innerHTML = 'Kepada Bapak/Ibu/Saudara/i, <span class="font-medium">Tamu Undangan</span>';
    }
    if (infoRecipient) {
      infoRecipient.textContent = "Tamu Undangan";
    }
    // namaInput: biarkan kosong
    if (namaInput) namaInput.value = "";
    return;
  }

  if (cleaned) {
    if (heroRecipient) {
      heroRecipient.innerHTML = `Kepada Bapak/Ibu/Saudara/i, <span class="font-medium">${cleaned}</span>`;
    }
    if (infoRecipient) {
      infoRecipient.textContent = cleaned;
    }
    if (namaInput && !namaInput.value) {
      namaInput.value = cleaned;
    }
  }
})();

/* -----------------------------
 * Scrollspy active state
 * ----------------------------- */
(function initScrollSpy() {
  const sections = ["#beranda", "#info", "#lokasi", "#rsvp", "#gifts"]
    .map((id) => document.querySelector(id))
    .filter(Boolean);
  const links = new Map($$("#main-nav .nav-link").map((a) => [a.getAttribute("href").replace("#", ""), a]));

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        const link = links.get(id);
        if (!link) return;

        if (entry.isIntersecting) {
          // remove active from others
          links.forEach((l) => l.classList.remove("active"));
          link.classList.add("active");
        }
      });
    },
    {
      rootMargin: "-40% 0px -55% 0px", // detect when section is near middle of viewport
      threshold: [0, 0.2, 0.6, 1],
    },
  );

  sections.forEach((sec) => observer.observe(sec));
})();

/* -----------------------------
 * Footer year
 * ----------------------------- */
$("#year").textContent = new Date().getFullYear();

/* -----------------------------
 * RSVP submit handler → Google Sheets (Apps Script)
 * ----------------------------- */
(function initRSVP() {
  const form = $("#rsvp-form");
  if (!form) return;

  const successAlert = $("#alert-success");
  const errorAlert = $("#alert-error");
  const submitBtn = $("#submit-btn");
  const spinner = $("#btn-spinner");

  function show(el) {
    el?.classList.remove("hidden");
  }
  function hide(el) {
    el?.classList.add("hidden");
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    hide(errorAlert);
    hide(successAlert);

    // basic validation
    const nama = $("#nama").value.trim();
    const email = $("#email").value.trim();
    const jumlah = $("#jumlah").value;
    const status = (form.querySelector('input[name="status"]:checked') || {}).value || "";
    if (!nama || !email || !jumlah || !status) {
      show(errorAlert);
      errorAlert.querySelector(".font-medium").textContent = "Mohon lengkapi semua kolom wajib.";
      return;
    }

    submitBtn.disabled = true;
    show(spinner);

    try {
      // const data = {
      //   nama,
      //   email,
      //   jumlah: Number(jumlah),
      //   status,
      //   pesan: $("#pesan").value.trim(),
      //   submitted_at: new Date().toISOString(),
      // };

      const formData = new FormData(form);

      // Tambahan field opsional
      // formData.set("submitted_at", new Date().toISOString());

      // KIRIM sebagai FormData (bukan JSON)
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // biarkan; kita tidak baca respons
        body: formData, // <- ini kuncinya
      });

      // Pada mode no-cors, kita tidak bisa baca status. Tampilkan sukses optimistis.
      show(successAlert);
      form.reset();

      // isi ulang nama dari query jika ada
      const to = niceName(getQueryParam("to"));
      if (to) $("#nama").value = to;
    } catch (err) {
      console.error(err);
      show(errorAlert);
    } finally {
      submitBtn.disabled = false;
      hide(spinner);
    }
  });
})();

/* -----------------------------
 * Gifts: Copy nomor rekening
 * ----------------------------- */
(function copyRek() {
  const btn = $("#btn-copy-rek");
  const hint = $("#copy-hint");
  if (!btn) return;
  btn.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("302937291");
      hint?.classList.remove("hidden");
      setTimeout(() => hint?.classList.add("hidden"), 2200);
    } catch (e) {
      alert("Tidak dapat menyalin. Silakan salin manual.");
    }
  });
})();
