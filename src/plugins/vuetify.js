import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
            dark: {
                primary: '#7ed6df',
                secondary: '#22a6b3',
                accent: '#dff9fb',
                error: '#eb4d4b',
            },
        },
    },
});
