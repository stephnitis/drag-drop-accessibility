'use strict';

const targetList = document.getElementById('targetList');
const droppables = targetList.querySelectorAll('.droppable');
const selectList = document.getElementById('selectList');

let selectElement = null;
let currentDroppable = 0;

const KEYS = {
  LEFT_ARROW: 'ArrowLeft',
  UP_ARROW: 'ArrowUp',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
  ENTER: 'Enter',
  SPACE: ' '
};

const initKeydown = () => {
  const draggables = document.querySelectorAll('.draggable');

  draggables.forEach(draggable => {
    draggable.addEventListener('keydown', handleKeyDown);
    draggable.addEventListener('keydown', keyMotions);
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('keydown', handleTargetKeyDown);
    droppable.addEventListener('keydown', keyMotions);
  });
};

function handleKeyDown(event) {
  const key = event.key;
  const target = event.target;
  console.log(target);

  if (key === KEYS.ENTER || key === KEYS.SPACE) {
    event.preventDefault();
    droppables[0].focus();
    let id = target.getAttribute('data-id');
    selectItem(id);
  }

  // if (key === KEYS.ENTER || key === KEYS.SPACE) {
  //   event.preventDefault();
  //   droppables[0].focus();
  //   // Deselect all items in the list
  //   const items = selectList.querySelectorAll('[aria-selected="true"]');
  //   for (const item of items) {
  //     item.setAttribute('aria-selected', 'false');
  //   }

  //   // Select the clicked item
  //   target.setAttribute('aria-selected', 'true');
  //   target.style.backgroundColor = 'cyan';
  //   let id = target.getAttribute('data-id');
  //   selectElement = document.querySelector(`[data-id="${id}"]`);
  // }
}

function selectItem(id) {
  
  // Deselect all items in the list
  const items = selectList.querySelectorAll('[aria-selected="true"]');
  for (const item of items) {
    item.setAttribute('aria-selected', 'false');
  }
  // Select the clicked item
  selectElement = document.querySelector(`[data-id="${id}"]`);
  selectElement.setAttribute('aria-selected', 'true');
  selectElement.style.backgroundColor = 'cyan';
  console.log(selectElement);
}

function handleTargetKeyDown(event) {
  let element = event.target;
  if (event.key === 'Enter' || event.key === " ") {
    event.preventDefault();
    selectTarget(element);
    selectList.focus();
  }
}

function selectTarget(element) {
  // Deselect all items in the list
  const items = targetList.querySelectorAll('[aria-selected="true"]');
  for (const item of items) {
    item.setAttribute('aria-selected', 'false');
  }

  // Select the clicked item
  element.setAttribute("aria-selected", "true");
  element.style.backgroundColor = 'plum';
  element.appendChild(selectElement);
}

initKeydown();

function keyMotions(event) {
  const key = event.key;
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
  droppables[currentDroppable].style.backgroundColor = 'yellow';
}

function moveRight() {
  currentDroppable = (currentDroppable === droppables.length - 1) ? 0 : currentDroppable + 1;
  droppables[currentDroppable].focus();
}

