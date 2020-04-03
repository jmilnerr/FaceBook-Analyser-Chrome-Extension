function popup() {

  //ryd <textarea> for eksisterende tekst
  document.getElementById("fbMessageText").value = ""

  //spørg content.js for data vi er interesserede i
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getData: "hello"}, function(response) {
      document.getElementById("fbMessageText").value = response.serveData;
    });
  });
}

//knyt en EventListener til "Tag tekst ..."-knappen
//og eksekver pop()-funktionen ovenfor
document.getElementById("fbGetMessage").addEventListener("click", popup);
