new Vue({
    el: '#app',
    data: {
        gameInProgress: false,
        playerHealth: 100,
        monsterHealth: 100,
        winner: '',
        turns: []
    },
    methods: {
        startGame: function() {
            this.gameInProgress = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function(special = false) {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits monster for ' + damage
            });
            if (this.checkWin()){
                return;
            } else {
                this.monsterAttacks();
            }
        },
        specialAttack: function() {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()){
                return;
            } else {
                this.monsterAttacks();
            }
        },
        heal: function() {
            if (this.playerHealth < 90) {
                this.playerHealth += 10;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals himself for ' + 10
                });
            } else {
                this.playerHealth = 100;
                this.turns.unshift({
                    isPlayer: true,
                    text: 'Player heals himself for ' + (100 - this.playerHealth)
                });
            }
            this.monsterAttacks();
            
        },
        giveUp: function() {
            this.gameInProgress = false;
        },
        calculateDamage: function(min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        monsterAttacks: function() {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        checkWin: function() {
            if (this.monsterHealth <= 0) {
                if(confirm('You won! New game?')) {
                    this.startGame();
                } else {
                    this.gameInProgress = false;
                }
                return true;
            } else if (this.playerHealth <= 0) {
                if(confirm('You lost! New game?')) {
                    this.startGame();
                } else {
                    this.gameInProgress = false;
                }
                return true;
            }
            return false;
        }
    }
});