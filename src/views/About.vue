<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col class="text-center">
        <p class="display-3 font-weight-thin">FrostNova</p>
        <p class="font-weight-thin">명일방주 패킷 분석기</p>
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
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>사용방법
        </v-banner>
        <div class="ma-4">
          먼저, 프로스트노바의 서버를 켜요. 그리고 메인에 있는 IP주소와 포트를 이용해 게임을 실행하는 플랫폼(안드로이드, iOS, 앱플레이어, ..)에 프록시(Proxy) 설정을 해줘요. 그리고 인증서 URL를 다운로드해서 인증서를 설치하고 게임을 실행합니다.
          <br />
          <br />처음사용시에는 반드시 게임을 종료하고, 설정 후 다시 게임을 시작해주는 것이 좋아요. 게임 시작 이후 받을 수 있는 데이터는 정해져 있기 때문에 실제 게임과 데이터가 매우 상이할 수 있어요. 이건 명일방주가 그렇게 만들어졌기 때문에 어쩔 수 없는 부분이네요. 데이터가 좀 부정확하다 싶으면 게임을 다시시작하는 것도 나쁘지 않아요.
          <br /><br />쉽게 설명하자면, 프로스트 노바와 명일방주가 항상 같이 실행되어 있으면 대부분은 정확해요.
        </div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>이 프로그램쓰면 제재 당하나요?
        </v-banner>
        <div
          class="ma-4"
        >확답은 못드리겠네요. 하지만 제재할 근거가 타당치 못합니다. 그리고 막지 않는 이상 이 프로그램 사용하는지 모를 것 같아요. 그래도 역시 책임은 사용자에게 있겠죠?</div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>게임 시작이 안돼요. (초기화 오류 등)
        </v-banner>
        <div class="ma-4">
          1. 서버가 켜져있는지 확인해요.
          <br />2. 인증서를 설치 해야함. 인증서는 서버가 실행되고 부터 다운로드가 가능하며, 프로스트노바를 새로 설치했다면 인증서를 삭제하고 다시 인증서를 설치해요.
        </div>
      </v-col>

      <v-col sm="12">
        <v-banner single-line full-width>
          <v-icon slot="icon" color="warning" size="28">mdi-help-circle-outline</v-icon>데이터 업데이트가 안돼요.
        </v-banner>
        <div class="ma-4">
          프록시 설정을 확인하세요. 프록시가 잘 설정됐는지는 인증서가 정상적으로 다운로드 가능한지 여부로 확인이 가능해요. (같은 플랫폼에서 확인해야해요. 휴대폰일 경우, 휴대폰 내 브라우저로 확인)
        </div>
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
    openUrl(u) { shell.openExternal(u) }
  }
};
</script>