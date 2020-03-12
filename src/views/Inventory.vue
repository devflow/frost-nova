<template>
  <v-container>
    <p class="ma-4">
      해당 내용을
      <v-btn text @click="goPS">
        명일방주 계획기
        <v-icon>mdi-link</v-icon>
      </v-btn>의 불러오기에 붙여 넣으면 됩니다.
    </p>
    <v-col cols="12" md="12">
      <v-text-field
        readonly
        outlined
        single-line
        :value="inventoryPSJson"
        @click:append-outer="copyJson"
        append-outer-icon="mdi-paperclip"
      ></v-text-field>
    </v-col>
    <v-snackbar v-model="copySnak" color="blue" top :timeout="3000">클립보드에 복사되었습니다.</v-snackbar>
  </v-container>
</template>

<script>
const { shell, clipboard } = require("electron");
import { mapGetters } from "vuex";

export default {
  name: "Inventory",

  data: () => ({
      copySnak: false
  }),

  computed: {
    ...mapGetters(["inventoryPSJson"])
  },

  methods: {
    goPS() {
      shell.openExternal("https://penguin-stats.io/planner");
    },
    copyJson() {
        this.copySnak = true
      clipboard.writeText(this.inventoryPSJson);
    }
  }
};
</script>