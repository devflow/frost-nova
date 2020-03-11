<template>
    <p>user : <span v-text="nickName"></span></p>
</template>

<script>
import { mapFields } from 'vuex-map-fields';

export default {
    name: "User",
    components: {},
    computed: {
    ...mapFields([
      'playerData.status.nickName',
    ]),
  },
}
</script>