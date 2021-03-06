<template>
  <div id="color-picker">
    <div ref="wrapper" class="wrapper" @click="dismissButtonClicked"></div>
    <div ref="window" class="window">
      <div class="header">
        <span>{{ i18n.title }}</span>
        <segmented-control-header :segmented-control="segmentedControl" />
      </div>
      <div class="body">
        <segmented-control-body :segmented-control="segmentedControl" />
      </div>
      <color-picker-footer @cancel="dismissButtonClicked" @choose="chooseButtonClicked" />
    </div>
  </div>
</template>

<script>
  import ColorPickerFooter from '@/components/ColorPickerFooter';
  import {
    SegmentedControlHeader,
    SegmentedControlBody
  } from '@/components/segmentedControl/SegmentedControl';
  import Wheel from '@/components/panels/Wheel';
  import Spectrum from '@/components/panels/Spectrum';
  import Palette from '@/components/panels/Palette';
  import RGBA from '@/components/panels/RGBA';
  import { Segment, SegmentedControl } from './components/segmentedControl/SegmentedControl';
  import I18n from '@/messages/en';
  import ColorPickerEventTypes from './event';
  import Color from './models/Color';

  // noinspection JSUnusedGlobalSymbols
  export default {
    name: 'App',
    components: {
      SegmentedControlHeader,
      SegmentedControlBody,
      ColorPickerFooter,
      Wheel,
      Spectrum,
      Palette,
      RGBA
    },
    data() {
      const i18n = I18n.components.app;
      return {
        segmentedControl: new SegmentedControl([
          new Segment('circle', i18n.segmentedControl.wheel, h => <Wheel onError={this.logError} onInput={this.colorUpdated} />),
          new Segment('spectrum', i18n.segmentedControl.spectrum, h => <Spectrum onError={this.logError} onInput={this.colorUpdated} />),
          new Segment('palette', i18n.segmentedControl.palette, h => <Palette onError={this.logError} onInput={this.colorUpdated} />),
          new Segment('rgba', i18n.segmentedControl.rgba, h => <RGBA onError={this.logError} onInput={this.colorUpdated} />)
        ]),
        i18n,
        currentColor: new Color(0, 255, 0)
      };
    },
    methods: {
      logError(error) {
        error.dispatch(this);
      },
      dismiss() {
        this.$refs.window.classList.add('dismiss');
        this.$refs.wrapper.classList.add('dismiss');
        setTimeout(() => ColorPickerEventTypes.Dismissed().dispatch(this), 250);
      },
      dismissButtonClicked() {
        ColorPickerEventTypes.Dismiss().dispatch(this);
        this.dismiss();
      },
      chooseButtonClicked() {
        ColorPickerEventTypes.Choose(this.currentColor).dispatch(this);
      },
      colorUpdated(color) {
        this.currentColor = color;
        ColorPickerEventTypes.UpdatedColor(color).dispatch(this);
      }
    },
  };
</script>

<style src="./app.scss" lang="scss" scoped></style>
<style src="./animations.scss" lang="scss"></style>
