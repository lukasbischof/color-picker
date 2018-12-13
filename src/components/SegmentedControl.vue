<template>
  <div class="segmented-control">
    <div class="segment active">Circle</div>
    <div class="segment">Spectrum</div>
    <div class="segment">Pallet</div>
    <div class="segment">RGBA</div>
  </div>
</template>

<style lang="scss">
  .segmented-control {
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
  export default {

  };
</script>
