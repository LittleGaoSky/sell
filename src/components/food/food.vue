<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <div class="food-content">
        <div class="image-header">
          <img :src="food.image">
          <div class="back" @click="hide">
            <i class="icon-arrow_lift"></i>
          </div>
        </div>
        <div class="content">
          <h1 class="title">{{food.name}}</h1>
          <div class="detail">
            <span class="sell-count">月售{{food.sellCount}}份</span><span class="rating">好评率{{food.rating}}%</span>
          </div>
          <div class="price">
            <span class="now">￥{{food.price}}</span><span class="old" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
          </div>
        </div>
        <div class="cartcontroll-wrapper">
          <cartcontroll  @add="addFood" :food="food"></cartcontroll>
        </div>
        <transition name="fade">
          <div @click.stop="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontroll from '../cartcontrol/cartcontrol.vue';
    import Vue from 'vue';
    export default {
      props: {food: Object},
      data() {
        return {showFlag: false};
      },
      methods: {
        show() {
          this.showFlag = true;
          this.$nextTick(() => { // 保证DOM渲染好了
            if (!this.scroll) {
              this.scroll = new BScroll(this.$refs.food, {click: true});
            } else {
              this.scroll.refresh();
            }
          });
        },
        hide() {
          this.showFlag = false;
        },
        addFirst(event) { // 不手动传event，默认传递过来的也是点击事件
          if (!event._constructed) {
            return;
          }
          this.$emit('add', event.target);
          Vue.set(this.food, 'count', 1);// 第一次可能没有count属性
        },
        addFood (target) {
          this.$emit('add', target);
        }
      },
      components: {
        cartcontroll
      }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .food
    position: fixed
    left: 0
    top: 0
    bottom: 48px // 给购物车留出位置
    z-index: 30  // 让购物车logo、弹出层不被遮住
    width: 100%
    background: #fff
    transform: translate3d(0,0,0)
    &.move-enter-active, &move-leave-active
      transition: all 0.2s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%,0,0)
    .image-header
      position: relative
      width: 100%
      height: 0
      padding-top: 100%  // 黑魔法 > _ < ,w3c的设计标准，此时padding的top值和width一样的，异步加载图片不会抖动
      img
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
      .back
        position: absolute
        top: 10px
        left: 0
        .icon-arrow_lift
          display: block
          padding: 10px // 增加点击区域
          font-size: 20px
          color: #fff
    .content
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 8px
        font-size: 14px
        font-weight: 700
        color: rgb(7,17,27)
      .detail
        margin-bottom: 18px
        line-height: 10px
        height: 10px
        font-size: 0
        .sell-count, .rating
          font-size: 10px
          color: rgb(147,153,159)
        .sell-count
          margin-right: 12px
      .price
        font-weight: 700
        line-height: 24px
        .now
          margin-right: 8px
          font-size: 14px
          color: rgb(240,20,20)
        .old
          text-decoration: line-through
          font-size: 10px
          color: rgb(147,153,159)
    .cartcontroll-wrapper
      position: absolute
      right: 12px     // cartcontrol组件padding: 6px，故设计稿中的right, bottom都要减去6px
      bottom: 12px
    .buy
      position: absolute
      right: 18px
      bottom: 18px
      z-index: 10
      height: 24px
      padding: 6px 12px
      line-height: 12px
      box-sizing: border-box  // IE盒子模型 width=padding + content + border
      font-size: 10px
      color: #fff
      background: rgb(0,160,220)
      border-radius: 12px
      opacity: 1
      &.fade-enter-active, &.fade-leave-active
        transition: all 0.4s
      &.fade-enter, &.fade-leave-active
        opacity: 0
        z-index: -1
</style>
