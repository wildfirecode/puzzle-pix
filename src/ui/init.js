import { highlightDebrisPairs, autoDragDrop, resetUser } from "../user/main"
import { startCountdown } from "../time"

export let appUI
export const initUI = () => {
  appUI = new Vue({
    el: '#app',
    data: {
      seen: false,
      resetSeen: false,
      countdown: 0
    },
    methods: {
      highlight: function () {
        highlightDebrisPairs()
      },

      flip: function () {
        autoDragDrop()
      },

      reset: function () {
        resetUser();
        startCountdown();
        hideResetButton();
      }

    }
  })

}

export const updateCountdown = (val) => {
  appUI.countdown = val;
}

export const showUI = () => {
  appUI.seen = true;
}
export const hideUI = () => {
  appUI.seen = false;
}

export const showResetButton = () => {
  appUI.resetSeen = true;
  appUI.seen = false;
}

export const hideResetButton = () => {
  appUI.resetSeen = false;
  showUI();
}
