<template>
  <div id="color-picker">
    <div class="wrapper"></div>
    <div class="window">
      <div class="header">
        <span>{{ i18n.title }}</span>
        <segmented-control-header :segmented-control="segmentedControl" />
      </div>
      <div class="body">
        <segmented-control-body :segmented-control="segmentedControl" />
      </div>
      <color-picker-footer />
    </div>
  </div>
</template>

<script>
  import ColorPickerFooter from '@/components/ColorPickerFooter';
  import {
    SegmentedControlHeader,
    SegmentedControlBody
  } from "@/components/segmentedControl/SegmentedControl";
  import Wheel from '@/components/panels/Wheel';
  import Spectrum from '@/components/panels/Spectrum';
  import Palette from "@/components/panels/Palette";
  import RGBA from "@/components/panels/RGBA";
  import { Segment, SegmentedControl } from "./components/segmentedControl/SegmentedControl";
  import I18n from '@/messages/en';

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
          new Segment('circle', i18n.segmentedControl.wheel, h => <Wheel onError={this.logError} />),
          new Segment('spectrum', i18n.segmentedControl.spectrum, h => <Spectrum onError={this.logError} />),
          new Segment('palette', i18n.segmentedControl.palette, h => <Palette onError={this.logError} />),
          new Segment('rgba', i18n.segmentedControl.rgba, h => <RGBA onError={this.logError} />)
        ]),
        i18n
      };
    },
    methods: {
      logError(error) {
        console.log(error);
      }
    },
  };
</script>

<style src="./app.scss" lang="scss" scoped></style>
<style src="./animations.scss" lang="scss"></style>
