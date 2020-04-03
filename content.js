// data we are interested in
var text = document.querySelectorAll('[data-testid="post_message"]')[0].innerText

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

  if (request.getData == "hello") {
    //console.log(text)
    sendResponse({serveData: text});
  }
  return true;
});
