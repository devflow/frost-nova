<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <v-row class="ma-6">
          <v-col cols="12" sm="6">
            <v-text-field
              label="IP 주소"
              readonly
              v-model="myIp"
              append-outer-icon="mdi-paperclip"
              @click:append-outer="copyIp"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6">
            <v-text-field
              :rules="[() => !!serverPort || '필수로 입력해야합니다.', () => { var x = Number.parseInt(serverPort); if(x > 0 && x <= 65535) { return true } else { return '올바르지 않은 포트값 입니다.' } }]"
              ref="serverPort"
              label="포트 (1-65535, 기본값 : 8080)"
              placeholder="Placeholder"
              v-model="serverPort"
              :disabled="isServerRunning"
              required
            ></v-text-field>
          </v-col>
          <v-col sm="12">
            <v-text-field
              label="인증서 다운로드 URL (프록시 연결 후 다운로드 가능)"
              readonly
              append-outer-icon="mdi-paperclip"
              @click:append-outer="copyCaUrl"
              value="http://fn.page.link/ca.pem"
            ></v-text-field>
          </v-col>
        </v-row>

        <v-btn
          class="ma-2"
          :loading="serverLoading"
          :disabled="serverLoading"
          :color="`${ isServerRunning ? 'error' : 'secondary'}`"
          @click="turnOnServer"
        >
          <v-icon left dark>{{ isServerRunning ? 'mdi-wifi-off' : 'mdi-wifi' }}</v-icon>
          {{ isServerRunning ? '서버 끄기' : '서버 켜기' }}
        </v-btn>

      </v-col>
    </v-row>
    <v-snackbar v-model="copySnak" color="blue" top :timeout="3000">
      클립보드에 복사되었습니다.
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapFields } from "vuex-map-fields";
const { clipboard } = require('electron')
const publicIp = require("public-ip");

export default {
  name: "Home",
  components: {},
  data: () => ({
    serverLoading: false,
    myIp: "localhost",
    copySnak: false
  }),
  computed: {
    ver: function() {
      return "1.0";
    },
    ...mapFields(["isServerRunning"]),
    serverPort: {
      get() {
        return this.$store.state.serverPort;
      },
      set(value) {
        this.$store.dispatch("changeServerPort", value);
      }
    }
  },
  methods: {
    turnOnServer: function() {
      this.serverLoading = true;
      this.$electron.ipcRenderer.send("toggle-server");
    },
    copyCaUrl() {
      clipboard.writeText('http://fn.page.link/ca.pem')
      this.copySnak = true
    },
    copyIp() {
      clipboard.writeText(this.myIp)
      this.copySnak = true
    }
  },
  mounted() {
    this.$electron.ipcRenderer.on("server-state-changed", () => {
      this.serverLoading = false;
    });

    (async () => {
      this.myIp = await publicIp.v4();
    })();
  }
};
</script>
