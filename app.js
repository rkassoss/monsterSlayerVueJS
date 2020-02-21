new Vue({
    el: '#app',
    data: {
        gameInProgress: false,
        playerImpact: 0,
        monsterImpact: 0,
        playerHealth: 100,
        monsterHealth: 100,
        winner: '',
        turnLog: []
    },
    methods: {
        turn: function(playerRange = 10, playerAttacks = true) {
            var vm = this;
            vm.playerImpact = getRandomInt(playerRange);
            vm.monsterImpact = getRandomInt(10);
            
            if(playerAttacks) {
                vm.monsterHealth = vm.monsterHealth - vm.playerImpact;
                vm.playerHealth  = vm.playerHealth - vm.monsterImpact;
                vm.turnLog.push({
                    monster: "Monster hits Player for " + vm.monsterImpact, 
                    player: "Player hits Monster for " + vm.playerImpact
                });
            } else {
                vm.playerHealth = vm.playerHealth + vm.playerImpact - vm.monsterImpact;
                vm.turnLog.push({
                    monster: "Monster hits Player for " + vm.monsterImpact, 
                    player: "Player heals himself for " + vm.playerImpact
                });
            }
            if ( vm.playerHealth < 0 | vm.playerHealth == 0) {
                vm.winner = 'monster';
                alert('You loose :( Try again?');
                vm.restart();
            } else if (vm.monsterHealth < 0 | vm.monsterHealth == 0) {
                vm.winner = 'player';
                alert('You win! Try again?');
                vm.restart();
            }
        },
        restart: function() {
            var vm = this;
            vm.playerHealth = 100;
            vm.monsterHealth = 100;
            vm.gameInProgress = false;
            vm.turnLog = [];
        }
    }
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}