<template>
  <div id="app">
    <transition name="fade" v-if="isLoading">
      <preloader-component />
    </transition>
    <mq-layout mq="md+"><header-component /></mq-layout>
    <mq-layout mq="sm"><header-mobile /></mq-layout>
    <transition :name="transitionName" mode="out-in" @beforeLeave="beforeLeave" @enter="enter" @afterEnter="afterEnter">
      <router-view :key="$route.fullPath" />
    </transition>
  </div>
</template>
<script>
import PreloaderComponent from '@/components/preloader/PreloaderComponent'
import HeaderComponent from '@/components/layout/HeaderComponent'
import HeaderMobile from '@/components/mobile/HeaderMobile'
const DEFAULT_TRANSITION = 'fade'
export default {
  name: 'app',
  components: { HeaderComponent, HeaderMobile, PreloaderComponent },
  metaInfo: {
    title: 'MERCURY 99',
    titleTemplate: '%s | Building Company'
  },
  data () {
    return {
      prevHeight: 0,
      transitionName: DEFAULT_TRANSITION
    }
  },
  created () {
    this.$router.beforeEach((to, from, next) => {
      let transitionName = to.meta.transitionName || from.meta.transitionName

      if (transitionName === 'slide') {
        const toDepth = to.path.split('/').length
        const fromDepth = from.path.split('/').length
        transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      }

      this.transitionName = transitionName || DEFAULT_TRANSITION

      next()
    })
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  methods: {
    beforeLeave (element) {
      this.prevHeight = getComputedStyle(element).height
      this.$el.classList.remove('active-component')
    },
    enter (element) {
      const { height } = getComputedStyle(element)
      element.style.height = this.prevHeight
      setTimeout(() => {
        element.style.height = height
      })
    },
    afterEnter (element) {
      element.style.height = 'auto'
      this.$el.classList.add('active-component')
    }
  }
}
</script>

<style>
.noeffect-enter-active,
.noeffect-leave-active {
  transition-duration: 0;
  transition-property: opacity;
  transition-timing-function: inherit;
  overflow: visible;
}
.noeffect-enter,
.noeffect-leave-active {
  opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-property: height, opacity;
  transition-timing-function: ease;
  overflow: hidden;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}

</style>
