var element = document.createElement('a');
element.setAttribute('href', window.location.origin + '/');
element.style.display = "none";
document.body.appendChild(element)
element.click()
document.body.removeChild(element)