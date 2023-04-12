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