import"./assets/modulepreload-polyfill-3cfb730f.js";import{f as h,i as y}from"./assets/vendor-77e16229.js";const D={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(e){console.log(e[0])}};h("#datetime-picker",D);const s=document.querySelector("[data-start]"),n=document.getElementById("datetime-picker");n.addEventListener("change",()=>{new Date(n.value)<=new Date?(s.disabled=!0,y.error({title:"Error",message:"Please choose a date in the future"})):s.disabled=!1});let r;s.addEventListener("click",()=>{s.disabled=!0,n.disabled=!0,clearInterval(r);const e=new Date(n.value).getTime();r=setInterval(()=>{const o=new Date().getTime(),t=e-o;t<=0?(clearInterval(r),i(0),n.disabled=!1):i(t)},1e3)});function i(e){const{days:o,hours:t,minutes:c,seconds:d}=g(e);document.querySelector("[data-days]").textContent=a(o),document.querySelector("[data-hours]").textContent=a(t),document.querySelector("[data-minutes]").textContent=a(c),document.querySelector("[data-seconds]").textContent=a(d)}function g(e){const u=Math.floor(e/864e5),l=Math.floor(e%864e5/36e5),m=Math.floor(e%864e5%36e5/6e4),f=Math.floor(e%864e5%36e5%6e4/1e3);return{days:u,hours:l,minutes:m,seconds:f}}function a(e){return e<10?`0${e}`:e}
//# sourceMappingURL=commonHelpers.js.map
