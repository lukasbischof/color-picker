class ColorPickerEvent {
  constructor(type, detail) {
    this.type = type;
    this.detail = detail;
  }

  dispatch() {
    if (this.onerror && this.onerror instanceof Function) {
      this.onerror(new CustomEvent(ColorPickerErrorEvent, {
        'detail': detail
      }));
    }
  }
}

module.exports = function AutoDispatchingColorPickerEvent(type, detail) {
  this.e = new ColorPickerEvent(type, detail);
  this.e.dispatch();
};
