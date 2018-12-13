<template>
  <div class="footer">
    <div class="button cancel">cancel</div>
    <div class="button chose">choose</div>
  </div>
</template>

<style lang="scss">
  .footer {
    height: 44px;
    border-top: 1px solid #e4e4e4;
    flex-grow: 0;
    display: flex;
  }

  .button {
    font-weight: bold;
    color: #0083d1;
    text-align: center;
    line-height: 44px;
    font-family: "Helvetica neue", sans-serif;
    font-size: 20px;
    cursor: pointer;
    transition: .1s background-color linear;
    user-select: none;
    flex: 1;

    &:active {
      background-color: #ecebf0;
    }

    &.cancel {
      left: 0;
      color: rgb(236, 0, 0);
    }

    &.chose {
      right: 0;
      border-left-width: 1px;
      border-left-style: solid;
      border-left-color: lightgrey;
    }
  }
</style>

<script>
  export default {

  };
</script>
