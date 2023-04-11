// const draggableElements = document.getElementById('selectList');

// function handleClick(event){
//   let clickedElement = event.target;
//   console.log(clickedElement);
//   clickedElement.addEventListener('dragstart', onDragStart);
// }

// function onDragOver(event) {
//   event.preventDefault();
// }

// function onDragStart(event){
//   let clickedElement = event.target;
//   let selectElement = clickedElement.getAttribute('data-id');
//   event
//     .dataTransfer
//     .setData('text/plain', selectElement);
  
//   event
//     .currentTarget
//     .style
//     .backgroundColor = 'cyan';
// }

// function onDrop(event){
//   const id = event
//     .dataTransfer
//     .getData('text/plain');
  
//   const draggableElement = document.querySelector(`[data-id="${id}"]`);
//   console.log(id)
//   console.log(draggableElement);
//   const dropzone = event.target;
  
//   dropzone.appendChild(draggableElement);
  
// }

// window.addEventListener('DOMContentLoaded', () => {
//   const element = document.getElementsByClassName('drag-item');
//   selectElement.addEventListener('dragstart', onDragStart);
// });

// draggableElements.addEventListener('click', handleClick);

// draggableElements.addEventListener('click', handleClick);

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