<template>
  <div>
    <div class="preview-bar"></div>
    <div class="messages">
      <p class="error-message">{{ no_canvas_context }}</p>
    </div>
    <canvas 
      ref="canvas" 
      height="177" 
      width="177"></canvas>
  </div>
</template>

<style lang="scss">
  .preview-bar {
    width: 392px;
    height: 50px;
    margin-left: 4px;
    margin-top: 6px;
    background-color: rgb(0, 255, 0);
  }

  .messages {
    padding: 10px 0;

    .error-message {
      font-family: sans-serif;
      color: gray;
      margin-top: 43px;
      user-select: none;
      text-align: center;
    }
  }

  canvas {
    margin-left: 111.5px;
    margin-top: 13px;
  }
</style>

<script>
  import I18n from '@/messages/en';

  function loadBackground(completion) {
    image = new Image();
    image.onload = function(e) {
      if (completion) completion();
    };
    image.src = circleImage;
  }

  export default {
    data() {
      return {
        no_canvas_context: I18n.no_canvas_context
      };
    },

    mounted() {
      var canvas = this.$refs.canvas;
      console.log(canvas);
      var ctx = canvas.getContext('2d');
      if (ctx) {
        // todo
        // new AutoDispatchingColorPickerEvent(eventTypes.ColorPickerErrorEvent, {
        //   'description': 'no canvas context'
        // });

        // return new Element(container, function() {
        //   return new Color(0, 0, 0, 1);
        // });
      }
    }
  };
</script>
