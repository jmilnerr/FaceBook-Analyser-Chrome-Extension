function popup() {

  //clear existing text
  document.getElementById("fbMessageText").value = ""

  //ask content.js for data we are interested in
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {getData: "hello"}, function(response) {
      document.getElementById("fbMessageText").value = response.serveData;
    });
  });
}

document.getElementById("fbGetMessage").addEventListener("click", popup);
