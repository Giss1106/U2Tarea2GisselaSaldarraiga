import { LitElement, html, css } from 'lit';

export class EspeFeaturedCard extends LitElement {
  static properties = {
    title: { type: String },
    description: { type: String },
    image: { type: String },
    highlighted: { type: Boolean, reflect: true }
  };

  constructor() {
    super();
    this.title = 'Título destacado';
    this.description = 'Descripción breve del contenido o servicio destacado.';
    this.highlighted = false;
  }

  static styles = css`
  :host {
    display: block;
    font-family: 'Arial', sans-serif;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 164, 0, 0.25);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    background-color: #ffffff;
    cursor: pointer;
    max-width: 400px;
    margin: 0 auto;
  }

  :host(:hover) {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 164, 0, 0.35);
  }

  :host([highlighted]) {
    animation: fadeIn 1s ease-in-out;
    border: 2px solid #990000;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .card {
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
  }

  .title {
    color: #004D00;
    font-weight: 700;
    font-size: 1.6rem;
    margin: 0;
    text-align: center;
  }

  .description {
    font-size: 1.1rem;
    color: #333;
    text-align: justify;
    line-height: 1.6;
    margin: 0;
  }
`;

  render() {
    return html`
    <div class="card" role="button" tabindex="0" aria-label="Tarjeta destacada: ${this.title}" @click=${this._handleClick}>
      ${this.image
        ? html`<img class="card-image" src="${this.image}" alt="Imagen de ${this.title}" @click=${this._onImageClick} />`
        : ''}
      <div class="title">${this.title}</div>
      <div class="description">${this.description}</div>
    </div>
  `;
  }

  _handleClick() {
    this.highlighted = !this.highlighted; // Primero cambia el estado

    this.dispatchEvent(new CustomEvent('card-click', {
      detail: {
        title: this.title,
        highlighted: this.highlighted // Ahora sí tiene el nuevo valor
      },
      bubbles: true,
      composed: true
    }));
  }
}
customElements.define('espe-featured-card', EspeFeaturedCard);