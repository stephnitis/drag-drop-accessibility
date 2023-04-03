const items = document.querySelectorAll('.item');
const targets = document.querySelectorAll('.target');

let draggedItem = null;

// Add event listeners to items
items.forEach(item => {
  item.addEventListener('dragstart', handleDragStart);
  item.addEventListener('dragend', handleDragEnd);
});

// Add event listeners to targets
targets.forEach(target => {
  target.addEventListener('dragenter', handleDragEnter);
  target.addEventListener('dragover', handleDragOver);
  target.addEventListener('dragleave', handleDragLeave);
  target.addEventListener('drop', handleDrop);
});

// Handle drag start event
function handleDragStart(event) {
  draggedItem = event.target;
  event.dataTransfer.setData('text', event.target.textContent);
  event.target.setAttribute('aria-grabbed', 'true');
}

// Handle drag end event
function handleDragEnd(event) {
  event.target.setAttribute('aria-grabbed', 'false');
  draggedItem = null;
}

// Handle drag enter event
function handleDragEnter(event) {
  event.preventDefault();
  event.target.classList.add('highlight');
}

// Handle drag over event
function handleDragOver(event) {
  event.preventDefault();
}

// Handle drag leave event
function handleDragLeave(event) {
  event.target.classList.remove('highlight');
}

// Handle drop event
function handleDrop(event) {
  event.preventDefault();
  event.target.classList.remove('highlight');
  const dropText = event.dataTransfer.getData('text');
  if (dropText === event.target.getAttribute('aria-label').substring(5)) {
    event.target.classList.add('matched');
    draggedItem.parentNode.removeChild(draggedItem);
  }
}
