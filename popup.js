document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('trigger').addEventListener('click', function () {
    chrome.tabs.executeScript(null, { file: 'main.js' }, function () {});
  });
});
