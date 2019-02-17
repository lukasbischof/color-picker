import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

class ColorPicker {
  constructor(options) {
    this.options = options;
    this.callback = undefined;
    this._vm = new Vue({
      render: h => (
        <App ref={'app'}
             onError={this._onError}
             onDismiss={this._onDismiss.bind(this)}
             onChose={this._onChose.bind(this)}
             onDismissed={this._onDismissed.bind(this)} />
      )
    });
  }

  present(callback = undefined) {
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    this._vm.$mount(mount);
    this.callback = callback;
  }

  dismiss() {
    this._vm.$refs.app.dismiss();
  }

  _onError(error) {
    throw new Error(error.detail.message);
  }

  _onChose(event) {
    const color = event.detail.color;
    this._callCallback(color);
    this.dismiss();
  }

  _onDismiss() {
    this._callCallback();
    this.dismiss();
  }

  _onDismissed() {
    document.body.removeChild(this._vm.$el);
    this._vm.$destroy();
  }

  _callCallback(color) {
    if (this.callback) this.callback(color);
  }
}

if (typeof module !== 'undefined' && Object.getOwnPropertyDescriptor(module, 'exports').configurable) {
  module.exports = ColorPicker;
}

if (typeof window !== 'undefined') {
  window.ColorPicker = ColorPicker;
}
