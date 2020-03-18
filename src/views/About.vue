<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <p class="display-3 font-weight-thin">{{ $t('app_name') }}</p>
        <p class="font-weight-thin">{{ $t('app_intro') }}</p>
        <p class="font-weight-thin">Made with ❤ by devflow</p>
        <p>
          <v-btn icon @click="openUrl('https://github.com/devflow/frost-nova')">
            <v-icon>mdi-github</v-icon>
          </v-btn>
          <v-btn icon @click="openUrl('https://gall.dcinside.com/mgallery/board/lists?id=mibj')">
            <v-icon>mdi-post</v-icon>
          </v-btn>
        </p>
      </v-col>
    </v-row>

    <v-row class="ma-6">
      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>
          {{ $t('how_to_use') }}
        </v-banner>
        <div class="ma-4" v-html="$t('how_to_use_detail')"></div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>
          {{ $t("is_banned") }}
        </v-banner>
        <div class="ma-4" v-html="$t('is_banned_detail')"></div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>
          {{ $t('cant_start_game') }}
        </v-banner>
        <div class="ma-4" v-html="$t('cant_start_game_detail')"></div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>
          {{ $t('not_update_data') }}
        </v-banner>
        <div class="ma-4" v-html="$t('not_update_data_detail')"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { shell } = require("electron");

export default {
  name: "About",
  data: () => ({}),
  methods: {
    openUrl(u) {
      shell.openExternal(u);
    }
  }
};
</script>