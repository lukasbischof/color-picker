<template>
  <div id="color-picker">
    <div class="wrapper"></div>
    <div class="window">
      <div class="header">
        <span>Color Picker</span>
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
  import ColorPickerFooter from '@/components/Footer';
  import {
    SegmentedControlHeader,
    SegmentedControlBody
  } from "@/components/segmentedControl/SegmentedControl";
  import Wheel from '@/components/panels/Wheel';
  import Spectrum from '@/components/panels/Spectrum';
  import Palette from "@/components/panels/Palette";
  import { Segment, SegmentedControl } from "./components/segmentedControl/SegmentedControl";


  export default {
    name: 'App',
    components: {
      SegmentedControlHeader,
      SegmentedControlBody,
      ColorPickerFooter,
      Wheel,
      Spectrum,
      Palette
    },
    data() {
      return {
        segmentedControl: new SegmentedControl([
          new Segment('circle', 'Circle', h => <Wheel onError={this.logError} />),
          new Segment('spectrum', 'Spectrum', h => <Spectrum onError={this.logError} />),
          new Segment('palette', 'Palette', h => <Palette onError={this.logError} />),
          new Segment('rgba', 'RGBA', h => <Palette onError={this.logError} />)
        ])
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
