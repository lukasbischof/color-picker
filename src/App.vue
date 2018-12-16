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
  import registeredSegmentedControl, { segmentedControlComponents } from "./registeredSegmentedControl";

  export default {
    name: 'App',
    components: {
      SegmentedControlHeader,
      SegmentedControlBody,
      ColorPickerFooter,
      ...segmentedControlComponents,
    },
    data() {
      return {
        segmentedControl: registeredSegmentedControl
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
