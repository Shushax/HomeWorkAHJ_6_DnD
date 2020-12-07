const itemCollection = document.querySelectorAll('.item');
const all = document.querySelector('.all');
const addNewCart = document.querySelectorAll('.add');
const allClose = document.querySelectorAll('span');

let draggedEl = null;
let ghostEl = null;
let leftDiff = null;
let topDiff = null;

function overSpan() {
  this.style.opacity = '100%';
}

function outSpan() {
  this.style.opacity = '0%';
}

function stopMove() {
  document.body.removeChild(ghostEl);
  document.body.style.cursor = 'auto';
  ghostEl = null;
  draggedEl = null;
}

function overItem(e) {
  const close = e.target.querySelector('span');
  if (close) {
    close.style.opacity = '100%';
  }
}

function outItem(e) {
  const close = e.target.querySelector('span');
  if (close) {
    close.style.opacity = '0%';
  }
}

function deleteItem() {
  const item = this.closest('li');
  item.remove();
}

for (const span of allClose) {
  span.addEventListener('click', deleteItem);
  span.addEventListener('mouseover', overSpan);
  span.addEventListener('mouseout', outSpan);
}

for (const item of itemCollection) {
  item.addEventListener('mouseover', overItem);
  item.addEventListener('mouseout', outItem);
}

for (const add of addNewCart) {
  add.onclick = function () {
    const item = add.previousElementSibling;
    const newItem = item.cloneNode();
    newItem.innerHTML = 'Запись<span>❌</span>';
    item.insertAdjacentElement('afterend', newItem);
    newItem.addEventListener('mouseover', overItem);
    newItem.addEventListener('mouseout', outItem);
    const newSpan = newItem.querySelector('span');
    newSpan.addEventListener('mouseover', overSpan);
    newSpan.addEventListener('mouseout', outSpan);
    newSpan.addEventListener('click', deleteItem);
  };
}

all.addEventListener('mousedown', (e) => {
  if (e.target.classList.contains('item')) {
    draggedEl = e.target;
    ghostEl = e.target.cloneNode(true);
    ghostEl.classList.add('dragged');
    document.body.appendChild(ghostEl);
    document.body.style.cursor = 'grabbing';
    ghostEl.style.width = `${draggedEl.offsetWidth}px`;
    const { top, left } = draggedEl.getBoundingClientRect();
    topDiff = e.pageY - top;
    leftDiff = e.pageX - left;
    ghostEl.style.left = `${left}px`;
    ghostEl.style.top = `${top}px`;
  }
});

all.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if (draggedEl) {
    ghostEl.style.left = `${e.pageX - leftDiff}px`;
    ghostEl.style.top = `${e.pageY - topDiff}px`;
  }
});

all.addEventListener('mouseup', (e) => {
  e.preventDefault();
  if (draggedEl) {
    const target = document.elementFromPoint(e.clientX, e.clientY);
    const { top } = target.getBoundingClientRect();
    const parent = target.closest('.panel');
    if (parent && parent !== target) {
      if (e.pageY > window.scrollY + top + target.offsetHeight / 2) {
        parent.insertBefore(draggedEl, target.nextElementSibling);
      } else {
        parent.insertBefore(draggedEl, target);
      }
      stopMove();
    } else if (parent) {
      parent.appendChild(draggedEl);
      this.stopMove();
    } else {
      this.stopMove();
    }
  }
});

// let currentItem;
// let panels;

// function panelDragEnd() {

//     if(!currentItem) return;

//     currentItem.classList.remove('dragged');
//     if (panels) {
//         panels.forEach(panel => {
//             panel.removeEventListener('mouseup', panelDragEnd);
//             panel.removeEventListener('mousemove', panelDrag);
//         })

//     }
// }

// function panelDrag(e) {
//     e.preventDefault();
//     if (!currentItem) return;

//     currentItem.style.left = e.clientX + 'px';
//     currentItem.style.top = e.clientY + 'px';
// }

// function itemDragEnd(e) {
//     e.preventDefault();
//     const thisItem = e.target;
//     const panel = e.target.closest('.panel');

//     panel.insertBefore(currentItem, thisItem);
// }

// itemCollection.forEach(item => {
//     item.addEventListener('mousedown', (e) => {
//         e.preventDefault();
//         currentItem = e.target;

//         currentItem.classList.add('dragged');

//         panels = document.querySelectorAll('.panel');
//         panels.forEach(panel => {
//             panel.addEventListener('mouseup', panelDragEnd);
//             panel.addEventListener('mousemove', panelDrag);
//         })
//         panelDrag(e);
//     });
// })
