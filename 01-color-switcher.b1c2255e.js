!function(){var t=document.getElementById("start"),n=document.getElementById("stop"),e=null;t.addEventListener("click",(function(){e=setInterval((function(){document.body.style.backgroundColor="#".concat(Math.floor(16777215*Math.random()).toString(16).padStart(6,0)),t.disabled=!0}),1e3)})),n.addEventListener("click",(function(){clearInterval(e),t.disabled=!1,console.log("Interval with id ".concat(e," has stopped!"))}))}();
//# sourceMappingURL=01-color-switcher.b1c2255e.js.map
