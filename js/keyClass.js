class KeyElement extends HTMLElement {
  constructor() {
    super();
  }
  // every custom element has a set of lifecycle callbacks
  // setting initial state of element here
  connectedCallback() {
    this.setAttribute('role', 'select');
    this.setAttribute('tabindex', -1);
    this.setAttribute('aria-selected', false);
  }
}

window.customElements.define('key-element', KeyElement);