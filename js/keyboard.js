'use strict';

// let selectElement = null;
const targetList = document.getElementById('targetList');
const selectList = document.getElementById('selectList');
const focusableSelectors = ['a[href]', 'button', 'input', 'select', 'textarea', '[tabindex]'];
const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));


const initKeydown = () => {
  const draggables = document.querySelectorAll('.draggable');
  const droppables = document.querySelectorAll('.droppable');

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
  const droppable = document.querySelector('.droppable:first-child');
  const sibling = droppable && droppable.nextElementSibling;
  console.log('CLOSEST', droppable);
  console.log('NEXT SIBLING', sibling);

  if (key === "Enter" || key === " ") {
    event.preventDefault();
    target.style.backgroundColor = 'cyan';
    droppable.focus();
  }

  switch (key) {
    case KEYS.LEFT_ARROW:
      moveLeft(sibling, target);
      break;
    case KEYS.UP_ARROW:
      moveUp(sibling, target);
      break;
    case KEYS.RIGHT_ARROW:
      moveRight(sibling, target);
      break;
    case KEYS.DOWN_ARROW:
      moveDown(sibling, target);
      break;
    default:
      break;
  }
}

function moveLeft(sibling, target) {
  if (sibling && sibling.querySelector('[aria-selected="true"]')) {
    const newTarget = sibling.querySelector('[aria-selected="true"]');
    newTarget.setAttribute('aria-selected', 'false');
    newTarget.setAttribute('tabindex', '-1');
    target.setAttribute('aria-selected', 'true');
    target.setAttribute('tabindex', '0');
    newTarget.focus();
  }
}

function moveUp(sibling, target) {
  if (sibling && sibling.querySelector('[aria-selected="true"]')) {
    const newTarget = sibling.querySelector('[aria-selected="true"]');
    newTarget.setAttribute('aria-selected', 'false');
    target.setAttribute('aria-selected', 'true');
    newTarget.focus();
  }
}

function moveRight(sibling, target) {
  if (sibling && target.querySelector('[aria-selected="true"]')) {
    const newTarget = sibling.lastElementChild;
    newTarget.setAttribute('aria-selected', 'true');
    target.querySelector('[aria-selected="true"]').setAttribute('aria-selected', 'false');
    newTarget.focus();
  }
}

function moveDown(sibling, target) {
  if (sibling && target.querySelector('[aria-selected="true"]')) {
    const newTarget = sibling.firstElementChild;
    newTarget.setAttribute('aria-selected', 'true');
    target.querySelector('[aria-selected="true"]').setAttribute('aria-selected', 'false');
    newTarget.focus();
  }
}

document.addEventListener('keydown', handleKeyDown);
