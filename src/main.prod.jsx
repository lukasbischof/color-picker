import Vue from 'vue';
import App from './App';

Vue.config.productionTip = false;

window.ColorPicker = class ColorPicker {
  constructor(options) {
    const t = this;

    this.options = options;
    this.vm = new Vue({
      render: h => (
        <App onError={t.onError}/>
      )
    });
  }

  present() {
    const mount = document.createElement('div');
    document.body.appendChild(mount);
    this.vm.$mount(mount);
  }

  dismiss() {

  }

  onError(error) {
    throw new Error(error.detail.message);
  }
};
