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
  console.log('NEXT', nextIndex);
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
}

// need to return the index of the next focusable item in the draggables list
function getNextFocusIndex() {
  // loop through all the focusable items in the draggables list and return the index of the first item that does not have the aria-selected attribute set to true
  for (let i = 0; i < focusableElements.length; i++) {
    if (focusableElements[i].getAttribute('aria-selected') !== 'true') {
      nextIndex = i;
      return i;
    }
  }
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
      moveUpOrDown(key);
      break;
    case KEYS.RIGHT_ARROW:
      moveRight();
      break;
    case KEYS.DOWN_ARROW:
      moveUpOrDown(key);
      break;
    default:
      break;
  }
}

function moveLeft() {
  let currentElement = document.activeElement;

  // adjust for roving tabindex side to side - easier than previous
  if (selectList.contains(currentElement)) {
    // If the left arrow was pressed and there is a previous element
    if (currentElement.previousElementSibling) {
      currentElement.previousElementSibling.focus();
    }
    // If the left arrow was pressed and there is not a previous sibling element
    else if (!currentElement.previousElementSibling) {
      draggables[draggables.length - 1].focus();
    }
  } else if (targetList.contains(currentElement)) {
    // If the left arrow was pressed and there is a previous element
    if (currentElement.previousElementSibling) {
      currentElement.previousElementSibling.focus();
    }
    // If the left arrow was pressed and there is not a previous sibling element
    else if (!currentElement.previousElementSibling) {
      droppables[droppables.length - 1].focus();
    }
  }
}

function moveRight() {
  let currentElement = document.activeElement;

  // adjust for roving tabindex side to side - easier than previous
  if (selectList.contains(currentElement)) {
    // If the left arrow was pressed and there is a previous element
    if (currentElement.nextElementSibling) {
      currentElement.nextElementSibling.focus();
    }
    // If the left arrow was pressed and there is not a previous sibling element
    else if (!currentElement.nextElementSibling) {
      draggables[0].focus();
    }
  } else if (targetList.contains(currentElement)) {
    // If the left arrow was pressed and there is a previous element
    if (currentElement.nextElementSibling) {
      currentElement.nextElementSibling.focus();
    }
    // If the left arrow was pressed and there is not a previous sibling element
    else if (!currentElement.nextElementSibling) {
      droppables[0].focus();
    }
  }
}

function moveUpOrDown() {
  // find the current element with focus in the document
  let currentElement = document.activeElement;

  // If the current element is in the selectList
  if (selectList.contains(currentElement)) {
    droppables[0].focus();
  }
  // If the current element is in the targetList
  else if (targetList.contains(currentElement)) {
    // some bugs utilizing nextIndex value this way - to be resolved
    draggables[nextIndex].focus();
  }

}

initKeydown();

