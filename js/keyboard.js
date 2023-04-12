'use strict';

let selectElement = null;

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

function handleKeyDown(event) {
  let element = event.target;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectItem(element);
    targetList.focus();
  } 
}

function selectItem(element) {
  // Deselect all items in the list
  const items = element.parentElement.querySelectorAll('[aria-selected="true"]');
  for (const item of items) {
    item.setAttribute("aria-selected", "false");
   
  }

  // Select the clicked item
  element.setAttribute("aria-selected", "true");
  element.style.backgroundColor = 'cyan';
  let id = element.getAttribute('data-id');
  selectElement = document.querySelector(`[data-id="${id}"]`);
}

function handleTargetKeyDown(event){
  let element = event.target;
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    selectTarget(element);
    selectList.focus();
  } 
}

function selectTarget(element) {
  // Deselect all items in the list
  const items = element.parentElement.querySelectorAll('[aria-selected="true"]');
  for (const item of items) {
    item.setAttribute("aria-selected", "false");
   
  }

  // Select the clicked item
  element.setAttribute("aria-selected", "true");
  element.style.backgroundColor = 'plum';
  element.appendChild(selectElement);
}

initKeydown();