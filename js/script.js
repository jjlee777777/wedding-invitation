// JavaScript Document


const weddingInfo = {

    // 신랑 신부
    groom: "서준호",
    bride: "한서연",

    // 예식일
    date: "2026.08.09",
    time: "PM 2:00",

    // 예식장
    hall: "빌라드지디 청담",

    address: "서울특별시 강남구 학동로 519",

    // 지도
    naver: "https://naver.me/FN7XxqiL",

    kakao: "https://place.map.kakao.com/1417946142",

    // 연락처
    groomPhone: "010-1234-5678",

    bridePhone: "010-9876-5432"

};


/*
const weddingInfo = {

    hall: "빌라드지디",

    address: "서울특별시 강동구 천호대로 1077",

    naver: "네이버지도 URL",

    kakao: "카카오맵 URL"

};  */








// 배경음악 ON / OFF
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

let isPlaying = false;

musicBtn.addEventListener("click", () => {
  if (!isPlaying) {
    bgMusic.play();
    musicBtn.textContent = "Ⅱ";
    isPlaying = true;
  } else {
    bgMusic.pause();
    musicBtn.textContent = "▶";
    isPlaying = false;
  }
});


// 계좌번호 복사
function copyAccount(account) {
  navigator.clipboard.writeText(account).then(() => {
    alert("계좌번호가 복사되었습니다.");
  });
}

// D-Day 카운트다운
const weddingDate = new Date("2026-08-15T14:00:00").getTime();

function updateDday() {
  const now = new Date().getTime();
  const distance = weddingDate - now;

  const daysEl = document.getElementById("days");
  const hoursEl = document.getElementById("hours");
  const minutesEl = document.getElementById("minutes");
  const secondsEl = document.getElementById("seconds");
  const ddayTextEl = document.getElementById("ddayText");

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !ddayTextEl) {
    return;
  }

  if (distance <= 0) {
    daysEl.textContent = "0";
    hoursEl.textContent = "00";
    minutesEl.textContent = "00";
    secondsEl.textContent = "00";
    ddayTextEl.textContent = "0";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = days;
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
  ddayTextEl.textContent = days;
}

updateDday();
setInterval(updateDday, 1000);


// 갤러리 확대 + 좌우 넘김 + 자동 슬라이드
const galleryImages = document.querySelectorAll(".gallery-wrap img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const closeLightbox = document.getElementById("closeLightbox");
const prevPhoto = document.getElementById("prevPhoto");
const nextPhoto = document.getElementById("nextPhoto");

let currentPhotoIndex = 0;
let galleryTimer = null;

function showPhoto(index) {
  if (index < 0) {
    currentPhotoIndex = galleryImages.length - 1;
  } else if (index >= galleryImages.length) {
    currentPhotoIndex = 0;
  } else {
    currentPhotoIndex = index;
  }

  lightboxImg.src = galleryImages[currentPhotoIndex].src;
}

function openLightbox(index) {
  showPhoto(index);
  lightbox.classList.add("active");

  galleryTimer = setInterval(() => {
    showPhoto(currentPhotoIndex + 1);
  }, 3000);
}

function closeGallery() {
  lightbox.classList.remove("active");
  clearInterval(galleryTimer);
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => {
    openLightbox(index);
  });
});

nextPhoto.addEventListener("click", (e) => {
  e.stopPropagation();
  showPhoto(currentPhotoIndex + 1);
});

prevPhoto.addEventListener("click", (e) => {
  e.stopPropagation();
  showPhoto(currentPhotoIndex - 1);
});

closeLightbox.addEventListener("click", (e) => {
  e.stopPropagation();
  closeGallery();
});

lightbox.addEventListener("click", () => {
  closeGallery();
});

lightboxImg.addEventListener("click", (e) => {
  e.stopPropagation();
});

document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "ArrowRight") {
    showPhoto(currentPhotoIndex + 1);
  }

  if (e.key === "ArrowLeft") {
    showPhoto(currentPhotoIndex - 1);
  }

  if (e.key === "Escape") {
    closeGallery();
  }
});

// 연락하기 아코디언
const accordionTitles = document.querySelectorAll(".accordion-title");

accordionTitles.forEach(title => {
  title.addEventListener("click", () => {
    const content = title.nextElementSibling;
    content.classList.toggle("active");
  });
});


// 스크롤 애니메이션

const fadeItems=document.querySelectorAll(".fade-up");

function fadeAnimation(){

fadeItems.forEach(item=>{

const top=item.getBoundingClientRect().top;

if(top<window.innerHeight-120){

item.classList.add("show");

}

});

}

window.addEventListener("scroll",fadeAnimation);

fadeAnimation();

// OPEN 인트로 + 음악 시작
const intro = document.getElementById("intro");
const openBtn = document.getElementById("openBtn");

if (intro && openBtn && bgMusic && musicBtn) {
  openBtn.addEventListener("click", () => {
    bgMusic.play();
    musicBtn.textContent = "Ⅱ";
    isPlaying = true;
    intro.classList.add("hide");
  });
}


document.getElementById("hallName").textContent = weddingInfo.hall;

document.getElementById("hallAddress").textContent = weddingInfo.address;

document.getElementById("naverMap").href = weddingInfo.naver;

document.getElementById("kakaoMap").href = weddingInfo.kakao;


// 갤러리 손가락 스와이프
let startX = 0;

lightbox.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", (e) => {
  let endX = e.changedTouches[0].clientX;

  if (startX - endX > 50) {
    nextPhoto.click();
  }

  if (endX - startX > 50) {
    prevPhoto.click();
  }
});
