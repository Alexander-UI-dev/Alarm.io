const swiperH = document.querySelector(".install-alarm .hours_swiper .swiperH .swiper-wrapper");
const swiperM = document.querySelector(".install-alarm .minutes_swiper .swiperM .swiper-wrapper");

const menuH = document.querySelector(".install-alarm #selectHours");
const menuM = document.querySelector(".install-alarm #selectMinutes");

for(let i = 0; i < 24; i++) {
    swiperH.innerHTML += `<div class="swiper-slide">${i < 10 ? "0" + i : i}</div>`;
    menuH.innerHTML += `<option value=${i}>${i < 10 ? "0" + i : i}</option>`;
}

for(let i = 0; i < 60; i++) {
    swiperM.innerHTML += `<div class="swiper-slide">${i < 10 ? "0" + i : i}</div>`;
    menuM.innerHTML += `<option value=${i}>${i < 10 ? "0" + i : i}</option>`;
}



const swiperHour = new Swiper(".swiperH", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
      releaseOnEdges: true,
    },
    on: {
      touchMove() {
        if(isCheckedAutoChangeSwitch) {
          isChangeH = true
        }
      }
    }
});

const swiperMinutes = new Swiper(".swiperM", {
    direction: "vertical",
    slidesPerView: 1,
    spaceBetween: 0,
    mousewheel: {
      releaseOnEdges: true,
    },
    on: {
      touchMove() {
        if(isCheckedAutoChangeSwitch) {
          isChangeM = true
        }
      }
    }
})
