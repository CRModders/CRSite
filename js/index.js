function switchPage() {
  const navPointer = document.getElementById("nav-pointer");
  const navOuter = document.getElementById("nav-page");
  const nav = document.getElementById("nav-page-inner");
  const hash = window.location.hash;

  if (hash) {
    let activeLink;

    for (let i = 0; i < nav.children.length; i++) {
      let child = nav.children.item(i);
      let pos = i * 100 + "%";

      child.addEventListener("mouseenter", () => {
        navPointer.style.transform = `translateX(${pos})`;
      });

      if (hash === child.firstChild.getAttribute("href")) {
        activeLink = child;
        navPointer.style.transform = `translateX(${pos})`;
      }
    }

    navOuter.addEventListener("mouseleave", () => {
      if (activeLink) {
        let pos = Array.from(nav.children).indexOf(activeLink) * 100 + "%";
        navPointer.style.transform = `translateX(${pos})`;
      }
    });

    fetch(hash.substring(1) + ".html")
      .then(response => response.text())
      .then(text => {
        const elm = document.getElementById("content");
        elm.innerHTML = text;
        Array.from(elm.querySelectorAll("script"))
          .forEach(oldScriptEl => {
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
document.addEventListener("DOMContentLoaded", switchPage);