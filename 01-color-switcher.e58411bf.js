const t={startButton:document.querySelector("[data-start]"),stopButton:document.querySelector("[data-stop]"),bodyEl:document.body};let o=null;t.startButton.addEventListener("click",(function(){o=setInterval((()=>{const o=`#${Math.floor(16777215*Math.random()).toString(16)}`;t.bodyEl.style.backgroundColor=o}),1e3),t.startButton.disabled=!0})),t.stopButton.addEventListener("click",(function(){clearInterval(o),t.startButton.disabled=!1}));
//# sourceMappingURL=01-color-switcher.e58411bf.js.map