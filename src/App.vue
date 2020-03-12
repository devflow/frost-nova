<template>
  <v-app app> 
    <v-app-bar
      app
      fixed
      color="#111111"
      dark
      shrink-on-scroll
      prominent
      dense
      :src="require('./assets/x_god_ribyul.jpg')"
      scroll-target="#st"
      style="-webkit-app-region:drag"
    >
      <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(80,80,80,.9), rgba(25,32,72,.7)"></v-img>
      </template>

      <v-btn class="nd" icon tile @click="closeApp()">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-toolbar-title class="font-weight-thin">FrostNova</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        class="nd"
        :close-on-content-click="false"
        max-height="70%"
        transition="slide-y-transition"
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn icon tile color="white" v-on="on" class="nd">
            <v-icon>mdi-bell</v-icon>
          </v-btn>
        </template>
        
        <v-list class="nd" nav dense>
          <v-subheader>알림</v-subheader>
          <v-list-item v-show="messages.length == 0">
            <v-list-item-content>
              <v-list-item-title>
                알림이 없습니다
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item v-for="(item, i) in messages" dense :key="i">
            <v-list-item-content>
              <v-list-item-title>
                <v-icon v-text="item.icon" small></v-icon>
                {{ item.msg }}
              </v-list-item-title>
              <v-list-item-subtitle v-text="item.at"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn icon @click="deleteMessage(i)">
                <v-icon small>mdi-close</v-icon>
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon tile class="nd">
        <v-icon
          :class="{ 'go-spin' : isServerRunning }"
          :color="`${ isServerRunning ? 'red' : 'white'}`"
        >mdi-sync</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs align-with-title class="nd">
          <v-tab to="/">메인</v-tab>
          <v-tab to="/recruitment">공개모집</v-tab>
          <v-tab to="/operators">오퍼레이터</v-tab>
          <v-tab to="/inventory">인벤토리</v-tab>
          <v-tab to="/about">도움말</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>

    <v-sheet app id="st" class="overflow-y-auto">
      <v-content>
        <keep-alive include="Home,Recruitment,Operators">
          <router-view></router-view>
        </keep-alive>
      </v-content>
    </v-sheet>

    <v-footer app :color="(nowTs() - lastUpdatedAt) > 21600 ? 'red' : ''">
      <template v-if="(nowTs() - lastUpdatedAt) > 21600">
        <span>갱신이 필요합니다.</span>
      </template>
      <template v-else>
        <span>갱신 : {{ lastUpdate }} - {{ nickName }}</span>
      </template>
    </v-footer>

    <v-snackbar v-model="infoSnack">
      {{ sbInfoMsg }}
      <v-btn text @click="infoSnack = false">닫기</v-btn>
    </v-snackbar>

    <v-snackbar color="red" v-model="errorSnack">
      {{ sbErrorMsg }}
      <v-btn text @click="errorSnack = false">닫기</v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapFields } from 'vuex-map-fields';
import { mapGetters } from 'vuex';
const remote = require('electron').remote
var moment = require("moment");

export default {
  name: "App",
  components: {},

  data: () => ({
    drawer: null,
    infoSnack: false,
    sbInfoMsg: "",
    errorSnack: false,
    sbErrorMsg: "",
    messages: []
  }),

  computed: {
    ...mapFields([
      'isServerRunning',
      'lastUpdatedAt',
      'playerData.status.nickName',
    ]),
    ...mapGetters(["lastUpdate"])
  },

  created() {
    this.$vuetify.theme.dark = true;
  },

  mounted() {
    this.$electron.ipcRenderer.on("message", (s, p) => {
      var icon = "mdi-information-outline",
        color = "primary";

      if (p.type == "info") {
        this.sbInfoMsg = p.msg;
        this.infoSnack = true;
      } else {
        this.sbErrorMsg = p.msg;
        this.errorSnack = true;
        icon = "mdi-alert-circle-outline";
        color = "error";
      }

      this.messages.unshift({
        msg: p.msg,
        icon,
        color,
        at: moment().format("MM/DD HH:mm:ss")
      });
    });
  },

  methods: {
    nowTs: () => moment().unix(),
    deleteMessage(i) {
      this.messages.splice(i, 1)
    },
    deleteAllMessages() {
      this.messages.splice(0, this.messages.length)
    },
    closeApp() {
      remote.getCurrentWindow().close()
    }
    
  }
};
</script>
