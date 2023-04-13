'use strict';

const targetList = document.getElementById('targetList');
const droppables = targetList.querySelectorAll('.droppable');
const selectList = document.getElementById('selectList');
const draggables = selectList.querySelectorAll('.draggable');

const focusableSelectors = ['select', '[tabindex]'];
const focusableElements = document.querySelectorAll(focusableSelectors.join(', '));

// const updateFocusableSelectors = () => {
//   focusableSelectors = [
//     ...selectList.querySelectorAll('[tabindex="0"]'),
//     ...targetList.querySelectorAll('[tabindex="0"]'),
//   ];
// };

// const moveItem = (fromList, toList, item) => {
//   ...updateFocusableSelectors();
// };

// const removeItem = (list, item) => {
//   ...updateFocusableSelectors();
// };


let selectElement = null;
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
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('keydown', handleKeyDown);
  });

};

/**
 * The function handles key events and performs different actions based on the key pressed.
 * @param event - The event parameter is an object that contains information about the event that
 * triggered the function. It includes properties such as the type of event, the target element, and
 * the key that was pressed (if applicable).
 */
function handleKeyDown(event) {
  const key = event.key;
  const target = event.target;
  const id = target.getAttribute('data-id');
  let activeElement = document.activeElement;

  switch (key) {
    case KEYS.ENTER:
      event.preventDefault();
      if (activeElement.classList.contains('draggable')){
        selectItem(id);
      } else if (activeElement.classList.contains('droppable')){
        selectTarget(target);
      }
      break;
    case KEYS.SPACE:
      event.preventDefault();
      if (activeElement.classList.contains('draggable')){
        selectItem(id);
      } else if (activeElement.classList.contains('droppable')){
        selectTarget(target);
      }
      break;
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


/**
 * The function selects an item in a list and deselects all other items.
 * @param id - The `id` parameter is a string representing the unique identifier of the item that was
 * clicked on in a list. This function is designed to be used with a select list where only one item
 * can be selected at a time. When an item is clicked, this function deselects all other items in the
 */
function selectItem(id) {
  droppables[0].focus();
  // Deselect all items in the list
  const items = selectList.querySelectorAll('[aria-selected="true"]');
  for (const item of items) {
    item.setAttribute('aria-selected', 'false');
  }
  // Select the clicked item
  selectElement = document.querySelector(`[data-id="${id}"]`);
  selectElement.setAttribute('aria-selected', 'true');
  // selectElement.style.backgroundColor = 'cyan';
  selectElement.style.border = '5px solid cyan';

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
  element.setAttribute('aria-selected', 'true');
  element.style.backgroundColor = 'plum';
  // potentially appendChild is not the best here
  // potentially selecting the target it part of the problem?
  element.appendChild(selectElement);
  getNextFocusIndex();
  setFocusOnNextItem();
  console.log('NEXT', nextIndex);

}

/**
 * The function sets focus on the next focusable item in a list and updates its attributes.
 */
function setFocusOnNextItem() {
  if (selectedItem) {
    selectedItem.setAttribute('aria-selected', 'false');
    selectedItem.setAttribute('tabindex', '-1');
  }
  // need to check if there is a next focusable item in the draggables list
  // set the attributes
  const nextItem = focusableElements[nextIndex];
  nextItem.focus();

}

// need to return the index of the next focusable item in the draggables list
function getNextFocusIndex() {
  // error here after second element is selected - potentially need to change the index of the item pop and push? what is most efficient here? but if element is not in the proper position it cannot be removed with pop or push...

  // loop through all the focusable items in the draggables list and return the index of the first item that does not have the aria-selected attribute set to true
  for (let i = 0; i < focusableElements.length; i++) {
    if (focusableElements[i].getAttribute('aria-selected') !== 'true') {
      nextIndex = i;
      return i;
    }
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
  // TODO: moving up and down causes bugs after selected target

  // find the current element with focus in the document
  let currentElement = document.activeElement;
  console.log(currentElement);
  // If the current element is in the selectList
  if (selectList.contains(currentElement)) {
    droppables[0].focus();
  }
  // If the current element is in the targetList
  else if (targetList.contains(currentElement)) {
    getNextFocusIndex();
    setFocusOnNextItem();
  }

}

initKeydown();

