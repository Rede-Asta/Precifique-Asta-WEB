import Vue from 'vue';

declare module 'vue/types/vue' {
    interface Vue {
        $setGtm(options: GtmProps);
    }
}

interface GtmProps {
    label?: string;
    action?: string;
    category?: string;
    event?: string;
    nomeStep?: string;
}

export default {
    install(Vue) {
        Vue.prototype.$setGtm = function(options: GtmProps) {
            window.dataLayer?.push({event: options.event || 'custom_event', ...options});
        };
    },
};
