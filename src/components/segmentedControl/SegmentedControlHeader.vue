<template>
  <div class="segmented-control-header">
    <div v-for="segment in segmentedControl.segments"
         :key="segment.id"
         :class="{active: segment === segmentedControl.activeSegment}"
         class="segment"
         @click="switchSegment(segment)">
      {{ segment.name }}
    </div>
  </div>
</template>

<style lang="scss">
  .segmented-control-header {
    width: 100%;
    height: 20px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 9px;
    display: grid;
    grid-auto-columns: 1fr;

    .segment {
      height: 20px;
      font-family: "Helvetica neue", sans-serif;
      font-weight: 300;
      color: blue;
      text-align: center;
      line-height: 20px;
      float: left;
      border-left: 1px solid lightgrey;
      grid-row: 1 / 2;

      &:first-child {
        border: none;
      }

      &:active {
        font-weight: 400;
      }

      &.active {
        font-weight: bold;
        color: #3b3bff;
      }
    }
  }
</style>

<script>
  import { SegmentedControl } from './SegmentedControl';

  // noinspection JSUnusedGlobalSymbols
  export default {
    props: {
      segmentedControl: {
        type: SegmentedControl,
        required: true
      }
    },
    methods: {
      switchSegment(segment) {
        this.segmentedControl.activate(segment);
      }
    }
  };
</script>
