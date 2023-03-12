// Define values for  keycodes
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;

class KeyGroup extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback(){
    this.setAttribute('role', 'key-group');
    this.superKeys = Array.from(this.querySelectorAll('key-element'));
  
    // set initial state
  }
}