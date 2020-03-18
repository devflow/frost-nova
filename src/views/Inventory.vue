<template>
  <v-container>
    <p class="ma-4">
      {{ $t('inv_help1') }}
      <v-btn text @click="goPS">
        {{ $t('inv_pg_planner') }}
        <v-icon>mdi-link</v-icon>
      </v-btn>
      {{ $t('inv_help2') }}
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
    <v-snackbar v-model="copySnak" color="blue" top :timeout="3000">{{ $t('copied_to_clipboard') }}</v-snackbar>
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