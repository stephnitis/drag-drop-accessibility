const draggableElements = document.getElementById('draggable-content');

function handleClick(event){
  let selectElement = event.target;
  console.log(selectElement);
  selectElement.addEventListener('dragstart', onDragStart);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragStart(event){  
  event
    .dataTransfer
    .setData('text/plain', event.target.id);
  
  event
    .currentTarget
    .style
    .backgroundColor = 'cyan';
}

function onDrop(event){
  const id = event
    .dataTransfer
    .getData('text/plain');
  
  const draggableElement = document.getElementById(id);
  console.log(id);
  const dropzone = event.target;
  
  dropzone.appendChild(draggableElement);
  
}

// window.addEventListener('DOMContentLoaded', () => {
//   const element = document.getElementsByClassName('drag-item');
//   selectElement.addEventListener('dragstart', onDragStart);
// });

draggableElements.addEventListener('click', handleClick);

draggableElements.addEventListener('click', handleClick);