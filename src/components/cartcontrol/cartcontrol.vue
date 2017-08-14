<template>
  <div class="cartcontrol">
    <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="decreaseCart($event)"></div>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>


<script type="text/ecmascript-6">
    import Vue from 'vue';
    export default {
      props: {food: Object},
//      created() {
//        console.log('');
//      },
      methods: {
        addCart(event) {
          if (!event._constructed) {
            return;
          }
          console.log('ok');
          if (!this.food.count) {
            Vue.set(this.food, 'count', 1);
          } else {
            this.food.count++;
          }
        },
        decreaseCart(event) {
          if (!event._constructed) {
            return;
          }
          if (this.food.count) {
            this.food.count--;
          }
        }
      }
    };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size: 0
    .cart-decrease, .cart-add
      display: inline-block
      /*padding增加点击区域*/
      padding: 6px
      line-height: 24px
      font-size: 24px
      color: rgb(0,160,220)
    .cart-count
      display: inline-block
      vertical-align: top
      /*.cart-decrease, .cart-add设置了padding，故24px的width变为12px*/
      width: 12px
      padding-top: 6px
      line-height: 24px
      text-align: center
      font-size: 10px
      color: rgb(147,153,159)
    .cart-add
      display: inline-block


</style>
