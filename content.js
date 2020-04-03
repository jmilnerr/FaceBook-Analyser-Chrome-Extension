//tag data, vi er interesserede i
var text = document.querySelectorAll('[data-testid="post_message"]')[0].innerText

//lyt efter indkommende "messages"
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  //vær opmærksom på getData, og om den er lig med den sendt fra popup.js
  if (request.getData == "hello") {
    
    //send resultatet tilbage til popup.js i objektet med "serveData"
    sendResponse({serveData: text});
  }
  return true;
});
