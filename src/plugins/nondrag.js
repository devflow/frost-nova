
const NonDrag = {
    install(Vue) {
        Vue.mixin({
            // Anything added to a mixin will be injected into all components.
            // In this case, the mounted() method runs when the component is added to the DOM.
            mounted() {
                console.log('Mounted!');
            }
        });
    }
};

export default NonDrag;