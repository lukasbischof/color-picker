<template>
  <div>
    <div class="preview-bar" ref="preview"></div>
    <div class="messages" v-if="!ctx">
      <p class="error-message">{{ messages.no_canvas_context }}</p>
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
  import circleImage from "@/assets/circleImage";
  import { Vec2, Vec2Substract } from "@/math/Vec2";
  import Color from "@/models/Color";

  function getColorAtPoint(ctx, x, y) {
    const data = ctx.getImageData(x, y, 1, 1).data;
    if (!data)
      return undefined;

    return new Color(data[0], data[1], data[2], data[3]);
  }

  export default {
    data() {
      return {
        messages: {
          no_canvas_context: I18n.no_canvas_context
        },
        ctx: undefined,
        marker: {
          markX: 0,
          markY: 0
        }
      };
    },

    mounted() {
      const canvas = this.$refs.canvas;
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        // todo
        // new AutoDispatchingColorPickerEvent(eventTypes.ColorPickerErrorEvent, {
        //   'description': 'no canvas context'
        // });

        // return new Element(container, function() {
        //   return new Color(0, 0, 0, 1);
        // });

        return;
      }

      this.ctx = ctx;

      this.loadBackground(image => {
        this.drawBackground(image);
        this.drawMark(30, 30);

        this.ctx.canvas.addEventListener('mousedown', e => {
          const mouseMove = e => {
            this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
            this.drawBackground(image);
            this.drawMark(e.offsetX - 6, e.offsetY - 6);
            this.$refs.preview.style.backgroundColor = getColorAtPoint(ctx, this.marker.markX, this.marker.markY).cssRGBA;
          };

          mouseMove(e); // To move the mark at the right position

          this.ctx.canvas.addEventListener('mousemove', mouseMove, false);
          document.addEventListener('mouseup', () => {
            this.ctx.canvas.removeEventListener('mousemove', mouseMove, false);
          });
        });
      })
    },

    methods: {
      loadBackground(completion) {
        const image = new Image();
        image.onload = () => completion(image);
        image.src = circleImage;
      },

      drawBackground(image) {
        this.ctx.drawImage(image, 0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      },

      drawMark(x, y) {
        const radMin = 6;
        const radius = this.ctx.canvas.width / 2;
        const center = new Vec2(radius, radius);
        const pos = Vec2Substract(center, new Vec2(x, y));

        if (pos.length > radius) {
          pos.setLength(radius);
          x = center.x + -pos.x;
          y = center.y + -pos.y;
        }

        this.ctx.beginPath();
        this.ctx.strokeStyle = 'white';
        this.ctx.lineWidth += 2;
        this.ctx.arc(x, y, radMin, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.lineWidth -= 2;

        this.ctx.strokeStyle = 'black';
        this.ctx.arc(x, y, radMin + 2, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.marker.markX = x;
        this.marker.markY = y;
      }
    }
  };
</script>
