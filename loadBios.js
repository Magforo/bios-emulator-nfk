// Получаємо профіль
const profileStr = localStorage.getItem('profile999');

let flasins = document.getElementById('FlashInstant');
let multt = localStorage.getItem('multip')
let allcoresss = localStorage.getItem('allCor')
let errorMessage = "";
const speeds = {
  "[x5.0 1000 MHz]": " 1.00 ",
  "[x6.0 1200 MHz]": " 1.20 ",
  "[x7.0 1400 MHz]": " 1.40 ",
  "[x8.0 1600 MHz]": " 1.60  ",
  "[x9.0 1800 MHz]": " 1.80  ",
  "[x10.0 2000 MHz]": " 2.00  ",
  "[x11.0 2200 MHz]": " 2.20  ",
  "[x12.0 2400 MHz]": " 2.40  ",
  "[x13.0 2600 MHz]": " 2.60  ",
  "[x14.0 2800 MHz]": " 2.80  ",
  "[x15.0 3000 MHz]": " 3.00  ",
  "[x16.0 3200 MHz]": " 3.20  ",
  "[x17.0 3400 MHz]": " 3.40  ",
  "[x18.0 3600 MHz]": " 3.60  ",
  "[x19.0 3800 MHz]": " 3.80  ",
  "[x20.0 4000 MHz]": " 4.00  ",
};
const corel = {
  "[All Cores]": "8",
  "[One Core Per Unit]": "1",
  "[Two Cores]": "2",
  "[Four Cores]": "4",
  "[Six Cores]": "6",
};



if (allcoresss && corel[allcoresss]) {
  document.getElementById('allcorw').innerHTML = corel[ allcoresss ];
}

if (multt && speeds[multt]) {
  document.getElementById('ghztemp').innerHTML = speeds[ multt ];
}

document.addEventListener("keydown", function(event) {
  if (event.key === "F2" || event.key === "Delete") {
    document.getElementById('numberthree5').innerHTML = `Entering SETUP...`
      event.preventDefault(); // Предотвращаем стандартное поведение F6 (например, в браузерах)
      setTimeout(() => {
          history.replaceState(null, "", "/bios.html");
          window.location.href = "/bios.html";
      }, 800);
  }
  if (event.key === "F6") {
    document.getElementById('numberthree6').innerHTML = `Entering SETUP...`
      event.preventDefault(); // Предотвращаем стандартное поведение F6 (например, в браузерах)
      setTimeout(() => {
          history.replaceState(null, "", "/biosinstant.html"); 
          window.location.href = "/biosinstant.html";
      }, 800);
  }
});


// Устанавливаем начальное состояние (скрытый, но занимает место)
flasins.style.opacity = "0";
 flasins.style.visibility = "hidden";
flasins.style.transition = "opacity 0.5s ease-in-out, visibility 0.5s ease-in-out";

// Через 1 секунду делаем элемент видимым с анимацией
setTimeout(() => {
  flasins.style.visibility = "visible";
  flasins.style.opacity = "1";
}, 1300);

document.getElementById('amerimeg').style.display = "" ;
document.getElementById('amerimeg1').style.display = "" ;

setTimeout(() => {
  document.getElementById('amerimeg').style.display = "none" ;
document.getElementById('amerimeg1').style.display = "none" ;
  numberthree9.style.display = "";
  checkInfo.innerHTML = `0880`
setTimeout(() => {
  numberthree10.style.display = "";
  checkInfo.innerHTML = `0075`
  setTimeout(() => {
    numberthree11.style.display = "";
    checkInfo.innerHTML = `0078`
    setTimeout(() => {
      document.getElementById('numberthree12').style.display = "" ;
       checkInfo.innerHTML = `00A1`
       setTimeout(() => {
        document.getElementById('numberthree13').style.display = "" ;
       }, 200);
       setTimeout(() => {
        document.getElementById('numberthree14').style.display = "" ;
        setTimeout(() => {
          if (profileStr) {
            const profile = JSON.parse(profileStr);
          
            // 1. Проверка Chipset Settings
            if (profile.onboardCoutEl === "[3000]") {
              document.getElementById('numberthree5').innerHTML = `
                <div>
                  <div style="color: red">Wrong settings... Chipset Settings</div>
                  Correct the settings so that the system will start.
                  <br>
                  Press F2 to correct the settings
                </div>`;
              return;
            }
          
            // 2. Проверка CPU Voltage Settings
            if (
              profile.vcoreoff === "[2.70V]" &&
              profile.vol2aut === "[1.3000 V]"
            ) {
              document.getElementById('numberthree5').innerHTML = `
                <div>
                  <div style="color: red">Wrong settings... CPU Voltage Settings</div>
                  Correct the settings so that the system will start.
                  <br>
                  Press F2 to correct the settings
                </div>`;
              return;
            }
          
            // 3. Проверка Boot Device
            if (profile.satatoshib_1 === "[Disabled]") {
              document.getElementById('numberthree5').innerHTML = `
                <div>
                  <div style="color: red">Wrong settings... No Boot Device</div>
                  Correct the settings so that the system will start.
                  <br>
                  Press F2 to correct the settings
                </div>`;
              return;
            }
            // 4. Перевірка на HT error
            if (profile.htbussp === "[x11 2200 MHz]" && profile.multi === "[x11 2200 MHz]") {
  document.getElementById('numberthree5').innerHTML = `<div> 
    <div style="color: red">Wrong settings... HT error</div>
    Correct the settings so that the system will start.
    <br>
    Press F2 to correct the settings
    </div>`;
  return;
}
          
          } else {
            console.warn("Профіль profile999 не знайдено в localStorage");
          }
          document.getElementById('numberthree15').style.display = "" ;
          checkInfo.innerHTML = `00B1`
       if(document.getElementById('numberthree5').innerHTML === `Press F2 or DEL to Run Setup`){
          document.getElementById('numberthree5').innerHTML = `Entering SETUP...`
        }
          setTimeout(() => {
            history.replaceState(null, "", "/bios.html");
            window.location.href = "/bios.html";
          }, 800);
         }, 400);
       }, 200);
     }, 200);
  }, 200);
}, 200);




}, 5300);
