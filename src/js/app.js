const itemCollection = document.querySelectorAll('.item');

let currentItem;
let panels;

function panelDragEnd() {

    if(!currentItem) return;

    currentItem.classList.remove('dragged');
    if (panels) {
        panels.forEach(panel => {
            panel.removeEventListener('mouseup', panelDragEnd);
            panel.removeEventListener('mousemove', panelDrag);
        })

    }
}

function panelDrag(e) {
    e.preventDefault();
    if (!currentItem) return;

    currentItem.style.left = e.clientX + 'px';
    currentItem.style.top = e.clientY + 'px';
}

function itemDragEnd(e) {
    e.preventDefault();
    const thisItem = e.target;
    const panel = e.target.closest('.panel');

    panel.insertBefore(currentItem, thisItem);
}

itemCollection.forEach(item => {
    item.addEventListener('mousedown', (e) => {
        e.preventDefault();
        currentItem = e.target;

        currentItem.classList.add('dragged');

        panels = document.querySelectorAll('.panel');
        panels.forEach(panel => {
            panel.addEventListener('mouseup', panelDragEnd);
            panel.addEventListener('mousemove', panelDrag);
        })
        panelDrag(e);
    });
})


