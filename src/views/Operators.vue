<template>
  <v-container>
    <v-data-iterator
      disable-pagination
      :items="Object.values(chars)"
      hide-default-footer
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
    >
      <template v-slot:header>
        <v-toolbar dark dense class="mb-1">
          <template>
            <v-select
              v-model="sortBy"
              flat
              dark
              dense
              solo-inverted
              hide-details
              :items="keys"
              item-text="text"
              item-value="value"
              :label="$t('sort_by')"
            >
              <template slot="selection" slot-scope="data">{{ $t(data.item.text) }}</template>
              <template slot="item" slot-scope="data">{{ $t(data.item.text) }}</template>
            </v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" dense mandatory>
              <v-btn depressed dense :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn depressed dense :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>
      <template slot="no-data">
        <v-alert :value="true" type="error" class="ma-6" outlined>{{ $t('no_data') }}(</v-alert>
      </template>
      <template v-slot:default="props">
        <v-row>
          <v-col
            v-for="(char, ckey) in props.items"
            :key="'op_' + ckey"
            cols="12"
            sm="3"
            md="4"
            lg="3"
          >
            <template v-if="CharTable.hasOwnProperty(char.charId)">
              <v-card>
                <v-img
                  class="white--text align-end white"
                  height="120px"
                  :gradient="calcAp(char).tired ? 'to top right, rgba(255,55,55,.33), rgba(25,32,72,.7)' : (calcAp(char).resting ? 'to top right, rgba(55,55,55,.33), rgba(25,32,72,.7)' : '')"
                  :src="require('../assets/avatars/' + char.charId + '.png')"
                >
                  <v-chip
                    color="red"
                    class="ma-2"
                    style="position:absolute;top:0;"
                    v-if="calcAp(char).tired"
                  >
                    <v-avatar left>
                      <v-icon color="white">mdi-emoticon-sad</v-icon>
                    </v-avatar>
                    {{ $t('tired') }}
                  </v-chip>

                  <v-chip
                    color="blue"
                    class="ma-2"
                    style="position:absolute;top:0;"
                    v-if="calcAp(char).resting"
                  >
                    <v-avatar left>
                      <v-icon color="white">mdi-coffee</v-icon>
                    </v-avatar>
                    {{ $t('resting') }}
                  </v-chip>

                  <v-card-title
                    small
                    style="background: linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.6) 100%);"
                    class="pa-2 caption"
                  >{{ CharTable[char.charId].name }}</v-card-title>
                </v-img>
                <v-card-text class="text-center pa-2">
                  <template>
                    <v-progress-linear
                      height="25"
                      :color="((s) => s == 'rested' || s == 'resting' ? 'blue' : (s == 'tired' ? 'red' : (s == 'working' ? 'orange' : 'grey')))(calcAp(char).state)"
                      :value="(calcAp(char).display / 24) * 100"
                    >
                      <span>{{ pad(calcAp(char).display) }} / 24</span>
                    </v-progress-linear>
                    <v-chip
                      small
                      pill
                      fluid
                      class="mt-2 max-width-chip"
                      v-if="char.changeScale != 0 && char.ap < MAX_AP && calcAp(char).time > 0"
                    >
                      <v-avatar left>
                        <v-icon>mdi-clock-outline</v-icon>
                      </v-avatar>
                      <countdown
                        :time="calcAp(char).time"
                        @end="notiEnd(CharTable[char.charId].name, char.changeScale < 0 ? 'work' : 'rest')"
                      >
                        <template
                          v-slot:default="props"
                        >{{ pad(props.hours) }}:{{ pad(props.minutes) }}:{{ pad(props.seconds) }}</template>
                      </countdown>
                    </v-chip>
                  </template>
                </v-card-text>
              </v-card>
            </template>
          </v-col>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
import { CharTable } from "../plugins/ak_data";
var moment = require("moment");
const MAX_AP = 8640000;

export default {
  name: "Operators",
  data: () => ({
    CharTable,
    sortBy: "ap",
    sortDesc: false,
    keys: [
      { text: "ap", value: "ap" },
      { text: "name", value: "name" }
    ],
    MAX_AP
  }),
  computed: {
    ...mapFields({
      chars: "playerData.building.chars"
    })
  },
  methods: {
    pad: n => (n < 10 ? "0" + n : n),
    calcAp(v) {
      // <-- need 2 move on proxy.js
      let calcedAp = v.ap + (moment().unix() - v.lastApAddTime) * v.changeScale; // offset
      let display = Math.max(
        Math.min(24, Math.round((calcedAp / MAX_AP) * 24)),
        0
      );
      let ret = {
        calcedAp,
        display,
        tired: display < 1,
        resting: v.changeScale > 0 && calcedAp < MAX_AP,
        rested: v.changeScale > 0 && calcedAp == MAX_AP,
        working: display > 0 && v.changeScale < 0,
        state: "rested",
        time: Math.max(
          0,
          ((v.changeScale < 0 ? calcedAp : MAX_AP - calcedAp) /
            Math.abs(v.changeScale)) *
            1000
        )
      };

      ["tired", "resting", "rested", "working"].some(function(v) {
        if (ret[v]) {
          ret.state = v;
          return true;
        }
      });

      return ret;
    },
    notiEnd(cName, type) {
      new Notification("FrostNova", {
        body: this.$t(type == "work" ? "x_is_tired" : "x_is_rested", {
          name: cName
        })
      });
    }
  }
};
</script>