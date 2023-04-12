'use strict';

// TODO: need to be able to re-drag draggable elements to new positions

const init = () => {
  const draggables = document.querySelectorAll('.draggable');
  const droppables = document.querySelectorAll('.droppable');

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', handleDragStart);
    draggable.addEventListener('dragend', handleDragEnd);
  });

  droppables.forEach(droppable => {
    droppable.addEventListener('dragenter', handleDragEnter);
    droppable.addEventListener('dragover', handleDragOver);
    droppable.addEventListener('dragleave', handleDragLeave);
    droppable.addEventListener('drop', handleDrop);
  });
};

const handleDragStart = event => {
  event.currentTarget.classList.add('dragging');
};

const handleDragEnd = event => {
  event.currentTarget.classList.remove('dragging');
};

const handleDragEnter = event => {
  event.preventDefault();
  event.currentTarget.classList.add('droppable-hover');
};

const handleDragOver = event => {
  event.preventDefault();
};

const handleDragLeave = event => {
  event.currentTarget.classList.remove('droppable-hover');
};

/**
 * This function handles the drop event of a draggable element onto a droppable element and reorders
 * the elements accordingly.
 */
const handleDrop = event => {
  event.preventDefault();

  const draggable = document.querySelector('.dragging');
  const droppable = event.target.closest('.droppable');
  console.log(draggable);
  console.log(droppable);
  if (droppable) {
    const afterElement = getDragAfterElement(droppable, event.clientY);
    droppable.insertBefore(draggable, afterElement);
  }

  draggable.classList.remove('dragging');
  droppable.classList.remove('droppable-hover');
};

/**
 * The function returns the closest draggable element to a given container and y-coordinate.
 * @param container - The container parameter is a DOM element that contains the draggable elements.
 * The function uses this container to query for all the draggable elements that are not currently
 * being dragged.
 * @param y - The `y` parameter represents the vertical position of the cursor or pointer on the
 * screen, relative to the top of the container element. It is used to calculate the offset of each
 * draggable element from the cursor position, in order to determine which element is closest to the
 * cursor and should be the target for
 * @returns The function `getDragAfterElement` returns the closest draggable element to the current
 * dragging element based on the vertical position of the mouse pointer. It takes two arguments:
 * `container` which is the container element that holds all the draggable elements, and `y` which is
 * the vertical position of the mouse pointer. The function returns the element that is closest to the
 * mouse pointer vertically, but not necessarily horizontally
 */
const getDragAfterElement = (container, y) => {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child };
    } else {
      return closest;
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element;
};

init();