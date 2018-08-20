<template>
  <div>
    {{name}}
    <!-- <Button></Button> -->
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
// import Button from './components/Button.vue'
export default Vue.extend({
  data(){
    return {
      name: 'app'
    }
  },
  // components: {
  //   Button
  // }
})
</script>
