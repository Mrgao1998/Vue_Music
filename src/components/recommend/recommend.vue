<template>
  <div class="recommend" ref="recommend">
    <scroll class="recommend-content" ref="scroll" :data="discList">
      <div>
        <div class="slider-wrapper" v-if="BannerData.data.slider.length">
          <slider>
            <div v-for="item in BannerData.data.slider" :key="item.id">
              <a :href="item.linkUrl">
                <img v-lazy="item.picUrl" class="needsclick"  @load="imgload" />
              </a>
            </div >
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="(item,index) in discList" class="item" :key="index" @click="selectItem(item)">
              <div class="icon">
                <img v-lazy="item.imgurl" width="60" height="60" />
              </div>
              <div class="text">
                <h2 class="name" v-html="item.creator.name"></h2>
                <p class="desc" v-html="item.dissname"></p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div v-show="!discList.length" class="loading-container">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>
<script>
import Loading from 'base/loading/loading'
import Slider from 'base/slider/slider'
import {getDiscList} from 'api/recommend'
import { ERR_OK } from 'api/config'
import Scroll from 'base/scroll/scroll'
import {playlistMixin} from 'common/js/mixin'
import {mapMutations} from 'vuex'
export default {
  mixins: [playlistMixin],
  name: 'Recommend',
  components: {
    Slider,
    Scroll,
    Loading
  },
  data () {
    return {
      isimgload: false,
      discList: [],
      BannerData: {
        'code': 0,
        'data': {
          'slider': [
            {
              'id': 29294,
              'linkUrl': 'https://y.qq.com/n/yqq/album/000MKKJW0TJaQf.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2718603.jpg'
            }, {
              'id': 29314,
              'linkUrl': 'https://y.qq.com/n/yqq/album/7598336531.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2722204.jpg'
            }, {
              'id': 29322,
              'linkUrl': 'https://y.qq.com/n/yqq/album/003rWUty2SDBsG.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2718628.jpg'
            }, {
              'id': 29299,
              'linkUrl': 'https://y.qq.com/n/yqq/album/00379g3g0jrpXU.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2721567.jpg'
            }, {
              'id': 29304,
              'linkUrl': 'https://y.qq.com/n/yqq/album/002e91Nm3KuGVV.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2718087.png'
            }, {
              'id': 29303,
              'linkUrl': 'https://y.qq.com/n/yqq/album/000lqfgH3pw51h.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2718068.jpg'
            }, {
              'id': 29242,
              'linkUrl': 'https://y.qq.com/n/yqq/album/c0034dqphhw.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2717960.jpg'
            }, {
              'id': 29208,
              'linkUrl': 'https://y.qq.com/n/yqq/album/003tEpdC1k7ckD.html',
              'picUrl': 'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/2713486.jpg'
            }
          ]
        }
      }
    }
  },
  created () {
    this._getDiscList()
  },
  mounted () {
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    _getDiscList () {
      getDiscList().then((res) => {
        if (res.code === ERR_OK) {
          this.discList = res.data.list
        }
      })
    },
    imgload () {
      if (this.isimgload === false) {
        this.$refs.scroll.refresh()
      }
      this.isimgload = true
    },
    selectItem (item) {
      this.$router.push({
        path: `/recommend/${item.dissid}`
      })
      this.setDisc(item)
    },
    ...mapMutations({
      setDisc: 'SET_DISC'
    })
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable";
  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
        img
          width: 100%
          height:100px
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
