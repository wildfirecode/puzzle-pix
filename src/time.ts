import { CountDown } from "teddi-lodash";
import { updateCountdown } from "./ui";
import { onUserTimeout } from "./user/main";

const countdown = new CountDown({
    intervalDelay: 1000,

    onTick: (total) => {
        updateCountdown(Math.ceil(total / 1000))
    },
    
    onComplete: () => {
        alert('时间到，游戏结束');
        onUserTimeout();
    }

});

export const startCountdown = () => {
    countdown.start({
        date: Date.now() + 3600 * 1000,
    });
}

export const stopCountdown = () => {
    countdown.stop();
}
