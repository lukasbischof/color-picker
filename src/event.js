class ColorPickerEvent {
  constructor(type, detail) {
    this.type = type;
    this.detail = detail;
  }

  dispatch(vm) {
    vm.$emit(this.type, this);
  }

  toString() {
    return `[ColorPickerEvent ${this.type}]`;
  }
}

export default class ColorPickerEventTypes {
  static Error(message) {
    return new ColorPickerEvent('error', {
      message
    });
  }

  static Dismiss() {
    return new ColorPickerEvent('dismiss', {});
  }

  static Choose(color) {
    return new ColorPickerEvent('chose', { color });
  }

  static Dismissed() {
    return new ColorPickerEvent('dismissed', {});
  }

  static UpdatedColor(color) {
    return new ColorPickerEvent('update', { color });
  }
}
