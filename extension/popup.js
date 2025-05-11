async function showAlert() {
  let [tab] = await chrome.tabs.query({ active: true });
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      alert('room created');
    }
  });
}

document.getElementById('create-room').addEventListener('click', showAlert);
