import { reactive } from 'vue';
import type { RippleState } from '@/types/store';

export const rippleStore = reactive<RippleState>({
    enabled: false,
    toggle() {
        this.enabled = !this.enabled;
    }
})
