import { reactive } from 'vue';
export const rippleStore = reactive({
    enabled: false,
    toggle() {
        this.enabled = !this.enabled;
    }
})