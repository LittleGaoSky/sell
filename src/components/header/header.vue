<template>
  <div class="header">
    <!--内容区-->
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <span class="icon"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <!--公告区-->
    <div class="bulletin-wrapper"></div>
  </div>
</template>


<script type="text/ecmascript-6">
  export default {
    props: {seller: Object}
  };
</script>

<style lang="stylus" type="text/stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl";//css不可以用alias别名，那是针对js的，必须用相对路径
  .header
    color : #fff
    background: #000
    .content-wrapper
      padding: 24px 12px 18px 24px
      font-size: 0  //清除avatar和content层之间的空白字符
      .avatar
        display: inline-block
      .content
        display: inline-block
        margin-left: 16px
        font-size: 14px
        .title
          margin: 2px 0px 8px 0
          .brand
            display inline-block
            vertical-align: top //顶部对齐，和.name中垂直方向保持在一个水平线
            width: 30px
            height: 18px
            bg-image('brand')
            background-size: 30px 18px
            background-repeat: no-repeat
          .name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
</style>
