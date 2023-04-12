'use strict';

// let selectElement = null;
const targetList = document.getElementById('targetList');
const droppables = targetList.querySelectorAll('.droppable');
console.log(droppables);
const selectList = document.getElementById('selectList');
// const focusableSelectors = ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]'];
// const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));
let currentDroppable = 0;

const initKeydown = () => {
  const draggables = document.querySelectorAll('.draggable');
  // const droppables = document.querySelectorAll('.droppable');

  draggables.forEach(draggable => {
    draggable.addEventListener('keydown', handleKeyDown);
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('keydown', handleTargetKeyDown);

  });
};

// function handleKeyDown(event) {
//   let element = event.target;
//   if (event.key === "Enter" || event.key === " ") {
//     event.preventDefault();
//     selectItem(element);
//     targetList.focus();
//   } 
// }

// function selectItem(element) {
//   // Deselect all items in the list
//   const items = element.parentElement.querySelectorAll('[aria-selected="true"]');
//   for (const item of items) {
//     item.setAttribute("aria-selected", "false");

//   }

//   // Select the clicked item
//   element.setAttribute("aria-selected", "true");
//   element.style.backgroundColor = 'cyan';
//   let id = element.getAttribute('data-id');
//   selectElement = document.querySelector(`[data-id="${id}"]`);
// }

function handleTargetKeyDown(event) {
  let element = event.target;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    // selectTarget(element);
    selectList.focus();
  }
}

// function selectTarget(element) {
//   // Deselect all items in the list
//   const items = element.parentElement.querySelectorAll('[aria-selected="true"]');
//   for (const item of items) {
//     item.setAttribute("aria-selected", "false");

//   }

//   // Select the clicked item
//   element.setAttribute("aria-selected", "true");
//   element.style.backgroundColor = 'plum';
//   element.appendChild(selectElement);
// }

initKeydown();

const KEYS = {
  LEFT_ARROW: 'ArrowLeft',
  UP_ARROW: 'ArrowUp',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
};

function handleKeyDown(event) {
  const key = event.key;
  const target = event.target;
  // const droppable = target.closest('.droppable');
  // const droppable = document.querySelector('.droppable:first-child');
  // const sibling = droppable && droppable.nextElementSibling;
  
  
  console.log('CURRENT', droppables[currentDroppable]);

  if (key === "Enter" || key === " ") {
    event.preventDefault();
    target.style.backgroundColor = 'cyan';
    droppables[0].focus();
  }

  switch (key) {
    case KEYS.LEFT_ARROW:
      moveLeft();
      break;
    case KEYS.UP_ARROW:
      moveUp();
      break;
    case KEYS.RIGHT_ARROW:
      moveRight();
      break;
    case KEYS.DOWN_ARROW:
      moveDown();
      break;
    default:
      break;
  }
}

function moveLeft() {
  currentDroppable = (currentDroppable === 0) ? droppables.length - 1 : currentDroppable - 1;
  droppables[currentDroppable].focus();
}

function moveRight() {
  currentDroppable = (droppables.length - 1) ? currentDroppable = 0 : currentDroppable + 1;
  droppables[currentDroppable].focus();
}

// div.addEventListener('keydown', (event) => {
//   if (event.keyCode === 37 || event.keyCode === 38) { // Left or Up arrow key
//     currentDroppable = (currentDroppable === 0) ? droppables.length - 1 : currentDroppable - 1;
//     droppables[currentDroppable].focus();
//     event.preventDefault();
//   } else if (event.keyCode === 39 || event.keyCode === 40) { // Right or Down arrow key
//     currentDroppable = (currentDroppable === droppables.length - 1) ? 0 : currentDroppable + 1;
//     droppables[currentDroppable].focus();
//     event.preventDefault();
//   }
// });

// function moveUp(sibling, target) {
//   if (sibling && sibling.querySelector('[aria-selected="true"]')) {
//     const newTarget = sibling.querySelector('[aria-selected="true"]');
//     newTarget.setAttribute('aria-selected', 'false');
//     target.setAttribute('aria-selected', 'true');
//     newTarget.focus();
//   }
// }


// function moveDown(sibling, target) {
//   if (sibling && target.querySelector('[aria-selected="true"]')) {
//     const newTarget = sibling.firstElementChild;
//     newTarget.setAttribute('aria-selected', 'true');
//     target.querySelector('[aria-selected="true"]').setAttribute('aria-selected', 'false');
//     newTarget.focus();
//   }
// }

document.addEventListener('keydown', handleKeyDown);

