<template>
  <div class="main-content">
    <mq-layout mq="md+" class="building-view-header"><navinner-component v-if="building" :navTitle="building['title_' + $i18n.locale]" /></mq-layout>
    <div class="building-apartments">
      <mq-layout mq="sm" class="mobile-building-title"><h1>{{ building['title_' + $i18n.locale] }}</h1></mq-layout>
      <div class="img-box">
        <div id="building" v-if="building" :style="'background-image: url(' + building.image + ')'"></div>
        <div class="flor-info-tooltip">
          <div class="tooltip-info">
            <div class="box">
              <div class="number" id="js-floor"></div>
              <div class="text">{{ $t('floor') }}</div>
            </div>
            <div class="box">
              <div class="number" id="js-entrance"></div>
              <div class="text">{{ $t('entrance') }}</div>
            </div>
          </div>
          <div class="tooltip-info apartments-count">
            <div class="box">
              <div class="text" v-html="$t('available_apartments')"></div>
              <div class="number" id="js-apartments"></div>
            </div>
          </div>
          <div class="tooltip-info button-info">
            <div class="box">
              <router-link :to="floorRoute" class="btn">{{ $t('back_floor') }}</router-link>
            </div>
          </div>
        </div>
      </div>
      <filtered-apartments
        @clicked="isFiltred = false"
        :isFiltred="isFiltred"
        :priceFrom="priceFrom"
        :priceTo="value"
        :rooms="rooms"
        :available="available" />
      <parking-component :parkingsActive="parkingsActive" @clicked="() => parkingsActive = false" />
      <div class="filters" v-if="priceFrom" v-bind:class="{ active: filterActive }">
        <div class="close" @click="() => {
            filterActive = !filterActive
            show = !show
            }"></div>
        <div class="filter-row">
          <div class="filter-box">
            <div class="text">{{ $t('rooms') }}:</div>
          </div>
          <div class="filter-box">
            <div class="input-field">
              <input type="checkbox" id="one" name="rooms" class="checkbox" v-model="rooms" value="1" />
              <label for="one">1</label>
            </div>
            <div class="input-field">
              <input type="checkbox" id="two" name="rooms" class="checkbox" v-model="rooms" value="2" />
              <label for="two">2</label>
            </div>
            <div class="input-field">
              <input type="checkbox" id="three" name="rooms" class="checkbox" v-model="rooms" value="3" />
              <label for="three">3</label>
            </div>
            <div class="input-field">
              <input type="checkbox" id="four" name="rooms" class="checkbox" v-model="rooms" value="4" />
              <label for="four">4+</label>
            </div>
          </div>
          <div class="filter-box price-range">
            <div class="text">{{ $t('select_price') }}:</div>
            <div class="price">
              <div class="min">5 000 EUR</div>
              <vue-slider
                :show="show"
                ref="slider"
                v-model="value"
                :width="400"
                formatter="{value} euro"
                :min="priceFrom"
                :max="300000"
                :interval="5000" />
              <div class="max">300 000 EUR</div>
            </div>
          </div>
          <div class="filter-box">
            <input type="submit" class="filter-btn" :value="$t('search')" @click="
            isFiltred = !isFiltred
            filterActive = !filterActive
            show = !show" />
          </div>
        </div>
      </div>
      <mq-layout mq="sm" class="entrances-mobile">
        <ul>
          <li v-for="entrance in buildingEntrances" :key="entrance.id">
            <router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale] + '/floor/1/' + entrance['slug_' + $i18n.locale]">{{ entrance['title_' + $i18n.locale] }}</router-link>
          </li>
        </ul>
      </mq-layout>
      <div class="bottom-options">
        <div class="building-btn">
          <div class="btn-box"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]" class="btn">{{ $t('building_information') }}</router-link></div>
        </div>
        <div class="building-filter">
          <button class="filter-btn" @click="() => {
            filterActive = !filterActive
            show = !show
            }"
            v-tooltip="{ content: $t('filter_apartments'), placement: 'left', offset: '30', classes: 'left-tooltip' }">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button class="parking-btn"
            @click="parkingsActive = !parkingsActive"
            v-tooltip="{ content: $t('all_parking'), placement: 'left', offset: '30', classes: 'left-tooltip' }"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import store from '../store'
import { mapState } from 'vuex'
import vueSlider from 'vue-slider-component'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import FilteredApartments from '@/components/buildings/FilteredApartments'
import ParkingComponent from '@/components/buildings/ParkingComponent'
/* eslint-disable no-undef */
export default {
  name: 'building-view',
  components: { NavinnerComponent, vueSlider, FilteredApartments, ParkingComponent },
  data () {
    return {
      show: false,
      floorRoute: '',
      value: 300000,
      available: true,
      parkingsActive: false,
      filterActive: false,
      isFiltred: false,
      rooms: [],
      priceFrom: 5000,
      hdc: null,
      game: null,
      polygons: [],
      coordinates: [
        [25, 573, 38, 578, 40, 601, 70, 571, 86, 573, 98, 563, 354, 583, 355, 543, 376, 532, 377, 517, 75, 488],
        [40, 609, 52, 583, 69, 568, 86, 570, 96, 559, 352, 582, 355, 627, 98, 612, 69, 617, 40, 648],
        [718, 510, 1322, 285, 1465, 320, 1471, 354, 1393, 339, 715, 544]
      ],
      background: null,
      isInit: false,
      entrances: [],
      insidePoly: false,
      jsApartments: null,
      jsFloor: null,
      jsEntrance: null,
      tooltip: null
    }
  },
  beforeRouteEnter (to, from, next) {
    store.commit('startFetching')
    // eslint-disable-next-line
    store.dispatch('fetchBuilding', to.params.id).then(() => {
      // eslint-disable-next-line
      store.cache.dispatch('fetchBuildingEntrances', to.params.id).then(() => {
        // eslint-disable-next-line
        store.cache.dispatch('fetchBuildingFloors', to.params.id).then(() => {
          // eslint-disable-next-line
          store.cache.dispatch('fetchBuildingApartments', to.params.id).then(() => {
            next()
          })
        })
      })
    })
  },
  watch: {
    show (val) {
      if (val) {
        this.$nextTick(() => this.$refs.slider.refresh())
      }
    }
  },
  mounted () {
    this.initCanvas()
  },
  methods: {
    initCanvas () {
      this.game = new Phaser.Game(
        1920 * window.devicePixelRatio,
        1080 * window.devicePixelRatio,
        Phaser.CANVAS,
        'building',
        {
          preload: this.preloadGame,
          create: this.createGame
        }
      )

      return true
    },
    initTooltip () {
      this.tooltip = document.querySelector('.flor-info-tooltip')

      this.jsApartments = document.getElementById('js-apartments')
      this.jsFloor = document.getElementById('js-floor')
      this.jsEntrance = document.getElementById('js-entrance')
      if (window.innerWidth > 1024) {
        window.onmousemove = (e) => {
          if (this.insidePoly) {
            let x = (e.clientX - this.tooltip.offsetWidth / 2) + 'px'
            let y = (e.clientY + 50) + 'px'

            this.tooltip.style.display = 'block'
            this.tooltip.style.top = y
            this.tooltip.style.left = x
          } else {
            this.tooltip.style.display = 'none'
          }
        }
      }
    },
    preloadGame () {
      this.game.load.image('starlight', this.building.image)
    },
    createGame () {
      this.game.stage.disableVisibilityChange = true
      this.game.tweens.frameBased = true
      this.game.time.advancedTiming = false
      this.game.config.forceSetTimeOut = false
      this.game.forceSingleUpdate = false

      this.scaleGame()

      this.background = this.game.add.tileSprite(0, 0, 1920, 1080, 'starlight')
      this.buildingEntrances.forEach((entrance, eIndex) => {
        let entrc = {
          polygons: []
        }

        const floors = this.$store.getters.getFloorsByEntrance(entrance['slug_' + this.$i18n.locale])
        floors.forEach((floor, index) => {
          let coords = floor.coords.split(',')
          let originalCoords = []
          let floorData = {
            index,
            countOfApartments: floor.totalFreeApartments,
            entrance: entrance['title_' + this.$i18n.locale].split('').pop()
          }
          coords.forEach(c => {
            if (c.includes(' ')) {
              let o = c.split(' ').map(c => Number(c)).filter(c => c)
              originalCoords.push(o[0])
              originalCoords.push(o[1])
            } else {
              originalCoords.push(Number(c))
            }
          })

          let poly = new Phaser.Polygon(originalCoords)
          let graphics = this.game.add.graphics(0, 0)

          graphics.inputEnabled = true
          graphics.input.useHandCursor = true

          graphics.events.onInputDown.add(this.onDown(entrance['slug_' + this.$i18n.locale], floor['slug_' + this.$i18n.locale], eIndex, floorData, floor.id, poly), this)
          graphics.events.onInputOver.add(this.onOver(eIndex, floorData, floor.id), this)
          graphics.events.onInputOut.add(this.onOut(eIndex, floorData), this)

          graphics.alpha = 0
          graphics.beginFill(0xfa6a02)
          graphics.drawPolygon(poly.points)
          graphics.endFill()

          entrc.polygons.push(graphics)
          this.polygons.push(graphics)
        })

        this.entrances.push(entrc)
      })

      this.initTooltip()
      setTimeout(() => store.commit('stopFetching'), 1000)
    },
    onDown (entranceSlug, floorSlug, eIndex, floorData, id, poly) {
      return (e) => {
        if (window.innerWidth < 1025) {
          console.log(e, this.game.input)
          let x = (this.game.input.activePointer.clientX - this.tooltip.offsetWidth / 2) + 'px'
          let y = (this.game.input.activePointer.clientY + 50) + 'px'
          this.tooltip.style.display = 'block'
          this.tooltip.style.top = y
          this.tooltip.style.left = x
          this.jsApartments.innerText = floorData.countOfApartments
          this.jsFloor.innerText = floorData.index + 1
          this.jsEntrance.innerText = floorData.entrance
          this.insidePoly = true
          this.game.add.tween(this.entrances[eIndex].polygons[floorData.index]).to({ alpha: 0.5 }, 200, 'Linear', true)
          this.floorRoute = `/${this.$i18n.locale}/${this.$route.params.id}/${this.$route.params.building}/floor/${floorSlug}/${entranceSlug}`
          this.hidePolygons()
          return
        }
        this.$router.push({ name: 'building-inner-floor', params: { slug: entranceSlug, floorId: floorSlug } })
      }
    },
    hidePolygons () {
      this.entrances.forEach(entrance => {
        const activePolygons = entrance.polygons.filter(poly => poly.alpha)
        activePolygons.forEach(poly => {
          this.game.add.tween(poly).to({ alpha: 0 }, 200, 'Linear', true)
        })
      })
    },
    onOver (eIndex, floorData, id) {
      return () => {
        if (window.innerWidth <= 1024) return
        this.jsApartments.innerText = floorData.countOfApartments
        this.jsFloor.innerText = floorData.index + 1
        this.jsEntrance.innerText = floorData.entrance
        this.insidePoly = true
        this.game.add.tween(this.entrances[eIndex].polygons[floorData.index]).to({ alpha: 0.5 }, 200, 'Linear', true)
      }
    },
    onOut (eIndex, floorData) {
      return () => {
        this.insidePoly = false
        this.game.add.tween(this.entrances[eIndex].polygons[floorData.index]).to({ alpha: 0 }, 200, 'Linear', true)
      }
    },
    scaleGame () {
      let scaleDevice = Phaser.ScaleManager.EXACT_FIT
      if (window.innerWidth < 1025) {
        scaleDevice = Phaser.ScaleManager.SHOW_ALL
      }
      this.game.scale.fullScreenScaleMode = scaleDevice
      this.game.scale.scaleMode = scaleDevice

      this.game.scale.setMinMax(480, 270)

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
      Phaser.Canvas.setSmoothingEnabled(this.game.context, false)

      this.game.antialias = false

      this.game.scale.setGameSize(1920, 1080)
      this.game.scale.refresh()
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      building: state => state.buildings.building,
      buildingEntrances: state => state.buildings.buildingEntrances,
      buildingApartments: state => state.buildings.buildingApartments
    })
  },
  beforeDestroy () {
    this.game.destroy()
  }
}
</script>

<style lang="scss">
canvas {
  @media screen and(min-width: 1025px) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  // height: 480px !important;
}
.flor-info-tooltip {
  position: absolute;
  z-index: 9999;
  background: #fff;
  padding: 20px 10px;
  top: 100px;
  display: none;
  &:before {
    content: '';
    position: absolute;
    left: 50%;
    top: -7px;
    margin-left: -5px;
    transform: trnaslateX(-50%);
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 0 5px 7px 5px;
    border-color: transparent transparent #ffffff transparent;
  }
  .tooltip-info {
    display: flex;
    align-items: center;
    &.button-info {
      display: none;
    }
    &.apartments-count {
     border-top: 1px solid #cfcfcf;
     margin-top: 10px;
     padding-top: 10px;
      .box {
        width: 100%;
        .number {
          margin-left: 0;
          margin-right: 10px;
        }
      }
    }
    &:last-child {
      .box {
        padding-left: 0;
        padding-right: 0;
      }
    }
    .box {
      text-align: center;
      padding: 0 20px;
      width: 100%;
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-start;
      .btn {
        background: #fa6a02;
        padding: 14px 10px;
        text-align: center;
        width: 100%;
        margin: 10px 0 0 0;
        &:after,&:before {
          display: none;
        }
      }
      .text {
        font-family: 'Montserrat', sans-serif;
        font-weight: 600;
        font-size: 12px;
        color: #333;
        br {
          display: none;
        }
      }
      .number {
        margin-right: auto;
        font-weight: 700;
        color: #000;
        font-size: 26px;
        margin-left: 10px;
        font-family: 'Exo 2', sans-serif;
      }
      &+.box {
        border-left: 1px solid #cfcfcf;
      }
    }
  }
  @media screen and(max-width: 1024px) {
    .tooltip-info.button-info {
      display: block;
    }
  }
  @media screen and(max-width:992px) {
    padding: 20px 10px 10px;
    .tooltip-info {
      .box {
        padding: 0 10px;
        .number {
          font-size: 16px;
        }
      }
    }
  }
}
.filters {
  position: absolute;
  left: 40px;
  right: 235px;
  bottom: 0;
  background: #232323;
  min-height: 220px;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 300;
  transform: translateY(100%);
  transition: all .7s;
  .close {
    position: absolute;
    right: 25px;
    top: 25px;
    width: 20px;
    height: 20px;
    background: url(../assets/images/close-apms-icon.svg) no-repeat center center;
    background-size: 100%;
    cursor: pointer;
    z-index: 999;
  }
  &.active {
    transform: translateY(0);
    bottom: 40px;
  }
  .price {
    position: relative;
    .min, .max {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 11px;
      font-weight: 500;
      position: absolute;
      bottom: -10px;
    }
    .min {
      left: 10px;
    }
    .max {
      right: 10px;
    }
  }
  .vue-slider-component {
    width: 400px;
  }
  .vue-slider-component .vue-slider-tooltip {
    padding: 20px;
    border-radius: 0;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }
  .vue-slider-component .vue-slider-tooltip,
  .vue-slider-component .vue-slider-process {
    background-color: #fa6a02;
    border-color: #fa6a02;
  }
  .filter-row {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    .filter-box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: row;
      flex-wrap: wrap;
      &.price-range {
        margin-left: 50px;
        margin-right: 50px;
      }
    }
    .text {
      color: #8d8d8d;
      font-family: "Fira Sans";
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      margin-right: 10px;
    }
  }
  .input-field {
    margin: 0 5px;
    label {
      width: 55px;
      height: 58px;
      line-height: 60px;
      border: 1px solid rgba(#aea9a9, .2);
      color: #fff;
      font-size: 12px;
      font-weight: 700;
      text-transform: uppercase;
      display: block;
      cursor: pointer;
      text-align: center;
    }
    input[type=checkbox] {
      display: none;
      &:checked + label {
        color: #fff;
        border: 1px solid #6e6d6d;
      }
    }
  }
  .filter-btn {
    background: url(../assets/images/src-icon.svg) no-repeat center;
    outline: none;
    box-shadow: none;
    width: 58px;
    height: 58px;
    border: 1px solid #fa6a02;
    font-size: 0;
    cursor: pointer;
  }
  @media screen and(max-width: 768px) {
    left: 0;
    right: 0;
    bottom: 0;
    padding: 0;
    background: rgba(0,0,0, .5);
    .vue-slider-component {
      .vue-slider-tooltip {
        padding: 12px 10px;
        font-size: 16px;
      }
    }
    &.active {
      position: fixed;
      top: 0;
      bottom: 0;
      z-index: 99999;
      .filter-row {
        width: 100%;
        background: #232323;
        margin-top: auto;
        padding: 20px;
        .filter-box {
          margin: 15px 0;
          &.price-range {
            margin: 30px 0;
            flex-direction: column;
          }
        }
      }
    }
    .filter-row {
      flex-direction: column;
      .vue-slider-component {
        width: 280px !important;
      }
    }
    .filter-btn {
      font-size: 16px;
      color: #fff;
      width: auto;
      padding-left: 42px;
      padding-right: 20px;
      background-position: 14px center;
    }
  }
}
.building-apartments {
  overflow: hidden;
  height: 100vh;
  position: relative;
  opacity: 0;
  transition-delay: 1s;
  transition-duration: .3s;
  transition-property: opacity;
  .img-box {
    position: relative;
    height: 100vh;
    #building {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
    }
  }
  .building-btn {
    margin: auto 0 0 0;
  }
  .btn-box {
    margin: 0;
    transition: all .7s;
    transform: translateX(-150%);
    opacity: 0;
    .btn {
      background-color: #ffffff;
      color: #4a4a4a;
      &:hover {
        border-color: #fff;
      }
      &:before {
        border-color: transparent transparent transparent #4a4a4a;
      }
      &:after {
        background-color: #4a4a4a;
      }
    }
  }
  .bottom-options {
    .building-btn {
      position: fixed;
      left: 50px;
      bottom: 50px;
    }
    .building-filter {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      display: flex;
      right: 250px;
      bottom: 50px;
      position: fixed;
      button {
        border-radius: 50%;
        width: 70px;
        height: 70px;
        border: none;
        box-shadow: none;
        outline: none;
        cursor: pointer;
        transition-property: all;
        transition-duration: .9s;
        transform: translateX(250%);
      }
      .parking-btn {
        background-color: #ffffff;
        background-image: url(../assets/images/parking-icon.svg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: 60%;
        transition-delay: .6s;
      }
      .filter-btn {
        background-color: #232323;
        position: relative;
        margin-bottom: 23px;
        transition-delay: 1s;
        span {
          display: block;
          width: 24px;
          height: 2px;
          background: #fff;
          position: absolute;
          left: 50%;
          margin-left: -12px;
          &:after {
            content: '';
            position: absolute;
            top: -3px;
            width: 3px;
            height: 3px;
            border: 2px solid #fff;
            background-color: #232323;
            border-radius: 50%;
            transition: all .3s;
          }
          &:nth-child(1) {
            top: 27px;
            &:after {
              left: 3px;
            }
          }
          &:nth-child(2) {
            top: 35px;
            &:after {
              left: 15px;
            }
          }
          &:nth-child(3) {
            top: 44px;
            &:after {
              left: 7px;
            }
          }
        }
        &:hover {
          span {
            &:nth-child(1) {
              &:after {
                left: 13px;
              }
            }
            &:nth-child(2) {
              &:after {
                left: 5px;
              }
            }
            &:nth-child(3) {
              &:after {
                left: 17px;
              }
            }
          }
        }
      }
    }
  }
  .parkings {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    padding-right: 195px;
    transform: translateX(100%);
    transition: all .3s;
    width: 50%;
    &.active {
      transform: translateX(0);
    }
    @media screen and(max-width: 1024px) {
      &.active {
        width: auto;
        left: 0;
      }
    }
    @media screen and(max-width: 768px) {
      &.active {
        z-index: 99999;
        padding-right: 0;
        width: 100%;
        position: fixed;
      }
      .table {
        .tbody {
          .tr {
            flex-wrap: wrap;
            padding: 10px 0;
            .td {
              width: 50%;
              flex: 1 0 50%;
              padding: 5px 0;
            }
          }
        }
      }
    }
  }
  .table-box {
    height: 100vh;
    position: relative;
    .close {
      width: 20px;
      height: 20px;
      background: url(../assets/images/close-apms-icon.svg) no-repeat center center;
      background-size: 100%;
      position: absolute;
      top: 10px;
      right: 10px;
      cursor: pointer;
      z-index: 999;
    }
  }
  .table {
    width: 100%;
    height: 100vh;
    position: relative;
    .td, .th {
      border: none;
      text-align: center;
      text-transform: uppercase;
    }
    .thead {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      background-color: #232323;
      .tr {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
      }
      .th {
        color: #8d8d8d;
        font-family: 'Fira Sans', sans-serif;
        font-size: 11px;
        font-weight: 500;
        width: 100%;
        padding: 34px 0;
      }
    }
    .tbody {
      overflow-x: auto;
      height: 100%;
      background-color: #f8f8f8;
      .tr {
        border-bottom: 1px solid #e7e7e7;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        text-decoration: none;
        transition: all .3s;
        &:hover {
          background: #f3f3f3;
        }
        &:first-child {
          margin-top: 80px;
        }
        .td {
          color: #000000;
          font-size: 16px;
          font-weight: 600;
          width: 100%;
          padding: 40px 0;
          text-align: center;
          div {
            margin: auto;
          }
          .parking-lot {
            text-align: center;
            font-size: 14px;
          }
          .sqm {
            color: #8e8e8e;
            font-size: 16px;
            font-weight: 400;
          }
          .status {
            font-size: 11px;
            font-weight: 700;
            &.sold {
              color: #e22f2f;
            }
            &.reserved {
              color: #fa6a02;
            }
            &.available {
              color: #22a314;
            }
          }
        }
      }
    }
  }
  @media screen and(max-width: 1024px) {
    height: auto;
    min-height: 100vh;
    padding-right: 195px;
    .img-box {
      height: auto;
      width: 100%;
      #building {
        position: relative;
        left: inherit;
        right: inherit;
        top: inherit;
        bottom: inherit;
        background-size: cover;
        background-position: center center;
        // height: 50vh;
        overflow: hidden;
        canvas {
          // height: 50vh !important;
        }
      }
    }
    .bottom-options {
      position: relative;
      left: inherit;
      bottom: inherit;
      right: inherit;
      padding: 0;
      background: transparent;
      display: flex;
      flex-direction: column-reverse;
      justify-content: space-between;
      text-align: center;
      z-index: 200;
      .building-filter {
        flex-direction: row;
        background: #cfcfcf;
        right: inherit;
        bottom: inherit;
        position: inherit;
        padding-top: 20px;
        .filter-btn,
        .parking-btn {
          margin: 0 10px 20px 10px;
        }
      }
      .building-btn {
        width: 100%;
        position: relative;
        left: inherit;
        bottom: inherit;
        .btn-box {
          width: 100%;
          .btn {
            width: 100%;
            padding: 25px 20px;
            font-size: 12px;
            box-sizing: border-box;
          }
        }
      }
    }
  }
  @media screen and(max-width: 600px) {
    padding-right: 0px;
    // padding-top: 92px;
    // background: #232323;
    .mobile-building-title {
      padding-left: 10px;
      padding-right: 10px;
      padding: 0;
      h1 {
        color: #fff;
        font-family: 'Exo 2', sans-serif;
        font-size: 18px;
        font-weight: 600;
        text-transform: uppercase;
        text-align: center;
        margin-bottom: 20px;
        display: none;
      }
    }
  }
}
.entrances-mobile {
  padding: 10px;
  ul {
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    li {
      list-style: none;
      margin: 5px;
      a {
        display: block;
        border: 1px solid #fa6a02;
        background: #fa6a02;
        color: #fff;
        text-decoration: none;
        padding: 10px 10px;
        text-align: center;
        font-weight: 600;
        font-size: 14px;
        text-transform: uppercase;
        font-family: "Fira Sans";
      }
    }
  }
}
.building-view-header {
  z-index: 1000;
  @media screen and(max-width: 768px) {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
}
.active-component {
  .building-apartments {
    opacity: 1;
    .bottom-options .building-filter button,
    .btn-box {
      transform: translate(0);
      opacity: 1;
    }
  }
}
</style>
