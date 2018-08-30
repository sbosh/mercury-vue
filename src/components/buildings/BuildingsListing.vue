<template>
  <div class="buildings-listing">
    <buildings-listing-item
    v-for="building in buildings"
    :key="building.id"
    :title="building.title"
    :bg="building.image"
    :link="building.link"
    :fullListing="fullListing" />
  </div>
</template>

<script>
import BuildingsListingItem from './BuildingsListingItem'
export default {
  name: 'buildings-listing',
  components: {
    'buildings-listing-item': BuildingsListingItem
  },
  props: ['buildings', 'fullListing']
}
</script>
