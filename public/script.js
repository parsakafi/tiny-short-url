document.addEventListener('readystatechange', event => {
    // When window loaded ( external resources are loaded too- `css`,`src`, etc...) 
    if (event.target.readyState === "complete") {
        const createShortlinkBtn = document.querySelector('#create-shortlink');
        const tooltip = document.querySelector('#tooltip');

        createShortlinkBtn.addEventListener('click', function () {
            tooltip.style.display = 'none';
        });
    }
});

// Copy value (in URL form) to clipboard
function copyToClipboard(value) {
    var temp = document.createElement("textarea");
    temp.value = "https://" + value;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    document.body.removeChild(temp);

    const copyShortlinkBtn = document.querySelector('#copy-shortlink');
    const tooltip = document.querySelector('#tooltip');

    tooltip.style.display = 'block';

    Popper.createPopper(copyShortlinkBtn, tooltip, {
        placement: 'top',
        offset: [20, 20]
    });
};
