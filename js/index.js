function switchPage() {
  const hash = window.location.hash;
  if (hash) {
    document.querySelector(".nav-link.active")?.classList.remove("active");
    document.querySelector(`nav a[href="${hash}"]`)?.parentElement.classList.add("active");

    fetch(hash.substring(1) + ".html")
      .then(response => response.text())
      .then(text => {
        const elm = document.getElementById("content");
        elm.innerHTML = text;
        Array.from(elm.querySelectorAll("script"))
          .forEach( oldScriptEl => {
            const newScriptEl = document.createElement("script");
            
            Array.from(oldScriptEl.attributes).forEach( attr => {
              newScriptEl.setAttribute(attr.name, attr.value) 
            });
            
            const scriptText = document.createTextNode(oldScriptEl.innerHTML);
            newScriptEl.appendChild(scriptText);
            
            oldScriptEl.parentNode.replaceChild(newScriptEl, oldScriptEl);
        });
      });
  }
  else {
    window.location.hash = "#about";
  }
}

window.addEventListener("hashchange", switchPage);
window.addEventListener("load", switchPage);