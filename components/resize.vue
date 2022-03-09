<template>
    <div class="resize" @mousedown="mousedown" :style="style" @mouseover="mouseover">
        <slot></slot>
    </div>
</template>
<script>

function px(value) {
    if (!value) return value;
    return /\d+px$/.test(value) ? value : `${value}px`;
}

const DIRECTION = {
    TOP: 'TOP',
    LEFT: 'LEFT',
    RIGHT: 'RIGHT',
    DOWN: 'DWON'
}

export default {
    data() {
        return {
            isResizeing: false,
            direction: null
        }
    },
    props: {
        height: Number,
        width: Number,
        minWidth: Number,
        minHeight: Number,
    },
    mounted() {
        document.addEventListener('mousemove', this.mousemove);
        document.addEventListener('mouseup', this.mouseup);
    },
    destroyed() {
        document.removeEventListener('mousemove', this.mousemove);
        document.removeEventListener('mouseup', this.mouseup);
    },
    computed: {
        style() {
            const { width, height, minWidth, minHeight } = this;

            return {
                width: px(width),
                height: px(height),
                minWidth: px(minWidth),
                minHeight: px(minHeight),
                cursor: [DIRECTION.LEFT, DIRECTION.RIGHT].includes(this.direction) ? 'ew-resize' : 'ns-resize'
                }
        }
    },
    methods: {
        setDirection (x, y) {
            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.$el;
    
            if (x > (offsetLeft + offsetWidth - 5)) {
                this.direction = DIRECTION.RIGHT;
            } else if (y > offsetTop + offsetHeight - 5) {
                this.direction = DIRECTION.DOWN;
            } else if (x < offsetLeft + 5) {
                this.direction = DIRECTION.LEFT;
            } else if (y < offsetTop + 5) {
                this.direction = DIRECTION.TOP
            }
        },
        mouseover(evt) {
            this.setDirection(evt.x, evt.y);
        },
        mousedown(evt) {
            if (evt.target !== this.$el) return;

            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.$el;
    
            this.setDirection(evt.x, evt.y);
            this.prevPosition = { offsetLeft, offsetTop, offsetWidth, offsetHeight };
            this.isResizeing = true;
        },
        mousemove(evt) {
            if (!this.isResizeing) return;

            const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = this.$el;

            switch(this.direction) {
                case DIRECTION.RIGHT:
                    this.$el.style.width = px(evt.x - offsetLeft);
                break;
                case DIRECTION.DOWN:
                    this.$el.style.height = px(evt.y - offsetTop);
                break;
                case DIRECTION.LEFT:
                    this.$el.style.width = px(this.prevPosition.offsetLeft + this.prevPosition.offsetWidth - evt.x);
                    this.$el.style.left = px(evt.x);
                break;
                case DIRECTION.TOP:
                    this.$el.style.height = px(this.prevPosition.offsetHeight + this.prevPosition.offsetTop - evt.y);
                    this.$el.style.top = px(evt.y);
            }

            
        },
        mouseup(evt) {
            this.isResizeing = false;
            this.direction = null;
        }
    }
}
</script>
<style lang="less" scoped>

.resize {
    // padding: 5px;
    // background: transparent;
    // display: inline-block;
    // top: 20%;
    // left: 20%;
    // position: relative;

    // :only-child {
    //     cursor: pointer;
    // }
}
</style>