/**
 * Copyright 2024 samsantivasci
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgNew extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.title = "Design Your Character";
    this.settings = {
      seed: "00000000",
      base: 0, // 0 for no hair, 1 for hair
      face: 0,
      faceitem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatColor: 0,
      size: 200,
      name: "",
      fire: false,
      walking: false,
    };
  }

  static get properties() {
    return {
      ...super.properties,
      settings: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-secondary);
        }
        .container {
          display: grid;
          grid-template-columns: 1fr 60px;
          gap: 16px;
          justify-content: left;
          padding: 20px;
          overflow: visible;
        }
        .character-preview {
          flex: none;
          min-width: 300px;
          text-align: center;
          position: center;
        }
        .character-preview rpg-character {
          height: var(--character-size, 200px);
          width: var(--character-size, 200px);
          transition: height 0.3s ease, width 0.3s ease;
        }
        .controls {
          display: grid;
          flex: 1;
          min-width: 300px;
          text-align: left;
        }
        wired-input,
        wired-checkbox,
        wired-toggle,
        wired-slider,
        wired-combo {
        
          margin-bottom: 15px;
          max-width: 300px;
        }
        wired-item{
          opacity: 1;
       
        }
        .custom {
      --wired-toggle-off-color: red;
      --wired-toggle-on-color: green;
    }
        label {
          display: block;
          font-size: 20px;
          font-style: italic;
          font-weight: bold;
          margin-bottom: 4px;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          cursor: pointer;
          background-color: #19d7d7;
          color: white;
          border: 1px solid #e2e7ec;
          border-radius: 4px;
          font-size: 16px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #004085;
        }
        .character-name {
          font-size: 32px;
          margin-bottom: 10px;
          color: var(--ddd-theme-defauly-coalyGray);
        }
        .notification {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: var(--ddd-theme-defauly-coalyGray);
          color: var(--ddd-theme-defauly-coalyGray);
          padding: 10px 15px;
          font-size: 14px;
          
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
        <div class="seed-display">Seed: ${this.settings.seed}</div>
          <div class="character-name">${this.settings.name}</div>
          <rpg-character
            base="${this.settings.base}"
            face="${this.settings.face}"
            faceitem="${this.settings.faceitem}"
            hair="${this.settings.hair}"
            pants="${this.settings.pants}"
            shirt="${this.settings.shirt}"
            skin="${this.settings.skin}"
            .fire="${this.settings.fire}"
            .walking="${this.settings.walking}"
            style="
              --character-size: ${this.settings.size}px;
              --hat-color: hsl(${this.settings.hatColor}, 100%, 50%);
            "
          ></rpg-character>
        </div>
        <div class="controls">
          <label for="characterNameInput">Character Name:</label>
          <wired-input
            id="characterNameInput"
            type="text"
            placeholder="Enter character name"
            @input="${(e) => this._updateSetting('name', e.target.value)}"
          ></wired-input>
          <div></div>
          <div></div>

          <wired-checkbox
            id="hairToggle"
            ?checked="${this.settings.base === 1}"
            @change="${(e) =>
              this._updateSetting('base', e.target.checked ? 1 : 0)}"
           >Has Hair</wired-checkbox>

          <label for="size">Character Size:</label>
          <wired-slider
            id="size"
            value="${this.settings.size}"
            min="100"
            max="350"
            @change="${(e) => this._updateSetting('size', parseInt(e.detail.value))}"
          ></wired-slider>

       <label for="face">Face:</label>
       <wired-combo
          id="face"
          value="${this.settings.face}"
          @selected="${(e) => this._updateSetting('face', parseInt(e.detail.selected))}">
       <wired-item value="0" text="0"></wired-item>
       <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
       <wired-item value="3">3</wired-item>
       <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       </wired-combo>
          <label for="faceitem">Face Item:</label>
          <wired-combo
            id="faceitem"
            value="${this.settings.faceitem}"
            @selected="${(e) => this._updateSetting('faceitem', parseInt(e.detail.selected))}">
       <wired-item value="0" text="0"></wired-item>
       <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
       <wired-item value="3">3</wired-item>
       <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       <wired-item value="6">6</wired-item>
       <wired-item value="7">7</wired-item>
       <wired-item value="8">8</wired-item>
       <wired-item value="9">9</wired-item>
       </wired-combo>

         <label for="hair">Hair Style:</label>
          <wired-combo
            id="hair"
            value="${this.settings.hair}"
            @selected="${(e) => this._updateSetting('hair', parseInt(e.detail.selected))}">
         <wired-item value="0">0</wired-item>
         <wired-item value="1">1</wired-item>
         <wired-item value="2">2</wired-item>
         <wired-item value="3">3</wired-item>
         <wired-item value="4">4</wired-item>
         <wired-item value="5">5</wired-item>
         </wired-combo>

        <label for="pants">Pants Style:</label>
        <wired-combo
         id="pants"
         value="${this.settings.pants}"
         @selected="${(e) => this._updateSetting('pants', parseInt(e.detail.selected))}">
       <wired-item value="0" text="0"></wired-item>
       <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
       <wired-item value="3">3</wired-item>
       <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       <wired-item value="6">6</wired-item>
       <wired-item value="7">7</wired-item>
       <wired-item value="8">8</wired-item>
       <wired-item value="9">9</wired-item>
       </wired-combo>

      <label for="shirt">Shirt Style:</label>
      <wired-combo
        id="shirt"
        value="${this.settings.shirt}"
        @selected="${(e) => this._updateSetting('shirt', parseInt(e.detail.selected))}">
       <wired-item value="0" text="0"></wired-item>
       <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
       <wired-item value="3">3</wired-item>
       <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       <wired-item value="6">6</wired-item>
       <wired-item value="7">7</wired-item>
       <wired-item value="8">8</wired-item>
       <wired-item value="9">9</wired-item>
        </wired-combo>

       <label for="skin">Skin Tone:</label>
       <wired-combo
            id="skin"
            value="${this.settings.skin}"
            @selected="${(e) => this._updateSetting('skin', parseInt(e.detail.selected))}">
       <wired-item value="0" text="0"></wired-item>
       <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
       <wired-item value="3">3</wired-item>
       <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       <wired-item value="6">6</wired-item>
       <wired-item value="7">7</wired-item>
       <wired-item value="8">8</wired-item>
       <wired-item value="9">9</wired-item>
        </wired-combo>

        <label for="hatColor">Hat Color:</label>
        <wired-combo
        id="hatColor"
        value="${this.settings.hatColor}"
        min="0";
        max="9";
        @selected="${(e) => this._updateSetting('hatColor', parseInt(e.detail.selected))}">
        <wired-item value="0" text="0"></wired-item>
        <wired-item value="1">1</wired-item>
       <wired-item value="2">2</wired-item>
        <wired-item value="3">3</wired-item>
        <wired-item value="4">4</wired-item>
       <wired-item value="5">5</wired-item>
       <wired-item value="6">6</wired-item>
       <wired-item value="7">7</wired-item>
       <wired-item value="8">8</wired-item>
       <wired-item value="9">9</wired-item>
        </wired-combo>
              <div></div>

          <wired-checkbox
            ?checked="${this.settings.fire}"
            @change="${(e) => this._updateSetting('fire', e.target.checked)}"
          >On Fire</wired-checkbox>

          <div></div>

          <wired-checkbox
            ?checked="${this.settings.walking}"
            @change="${(e) => this._updateSetting('walking', e.target.checked)}"
          >Walking</wired-checkbox>
              <div></div>

          <button @click="${this._generateShareLink}">
            Generate Share Link
          </button>
        </div>
      </div>
      <div id="notification" class="notification"></div>
      
    `;
  }
  _renderControls() {
    const controls = [
      { label: "Character Size", key: "size", min: 100, max: 350 },
      { label: "Face", key: "face", min: 0, max: 5 },
      { label: "Face Item", key: "faceitem", min: 0, max: 9 },
      { label: "Hair Style", key: "hair", min: 0, max: 9 },
      { label: "Pants Style", key: "pants", min: 0, max: 9 },
      { label: "Shirt Style", key: "shirt", min: 0, max: 9 },
      { label: "Skin Tone", key: "skin", min: 0, max: 9 },
      { label: "Hat Color", key: "hatColor", min: 0, max: 9 },
    ];

    return controls.map(
      (control) => html`
        <label for="${control.key}">${control.label}:</label>
        <wired-listbox
          id="${control.key}"
          selected="${this.settings[control.key]}"
          @selected="${(e) =>
            this._updateSetting(control.key, parseInt(e.detail.selected))}"
        >
          ${Array.from(
            { length: control.max - control.min + 1 },
            (_, i) => control.min + i
          ).map(
            (option) =>
              html`<wired-item value="${option}">${option}</wired-item>`
          )}
          </wired-listbox>
          `
    );
  }

  _generateSeed() {
    const { base, face, faceitem, hair, pants, shirt, skin } = this.settings;
    this.settings.seed = `${base}${face}${faceitem}${hair}${pants}${shirt}${skin}`;
  }

  _updateSetting(key, value) {
    this.settings = { ...this.settings, [key]: value };
    this._generateSeed();
  }

  _generateShareLink() {
    const baseUrl = window.location.href.split("?")[0];

    const params = new URLSearchParams(
      Object.entries(this.settings).reduce((acc, [key, value]) => {
        acc[key] = typeof value === "boolean" ? (value ? "1" : "0") : value;
        return acc;
      }, {})
    ).toString();

    const shareLink = `${baseUrl}?${params}`;

    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  _showNotification(message) {
    const notification = this.shadowRoot.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    params.forEach((value, key) => {
      if (key in this.settings) {
        this.settings = {
          ...this.settings,
          [key]: isNaN(value)
            ? value === "1"
              ? true
              : value === "0"
              ? false
              : value
            : parseInt(value),
        };
      }
    });
    this._generateSeed();
    this.requestUpdate();
  }
}

customElements.define(RpgNew.tag, RpgNew);




