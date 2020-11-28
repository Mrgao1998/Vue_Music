<template>
  <transition name="slide" appear>
    <music-list :songs="songs" :title="title" :bg-image="bgImage"></music-list>
  </transition>
</template>
<script>
import {mapGetters} from 'vuex'
import {getSingerDetail, getSongVkey} from 'api/singer'
import {ERR_OK} from 'api/config'
import {createSong} from '../../common/js/song.js'
import MusicList from 'components/music-list/music-list'
export default {
  name: 'SingerDetail',
  data () {
    return {
      songs: []
    }
  },
  components: {
    MusicList
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getDetail()
  },
  methods: {
    // 获取歌手详情
    _getDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          // console.log(res.data)
          this.songs = this._normalizeSongs(res.data.list)
          // console.log(this.songs)
        }
      })
    },
    // 对获取歌手详情的数据进行调整
    _normalizeSongs (list) {
      let result = []
      list.forEach((item) => {
        let {musicData} = item
        if (musicData.songid && musicData.albummid) {
          getSongVkey(musicData.songmid).then((res) => {
            const vkey = res
            // console.log(`http://113.106.207.149/amobile.music.tc.qq.com/${vkey}`)
            if (musicData.songid && musicData.albummid) {
              result.push(createSong(musicData, vkey))
            }
          })
        }
      })
      return result
    }
  }
}
</script>
<style scoped lang="stylus">
@import "~common/stylus/variable";
.slide-enter-active,.slide-leave-active
  transition: all 0.5s
.slide-enter,.slide-leave-to
  transform: translate3d(100%, 0, 0)
</style>
