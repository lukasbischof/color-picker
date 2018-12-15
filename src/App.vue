<template>
  <div id="color-picker">
    <div class="wrapper"></div>
    <div class="window">
      <div class="header">
        <span>Color Picker</span>
        <segmented-control />
      </div>
      <div class="body">
        <div class="container">
          <wheel @error="logError" />
        </div>
      </div>
      <color-picker-footer />
    </div>
  </div>
</template>

<script>
  import SegmentedControl from '@/components/SegmentedControl';
  import ColorPickerFooter from '@/components/Footer';
  import Wheel from '@/components/panels/Wheel';

  export default {
    name: 'App',
    components: {
      SegmentedControl,
      Wheel,
      ColorPickerFooter
    },
    methods: {
      logError(error) {
        console.log(error);
      }
    },
  };
</script>

<style src="./color-picker.scss" lang="scss" scoped></style>
<style src="./color-picker-animations.scss" lang="scss"></style>
