<template>
  <transition name="move">
    <div class="food" v-show="showFlag" ref="food">
      <!--style会加载ref的第一个节点上，ref里面加个div包一层
-->
      <div>
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
            <div class="cartcontroll-wrapper">
              <cartcontroll  @add="addFood" :food="food"></cartcontroll>
            </div>
            <transition name="fade">
              <div @click.stop="addFirst($event)" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
            </transition>
          </div>
        </div>
        <split></split>
        <div class="info" v-show="food.info">
          <h1 class="title">商品介绍</h1>
          <div class="text">{{food.info}}</div>
        </div>
        <split></split>
        <div class="ratings">
          <h1 class="title">商品评价</h1>
          <ratingselect @select="select" @toggleContent="toggleContent" :select-type="selectType" :only-content="onlyContent" :desc="desc" :ratings="food.ratings"></ratingselect>
          <div class="rating-wrapper">
            <ul v-show="food.ratings && food.ratings.length">
              <li v-show="needShow(rating.rateType,rating.text)"  class="rating-item border-1px" v-for="rating in food.ratings">
                <div class="user">
                  <span class="name">{{rating.username}}</span>
                  <img class="avatar" width="12" height="12" :src="rating.avatar">
                </div>
                <div class="time">{{rating.rateTime | formatDate}}</div>
                <p class="text">
                  <i :class="{'icon-thumb_up':rating.rateType===0, 'icon-thumb_down':rating.rateType===1}"></i>{{rating.text}}
                </p>
              </li>
            </ul>
            <div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    import BScroll from 'better-scroll';
    import cartcontroll from '../cartcontrol/cartcontrol.vue';
    import Vue from 'vue';
    import split from '../split/split.vue';
    import ratingselect from '../ratingselect/ratingselect.vue';
    import {formatDate} from '../../common/js/date';   // export用花括号，花括号内可以引多个
    //  const POSITIVE = 0;
    //  const NEGATIVE = 1;
    const ALL = 2;
    export default {
      props: {food: Object},
      data() {
        return {
          showFlag: false,
          selectType: ALL,
          onlyContent: false,
          desc: {
            all: '全部',
            positive: '推荐',
            negative: '吐槽'
          }
        };
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
        addFood(target) {
          this.$emit('add', target);
        },
        select(type) {
          this.selectType = type;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        toggleContent() {
          this.onlyContent = !this.onlyContent;
          this.$nextTick(() => {
            this.scroll.refresh();
          });
        },
        needShow(type, text) {
          if (this.onlyContent && !text) {
            return false;
          }
          if (this.selectType === ALL) {
            return true;
          } else {
            return type === this.selectType;
          }
        }
      },
      components: {
        cartcontroll,
        split,
        ratingselect
      },
      filters: {
        formatDate(time) {
          let date = new Date(time);
          return formatDate(date, 'yyyy-MM-dd hh:mm');
        }
      }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mixin.styl';
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
      position: relative
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
    .info
      padding: 18px
      .title
        line-height: 14px
        margin-bottom: 6px
        font-size: 14px
        color: rgb(7,17,27)
      .text
        line-height: 24px
        padding: 0 8px
        font-size: 12px
        color: rgb(77,85,93)
    .ratings
      padding-top: 18px
      .title
        line-height: 14px
        margin-left: 18px
        font-size: 14px
        color: rgb(7,17,27)
      .rating-wrapper
        padding: 0 18px
        .rating-item
          position: relative
          padding: 16px 0
          border-1px(rgba(7,17,27,0.1))
          .user
            position: absolute
            right: 0
            top: 16px
            line-height: 12px
            font-size: 0
            .name
              display: inline-block
              vertical-align: top
              margin-right: 6px
              font-size: 10px
              color: rgb(147,153,159)
            .avatar
              border-radius: 50%
          .time
            margin-bottom: 6px
            line-height: 12px
            font-size: 10px
            color: rgb(147,153,159)
          .text
            line-height: 16px
            font-size: 12px
            color: rgb(7,17,27)
            .icon-thumb_up, .icon-thumb_down
              margin-right: 4px
              line-height: 12px
              font-size: 12px
            .icon-thumb_up
              color: rgb(0,160,220)
            .icon-thumb_down
              color: rgb(147,153,159)
        .no-rating
          padding: 16px 0
          font-size: 12px
          color: rgb(17,153,159)
</style>
