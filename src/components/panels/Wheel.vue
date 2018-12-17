<template>
  <div>
    <div ref="preview" class="preview-bar"></div>
    <div v-if="!ctx" class="messages">
      <p class="error-message">{{ messages.no_canvas_context }}</p>
    </div>
    <canvas 
      ref="canvas" 
      :height="canvas.size"
      :width="canvas.size"></canvas>
  </div>
</template>

<style src="../shared/errors.scss" lang="scss"></style>
<style lang="scss" scoped>
  .preview-bar {
    width: 392px;
    height: 50px;
    margin-left: 4px;
    margin-top: 6px;
    background-color: rgb(0, 255, 0);
  }

  canvas {
    margin-left: 111.5px;
    margin-top: 13px;
    width: 177px;
    height: 177px;
  }
</style>

<script>
  import I18n from '@/messages/en';
  import circleImage from "@/assets/circleImage";
  import { Vec2, Vec2Substract } from "@/math/Vec2";
  import ColorPickerEventTypes from "@/event";
  import { getColorAtPoint, deviceScale } from "../shared/helpers";

  export default {
    data() {
      const scale = deviceScale();
      const actualSize = 177;

      return {
        messages: {
          no_canvas_context: I18n.no_canvas_context
        },
        ctx: undefined,
        marker: {
          markX: 0,
          markY: 0
        },
        canvas: {
          scale,
          actualSize: actualSize,
          size: actualSize * scale
        }
      };
    },

    mounted() {
      this.ctx = this.$refs.canvas.getContext('2d');

      if (!this.ctx) {
        ColorPickerEventTypes.Error('no canvas context').dispatch(this);

        return;
      }

      this.ctx.scale(this.canvas.scale, this.canvas.scale);

      this.loadBackground(image => {
        this.drawBackground(image);
        this.drawMark(30, 30);

        this.ctx.canvas.addEventListener('mousedown', e => {
          const mouseMove = e => {
            this.ctx.clearRect(0, 0, this.canvas.actualSize, this.canvas.actualSize);
            this.drawBackground(image);
            this.drawMark(e.offsetX - 6, e.offsetY - 6);
            const backgroundColor = getColorAtPoint(this.ctx, this.marker.markX, this.marker.markY, this.canvas.scale).cssRGBA;
            this.$refs.preview.style.backgroundColor = backgroundColor;
          };

          mouseMove(e); // To move the mark at the right position

          this.ctx.canvas.addEventListener('mousemove', mouseMove, false);
          document.addEventListener('mouseup', () => {
            this.ctx.canvas.removeEventListener('mousemove', mouseMove, false);
          });
        });
      });
    },

    methods: {
      loadBackground(completion) {
        const image = new Image();
        image.onload = () => completion(image);
        image.src = circleImage;
      },

      drawBackground(image) {
        this.ctx.drawImage(image, 0, 0, this.canvas.actualSize, this.canvas.actualSize);
      },

      drawMark(x, y) {
        const radMin = 6;
        const radius = this.canvas.actualSize / 2;
        const center = new Vec2(radius, radius);
        const pos = Vec2Substract(center, new Vec2(x, y));

        if (pos.length > radius) {
          pos.setLength(radius);
          x = center.x + -pos.x;
          y = center.y + -pos.y;
        }

        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = 'black';
        this.ctx.arc(x, y, radMin + 2, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.beginPath();
        this.ctx.lineWidth = 1;
        this.ctx.strokeStyle = 'white';
        this.ctx.arc(x, y, radMin, 0, Math.PI * 2, true);
        this.ctx.stroke();
        this.ctx.closePath();

        this.marker.markX = x;
        this.marker.markY = y;
      }
    }
  };
</script>
