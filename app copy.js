new Vue({
    el: '#app',
    data: {
        gameInProgress: false,
        playerHealth: '100%',
        monsterHealth: '100%',
        winner: ''
    },
    methods: {
        attack: function() {
            var vm = this;
            playerWidth = 100, monsterWidth = 100;
            var attackTime = setInterval(function() {
                playerWidth = playerWidth - getRandomInt(10);
                monsterWidth = monsterWidth - getRandomInt(10);
                vm.playerHealth = playerWidth + '%';
                vm.monsterHealth = monsterWidth + '%';
                if (playerWidth < 0 | playerWidth == 0) {
                    clearInterval(attackTime);
                    vm.winner = 'monster';
                } else if (monsterWidth < 0 | monsterWidth == 0) {
                    vm.winner = 'player';
                    clearInterval(attackTime);
                }
            }, 500);
        }
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}