<template>
  <div class="main-content" v-if="building">
    <mq-layout mq="md+" class="building-view-header"><navinner-component :navTitle="building['title_' + $i18n.locale]" /></mq-layout>
    <div class="building-apartments">
      <div class="img-box">
        <div id="building"></div>
      </div>
      <filtered-apartments
        @clicked="isFiltred = false"
        :isFiltred="isFiltred"
        :priceFrom="priceFrom"
        :priceTo="value"
        :rooms="rooms"
        :available="available" />
      <all-apartments :apartmentsActive="apartmentsActive" @clicked="() => apartmentsActive = false" />
      <div class="filters" v-if="priceFrom" v-bind:class="{ active: filterActive }">
        <div class="close" @click="filterActive = false"></div>
        <div class="filter-row">
          <div class="filter-box">
            <div class="text">{{ $t('only_available') }}:</div>
            <div class="input-field">
              <input type="checkbox" id="only_available" name="available" class="checkbox" v-model="available" />
              <label for="only_available"> </label>
            </div>
          </div>
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
              <div class="min">5 000</div>
              <vue-slider
                :show="show"
                ref="slider"
                v-model="value"
                :width="400"
                formatter="{value} euro"
                :min="priceFrom"
                :max="300000"
                :interval="5000" />
              <div class="max">300 000</div>
            </div>
          </div>
          <div class="filter-box">
            <input type="submit" class="filter-btn" @click="isFiltred = !isFiltred" />
          </div>
        </div>
      </div>
      <div class="bottom-options">
        <div class="building-btn">
          <div class="btn-box"><router-link :to="'/' + lang + '/' + building.id + '/' + building['slug_' + $i18n.locale]" class="btn">{{ $t('building_information') }}</router-link></div>
        </div>
        <div class="building-filter">
          <button class="filter-btn" @click="() => {
            filterActive = !filterActive
            show = !show
            }">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <button class="parking-btn" @click="apartmentsActive = !apartmentsActive"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import vueSlider from 'vue-slider-component'
import NavinnerComponent from '@/components/layout/NavinnerComponent'
import FilteredApartments from '@/components/buildings/FilteredApartments'
import AllApartments from '@/components/buildings/AllApartments'
/* eslint-disable no-undef */
export default {
  name: 'building-view',
  components: { NavinnerComponent, vueSlider, FilteredApartments, AllApartments },
  data () {
    return {
      show: false,
      value: 5000,
      available: true,
      apartmentsActive: false,
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
      isInit: false
    }
  },
  mounted () {
    if (this.building) {
      this.initCanvas()
    }
  },
  watch: {
    building () {
      this.initCanvas()
    },
    show (val) {
      if (val) {
        this.$nextTick(() => this.$refs.slider.refresh())
      }
    }
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
    preloadGame () {
      this.game.load.image('starlight', this.$store.state.buildings.building.image)
    },
    createGame () {
      this.game.stage.disableVisibilityChange = true
      this.game.tweens.frameBased = true
      this.game.time.advancedTiming = false
      this.game.config.forceSetTimeOut = false
      this.game.forceSingleUpdate = false

      this.scaleGame()

      this.background = this.game.add.image(0, 0, 'starlight')

      this.building.entrances.data.forEach(entrance => {
        const floors = entrance.floors.data
        floors.forEach((floor, index) => {
          let coords = floor.coords.split(', ').map(f => Number(f))
          let poly = new Phaser.Polygon(coords)
          let graphics = this.game.add.graphics(0, 0)

          graphics.inputEnabled = true
          graphics.input.useHandCursor = true

          graphics.events.onInputDown.add(this.onDown(entrance['slug_' + this.$i18n.locale], floor['slug_' + this.$i18n.locale]), this)
          graphics.events.onInputOver.add(this.onOver(index, floor.id), this)
          graphics.events.onInputOut.add(this.onOut(index), this)

          graphics.alpha = 0
          graphics.beginFill(0xfa6a02)
          graphics.drawPolygon(poly.points)
          graphics.endFill()

          this.polygons.push(graphics)
        })
      })
    },
    onDown (entranceSlug, florSlug) {
      return () => {
        this.$router.push({ name: 'building-inner-floor', params: { slug: entranceSlug, floorId: florSlug } })
      }
    },
    onOver (index, id) {
      return () => {
        console.log(id)
        this.game.add.tween(this.polygons[index]).to({ alpha: 0.5 }, 200, 'Linear', true)
      }
    },
    onOut (index) {
      return () => {
        this.game.add.tween(this.polygons[index]).to({ alpha: 0 }, 200, 'Linear', true)
      }
    },
    scaleGame () {
      this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL
      this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

      Phaser.Canvas.setImageRenderingCrisp(this.game.canvas)
      Phaser.Canvas.setSmoothingEnabled(this.game.context, false)

      this.game.antialias = false
      this.game.scale.refresh()
    },
    byId (e) {
      return document.getElementById(e)
    }
  },
  computed: {
    lang () {
      return this.$i18n.locale
    },
    ...mapState({
      apartments: state => state.apartments.all,
      floors: state => state.floors.all,
      building: state => state.buildings.building
    })
  }
}
</script>

<style lang="scss">
canvas {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.tooltip {
  .tooltip-inner {
    background: #fff;
    padding: 15px;
    color: #000;
  }
}
.building-apartments {
  .img-box {
    position: relative;
    height: 100vh;
    width: 100vw;
    #building {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
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
}
.building-apartments {
  overflow: hidden;
  height: 100vh;
  position: relative;
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
    position: absolute;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 235px 45px 40px;
    z-index: 200;
    .building-filter {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
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
  .all-apartments {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 9999;
    padding-right: 195px;
    transform: translateX(100%);
    transition: all .6s;
    width: 50%;
    &.active {
      transform: translateX(0);
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
          .number {
            width: 33px;
            height: 33px;
            border-radius: 50%;
            border: 1px solid #979797;
            text-align: center;
            line-height: 34px;
            font-size: 13px;
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
  @media screen and(max-width: 768px) {
    height: auto;
    .img-box {
      height: auto;
      width: 100%;
      #building {
        position: relative;
        left: inherit;
        right: inherit;
        top: inherit;
        bottom: inherit;
      }
    }
    .bottom-options {
      position: relative;
      left: inherit;
      bottom: inherit;
      right: inherit;
      padding: 20px 25px;
      background: #000;
    }
  }
}
.building-view-header {
  z-index: 1000;
}
.active-component {
  .building-apartments {
    .bottom-options .building-filter button,
    .btn-box {
      transform: translate(0);
      opacity: 1;
    }
  }
}
</style>
