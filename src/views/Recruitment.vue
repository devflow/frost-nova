<template>
  <v-container>
    <div v-if="Object.values(slots).every((e) => e.state == -1)">
      <v-alert type="error" class="ma-6" outlined>{{ $t('no_data') }}</v-alert>
    </div>
    <div v-if="Object.values(slots).some((e) => e.state != -1)">
      <v-row class="mx-2">
        <v-switch v-model="hideName" :label="$t('hide_op_name')" class="mr-4"></v-switch>
        <v-switch v-model="onlyOver4Star" :label="$t('only_over_4star')"></v-switch>
      </v-row>
      <v-row>
        <v-expansion-panels accordion multiple>
          <v-expansion-panel v-for="i in [0,1,2,3]" :key="'sl' + i">
            <v-expansion-panel-header>
              <v-list-item dense :disabled="slots[i].state == 3">
                <v-list-item-avatar :color="slots[i].state == 1 ? 'grey' : 'blue'">{{ i + 1 }}</v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline">
                    <countdown
                      v-show="slots[i].state == 2"
                      :time="((slots[i].realFinishTs - now) * 1000)"
                    >
                      <template
                        slot-scope="props"
                      >{{ pad(props.hours) }}:{{ pad(props.minutes) }}:{{ pad(props.seconds) }}</template>
                    </countdown>
                    <span v-show="slots[i].state == 1">{{ $t('ready_recruit') }}</span>
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <v-row v-show="slots[i].selectTags.length > 0" class="ma-0">
                      <v-chip
                        class="mr-2"
                        label
                        dense
                        small
                        v-for="(tg, x) in slots[i].selectTags"
                        :key="'sl' + i + '-t-' + x"
                        :color="tg.pick == 1 ? 'blue' : ''"
                      >{{ tagList.find((e) => e.id == tg.tagId).name }}</v-chip>
                    </v-row>
                    <v-row v-show="slots[i].selectTags.length == 0" class="ma-0">
                      <v-chip
                        class="mr-2"
                        label
                        dense
                        small
                        v-for="(tg, x) in slots[i].tags"
                        :key="'sl' + i + '-t-' +x"
                        color="blue"
                        text-color="white"
                      >{{ tagList.find((e) => e.id == tg).name }}</v-chip>
                    </v-row>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template v-for="(v, e) in slots[i].matched">
                <div
                  :key="'sl' + i + '-m-' + e"
                  v-show="!onlyOver4Star || (onlyOver4Star && v.perfect)"
                >
                  <v-row>
                    <v-chip
                      class="mr-2 mb-2"
                      label
                      small
                      v-show="v.perfect"
                      color="orange"
                      text-color="white"
                    >{{ $t('perfect_group') }}</v-chip>
                    <v-chip
                      class="mr-2 mb-2"
                      label
                      small
                      v-for="(t, tk) in v.tags"
                      :key="'sl' + i + '-m-' + e + '-' + tk"
                      color="white"
                      text-color="blue"
                    >{{ t.name }}</v-chip>
                  </v-row>
                  <v-row class="mb-2">
                    <template v-for="(c, ci) in v.chars">
                      <div v-show="hideName" :key="'sl' + i + '-m-' + e + '-' + ci + 'c'">
                        <v-tooltip bottom>
                          <template v-slot:activator="{ on }">
                            <v-avatar
                              left
                              color="white"
                              size="48"
                              :style="'border: 2px solid ' + StarColor[c.level].bc + ' !important'"
                              class="mr-2 mb-2"
                              v-on="on"
                            >
                              <v-img :src="require('../assets/chars/' + c.name_en + '.png')"></v-img>
                            </v-avatar>
                          </template>
                          <span>{{ c.name }}</span>
                        </v-tooltip>
                      </div>
                      <v-chip
                        border="top"
                        :color="StarColor[c.level].b"
                        :text-color="StarColor[c.level].t"
                        pill
                        default
                        :key="'sl' + i + '-m-' + e + '-' + ci + 'b'"
                        class="mr-2 mb-2"
                        v-show="!hideName"
                      >
                        <v-avatar left color="white" size="64">
                          <v-img :src="require('../assets/chars/' + c.name_en + '.png')"></v-img>
                        </v-avatar>
                        <span v-show="!hideName">{{ c.name }}</span>
                      </v-chip>
                    </template>
                  </v-row>
                </div>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { tagList, StarColor } from "../plugins/ak_data";
var moment = require("moment");

export default {
  name: "Recruitment",
  comments: {},
  data: () => ({
    tagList,
    StarColor,
    hideName: false,
    onlyOver4Star: false
  }),
  computed: {
    now: () => moment().unix(),
    ...mapFields({
      slots: "playerData.recruit.normal.slots"
    })
  },
  watch: {},
  methods: {
    pad: n => (n < 10 ? "0" + n : n)
  }
};
</script>