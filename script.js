// === Ambil elemen ===
const music = document.getElementById("background-music");
const slideSatu = $("#slideSatu");
const slideDua = $("#slideDua");
const slideTiga = $("#slideTiga");
const slideEmpat = $("#slideEmpat");
const slideLima = $("#slideLima");
const trims = $("#trims");

// === Teks ucapan ===
const text1 = `Barakallah Fi Umrik, selamat ulang tahun sayangg ❤️🎉

Terimakasih udah jadi orang yang selalu ada buat aku, sabar ngadepin aku dan selalu men-support aku walaupun belum jadi apa-apa atau setidaknya naik level lebih tinggi dari sebelumnya, tapi kamu masih terus nemenin langkah aku sampai sekarang.`;

const text2 = `Semangat sayang buat kejar mimpi kamu! Semoga tahun depan jadi tahun keberuntungan kamu menjadi PNS yang kamu impikan selama ini. Kamu pasti bisa sayang, percaya itu! Jangan takut, aku di sini selalu nemenin kamu dan selalu ngedukung setiap langkah baik kamu. Jangan pernah ngerasa sendiri yaa 💕 🤗

Jangan pernah bosan ya sayang, tetap kaya gini terus. Ya walaupun terkadang berantem, tapi begitulah yang namanya hubungan. Yang penting, di setiap masalah kita harus bisa cari jalan keluarnya bersama ❤️

Semoga di ulang tahun ini kamu diberikan umur yang berkah dan bermanfaat, dilancarkan rezekinya, dimudahkan urusan serta hajatnya, dijauhkan dari hal-hal negatif. Aamiin 🤲`;

// === Klik pertama mulai semuanya ===
document.body.addEventListener("click", startSequence, { once: true });

function startSequence() {
  music.play();
  createConfetti(200); // lebih banyak & rame

  setTimeout(() => {
    slideSatu.addClass("animate__fadeOutUp");
    setTimeout(() => {
      slideSatu.addClass("d-none");
      slideDua.removeClass("d-none");
      typeText("#teks1", text1, () => {
        slideDua.addClass("d-none");
        slideTiga.removeClass("d-none");
        typeText("#teks2", text2, () => {
          slideTiga.addClass("d-none");
          slideEmpat.removeClass("d-none").addClass("animate__fadeInUp");
        });
      });
    }, 1000);
  }, 1500);
}

// === Efek mengetik lambat & romantis ===
// === Efek mengetik super pelan & natural ===
function typeText(selector, content, callback) {
  const element = document.querySelector(selector);
  const paragraphs = content.split("\n\n");
  let current = 0;

  async function typeNextParagraph() {
    if (current >= paragraphs.length) {
      setTimeout(callback, 2000);
      return;
    }

    const text = paragraphs[current];
    await typeSlowly(element, text, 500); // <<< atur kecepatan di sini (100 = pelan banget)
    element.innerHTML += "<br><br>";
    current++;
    setTimeout(typeNextParagraph, 10000); // jeda antar paragraf
  }

  typeNextParagraph();
}

// Fungsi ketik manual (real typing)
function typeSlowly(element, text, delay) {
  return new Promise(resolve => {
    let i = 0;
    function typing() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(typing, delay); // <<< ini kecepatan ketikan antar huruf
      } else {
        resolve();
      }
    }
    typing();
  });
}
// === Efek kertas warna-warni slow motion jatuh ===
function createConfetti(amount) {
  for (let i = 0; i < amount; i++) {
    const confetti = document.createElement("div");
    confetti.classList.add("confetti");
    confetti.style.left = Math.random() * 100 + "vw";
    confetti.style.animationDuration = 7 + Math.random() * 6 + "s"; // jatuh lebih pelan
    confetti.style.backgroundColor = [
      "#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF", "#FF8C00", "#FF69B4", "#7B68EE"
    ][Math.floor(Math.random() * 7)];
    confetti.style.width = confetti.style.height = Math.random() * 10 + 6 + "px";
    confetti.style.opacity = Math.random() * 0.9 + 0.3;
    document.body.appendChild(confetti);
    setTimeout(() => confetti.remove(), 15000); // bertahan lebih lama
  }
}

// === Tombol suka/gak suka ===
$("#suka").on("click", function() {
  slideEmpat.addClass("d-none");
  slideLima.removeClass("d-none").addClass("animate__bounceIn");
  trims.removeClass("d-none").text("Makasih ya sayang, aku juga suka banget 😘");
});

$("#gak").on("click", function() {
  slideEmpat.addClass("d-none");
  trims.removeClass("d-none").css({
    "background": "#fff",
    "color": "#000",
    "padding": "10px",
    "border-radius": "10px"
  }).text("Yahh... 😢 Tapi aku tetap sayang kamu kok ❤️");
});

// === Countdown Menuju Ulang Tahun ===
function updateCountdown() {
  const now = new Date();
  let nextBirthday = new Date(now.getFullYear(), 9, 26);
  if (now > nextBirthday) nextBirthday.setFullYear(now.getFullYear() + 1);

  const diff = nextBirthday - now;
  const d = Math.floor(diff / (1000 * 60 * 60 * 24));
  const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const m = Math.floor((diff / (1000 * 60)) % 60);
  const s = Math.floor((diff / 1000) % 60);

  $("#days").text(d);
  $("#hours").text(h);
  $("#minutes").text(m);
  $("#seconds").text(s);
}
setInterval(updateCountdown, 1000);
updateCountdown();
