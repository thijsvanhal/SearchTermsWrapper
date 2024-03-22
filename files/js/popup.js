document.addEventListener("DOMContentLoaded", function () {
    let buttonExact = document.getElementById("convert-exact");
    buttonExact.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: convertExact,
        });
    });

    let buttonPhrase = document.getElementById("convert-phrase");
    buttonPhrase.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: convertPhrase,
        });
    });

    let buttonNegativePhrase = document.getElementById("convert-negative-phrase");
    buttonNegativePhrase.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        let replace = document.getElementById("replace").value;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: convertNegativePhrase,
            args: [replace],
        });
    });

    let buttonNegativeBroad = document.getElementById("convert-negative-broad");
    buttonNegativeBroad.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        let replace = document.getElementById("replace").value;
        
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: convertNegativeBroad,
            args: [replace],
        });
    });
});

function convertExact() {
    const inputFields = document.querySelectorAll('input[type=text].input');
    inputFields.forEach(input => {
        const inputValue = input.value;
        if (inputValue != '') {
            const replacedValue = inputValue.replace(new RegExp(`(${inputValue})`, 'g'), '[$1]');
            input.value = replacedValue;
        }
    });
}

function convertPhrase() {
    const inputFields = document.querySelectorAll('input[type=text].input');
    inputFields.forEach(input => {
        const inputValue = input.value;
        if (inputValue != '') {
            const replacedValue = inputValue.replace(new RegExp(`(${inputValue})`, 'g'), '"$1"');
            input.value = replacedValue;
        }
    });
}

function convertNegativePhrase(replace) {
    const inputFields = document.querySelectorAll('input[type=text].input');
    inputFields.forEach(input => {
        const inputValue = input.value;
        if (replace != '') {
            const removedValue = inputValue.replace(new RegExp(replace, 'g'), '');
            const replacedValue = removedValue.replace(/\[(.*?)\]/g, '"$1"');
            input.value = replacedValue;
        } else {
            const replacedValue = inputValue.replace(/\[(.*?)\]/g, '"$1"');
            input.value = replacedValue;
        }
    });
}

function convertNegativeBroad(replace) {
    const inputFields = document.querySelectorAll('input[type=text].input');
    inputFields.forEach(input => {
        const inputValue = input.value;
        if (replace != '') {
            const removedValue = inputValue.replace(new RegExp(replace, 'g'), '');
            const replacedValue = removedValue.replace(/\[(.*?)\]/g, '$1');
            input.value = replacedValue;
        } else {
            const replacedValue = inputValue.replace(/\[(.*?)\]/g, '$1');
            input.value = replacedValue;
        }
    });
}