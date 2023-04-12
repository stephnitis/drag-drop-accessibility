'use strict';

const targetList = document.getElementById('targetList');
const droppables = targetList.querySelectorAll('.droppable');
const selectList = document.getElementById('selectList');
const draggables = selectList.querySelectorAll('.draggable');
const focusableSelectors = ['select', '[tabindex]'];
const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));
console.log(focusableElements);

let selectElement = null;
let currentDroppable = 0;
let currentDraggable = 0;

const selectedItem = document.querySelector('[aria-selected="true"]');
let nextIndex = 0;

const KEYS = {
  LEFT_ARROW: 'ArrowLeft',
  UP_ARROW: 'ArrowUp',
  RIGHT_ARROW: 'ArrowRight',
  DOWN_ARROW: 'ArrowDown',
  ENTER: 'Enter',
  SPACE: ' '
};

/**
 * This function initializes keydown event listeners for draggables and droppables and calls two other
 * functions for handling keydown events and key motions.
 */
const initKeydown = () => {

  draggables.forEach(draggable => {
    draggable.addEventListener('keydown', handleKeyDown);
    draggable.addEventListener('keydown', keyMotions);
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('keydown', handleTargetKeyDown);
    droppable.addEventListener('keydown', keyMotions);
  });

};

/**
 * The function handles keydown events and selects an item if the enter or space key is pressed.
 * @param event - The event parameter is an object that contains information about the event that
 * triggered the function. In this case, it is a keydown event. It includes properties such as the key
 * that was pressed, the target element that the event was triggered on, and methods to prevent the
 * default behavior of the event.
 */
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
}

/**
 * The function selects an item in a list and deselects all other items.
 * @param id - The `id` parameter is a string representing the unique identifier of the item that was
 * clicked on in a list. This function is designed to be used with a select list where only one item
 * can be selected at a time. When an item is clicked, this function deselects all other items in the
 */
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

/**
 * This function handles keydown events for a target element and selects it if the enter or space key
 * is pressed.
 * @param event - The event parameter is an object that contains information about the event that
 * occurred, such as the type of event, the target element, and any additional data related to the
 * event. In this case, it is used to handle a keydown event on a target element.
 */
function handleTargetKeyDown(event) {
  let element = event.target;
  if (event.key === KEYS.ENTER || event.key === KEYS.SPACE) {
    event.preventDefault();
    selectTarget(element);
    // draggables[0].focus();
  }
}

/**
 * The function selects a target element and deselects all other items in the list.
 * @param element - The parameter "element" is a reference to the HTML element that was clicked or
 * selected by the user. It is used to select and highlight the clicked item in a list of items.
 */
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
  getNextFocusIndex();
  setFocusOnNextItem();
}

function setFocusOnNextItem() {
  if (selectedItem) {
    selectedItem.setAttribute('aria-selected', 'false');
    selectedItem.setAttribute('tabindex', '-1');
  }
  // need to check if there is a next focusable item in the draggables list
  // set the attributes
  const nextItem = focusableElements[nextIndex];
  nextItem.focus();
  nextItem.setAttribute('aria-selected', 'true');
  nextItem.removeAttribute('tabindex');
}

// need to return the index of the next focusable item in the draggables list
function getNextFocusIndex(){
  // loop through all the focusable items in the draggables list and return the index of the first item that does not have the aria-selected attribute set to true
  for (let i = 0; i < focusableElements.length; i++) {
    if (focusableElements[i].getAttribute('aria-selected') !== 'true') {
      nextIndex = i;
      return i;
    }
  }
  console.log(nextIndex);
}

/**
 * The function handles key events and triggers different actions based on the pressed key.
 * @param event - The event parameter is an object that contains information about the event that
 * triggered the function. In this case, it is an event listener for keyboard input, so the
 * event object would contain information about which key was pressed.
 */
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
  // need if / else -> if current focus is draggable move through remainder
  // else current is droppable move through list
  currentDroppable = (currentDroppable === 0) ? droppables.length - 1 : currentDroppable - 1;
  droppables[currentDroppable].focus();
}

function moveRight() {
  // need if / else -> if current focus is draggable move through remainder
  // else current is droppable move through list
  currentDroppable = (currentDroppable === droppables.length - 1) ? 0 : currentDroppable + 1;
  droppables[currentDroppable].focus();
}

function moveUp() {
  // roving tab index between two sections -> regardless should move to next section
  // potentially based on current activeElement
  // need to move up to "next" draggable
  // let focusedElement = document.activeElement;
  // console.log(focusedElement);
  // if (focusedElement.className === "droppable") {
  //   selectList.focus();
  // }

  
}

function moveDown() {
  // roving tab index between two sections -> regardless should move to next section
  // potentially based on current activeElement
  // need to move up to "next" droppable -> where no element has been placed yet
}

initKeydown();