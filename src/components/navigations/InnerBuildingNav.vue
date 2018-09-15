<template>
  <ul>
    <li><a href="#about" @click="scrollTo()">За сградата</a></li>
    <li><a href="#gallery" @click="scrollTo()">Галерия</a></li>
    <li><a href="#location" @click="scrollTo()">Локация</a></li>
    <li><a href="#news" @click="scrollTo()">Новини</a></li>
    <li class="btn-box"><a href="" class="btn">Виж схемата на блока</a></li>
  </ul>
</template>

<script>
export default {
  name: 'inner-building-nav',
  methods: {
    scrollTo (hash) {
      let anchorlinks = document.querySelectorAll('a[href^="#"]')
      for (let item of anchorlinks) {
        item.addEventListener('click', (e) => {
          let hashval = item.getAttribute('href')
          let target = document.querySelector(hashval)
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          })
          history.pushState(null, null, hashval)
          e.preventDefault()
        })
      }
    }
  }
}
</script>
