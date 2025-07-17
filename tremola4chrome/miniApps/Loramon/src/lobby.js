class Lobby {
    player1;
    player2;
    turn;
    lobbyId;
    team1 = [0, 0, 0];
    team2 = [0, 0, 0];
    currentPlayer1;
    currentPlayer2;
    active;

    constructor(player1, player2, lobbyId) {
        this.player1 = player1;
        this.player2 = player2;
        this.turn = player1;
        this.lobbyId = lobbyId;
        this.active = true;
        this.turn = player1;
        console.log("new lobby created ", player1, player2);
        console.log("players turn: ", this.turn);
    }

    make_move(player) {
        if (player == this.player1) {
            this.turn = this.player2;
        } else if (player == this.player2) {
            this.turn = this.player1;
        }
    }

    set_turn(player){
        if (player == this.player1) {
            this.turn = this.player1;
        } else if (player == this.player2) {
            this.turn = this.player2;
        }
    }

    get_turn(){
        return this.turn;
    }

    update_team_1(loramon, index){
        this.team1[index] = loramon;
    }

    update_team_2(loramon, index){
        this.team2[index] = loramon;
    }

    decrease_hp(loramon, target){
        loramon.attack(target);
    }

    get_team1(){
        return this.team1;
    }

    get_team2(){
        return this.team2;
    }

    set_team1(team){
        this.team1 = team;
    }

    set_team2(team){
        this.team2 = team;
    }

    get_player1_id(){
        return this.player1;
    }

    get_player2_id(){
        return this.player2;
    }    

    get_team_by_id(player){
        if (player == this.player1){
            return this.team1;
        } else if (player == this.player2){
            return this.team2;
        }
        return;
    }

    set_team_by_id(player, team){
        if (player == this.player1){
            this.team1 = team;
            this.currentPlayer1 = team[0];
        } else if (player == this.player2){
            this.team2 = team;
            this.currentPlayer2 = team[0];
        }
        return;
    }

    set_loramon_by_id(player, loramon, index){
        if (player == this.player1){
            this.update_team_1(loramon, index);
            if (index == 0) {
                this.currentPlayer1 = loramon;
            }
        } else if (player == this.player2){
            this.update_team_2(loramon, index);
                        if (index == 0) {
                this.currentPlayer2 = loramon;
            }
        }
        return;       
    }

    return_other_id(player) {
        if (player == this.player1) {
            return this.player2;
        } else if (player == this.player2) {
            return this.player1;
        } else {
            console.log("invalid ID provided");
            return;
        }
    }

    set_current_player1(loramon){
        this.currentPlayer1 = loramon;
    }

    set_current_player2(loramon){
        this.currentPlayer2 = loramon;
    }    

    set_lobby_status(bool){
        this.active = bool;
    }

}