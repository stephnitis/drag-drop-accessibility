const draggableElements = document.getElementById('selectList');

function handleClick(event){
  let clickedElement = event.target;
  console.log(clickedElement);
  clickedElement.addEventListener('dragstart', onDragStart);
}

function onDragOver(event) {
  event.preventDefault();
}

function onDragStart(event){
  let clickedElement = event.target;
  let selectElement = clickedElement.getAttribute('data-id');
  event
    .dataTransfer
    .setData('text/plain', selectElement);
  
  event
    .currentTarget
    .style
    .backgroundColor = 'cyan';
}

function onDrop(event){
  const id = event
    .dataTransfer
    .getData('text/plain');
  
  const draggableElement = document.querySelector(`[data-id="${id}"]`);
  console.log(id)
  console.log(draggableElement);
  const dropzone = event.target;
  
  dropzone.appendChild(draggableElement);
  
}

// window.addEventListener('DOMContentLoaded', () => {
//   const element = document.getElementsByClassName('drag-item');
//   selectElement.addEventListener('dragstart', onDragStart);
// });

draggableElements.addEventListener('click', handleClick);

draggableElements.addEventListener('click', handleClick);