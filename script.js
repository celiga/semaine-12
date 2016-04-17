$(document).ready(function () {
        
    var previousPlayer = '';
    var turns = 0;
    var player = '';
    var $reset = $('#reset');
    var squares = $('#game div');
    var message = $('#message');
    var attempts = [];
    var solutions = [
        ['x1y1','x2y1','x3y1'],
        ['x1y2','x2y2','x3y2'],
        ['x1y3','x2y3','x3y3'],
        ['x1y1','x1y2','x1y3'],
        ['x2y1','x2y2','x2y3'],
        ['x3y1','x3y2','x3y3'],        
        ['x1y1','x2y2','x3y3'],
        ['x1y3','x2y2','x3y1'],
    ];
    
    function play(e){
        if(!e.hasClass('nogo') || turns == 0){
            message.empty().removeClass();
            player = (turns == 0 || previousPlayer == 2)?'1':'2';
            //attempts.push(e.attr('id'));
            previousPlayer = player;
            turns++;
            e.addClass('nogo player'+player);
        }else{
            message.removeClass().addClass('alert alert-danger').html('Déjà jouée !');
        }
    }
    
    function reset(){
        previousPlayer = '';
        turns = 0;
        player = '';
        attempts = [];
        squares.removeClass();
    }
        
    function check(){
        attempts = [];    
        $('.player'+previousPlayer).each(function(i, value){
            attempts.push($(this).attr('id'));
        });
        $.each(solutions, function(i, solution){
            if($(solution).not(attempts).length == 0){
                message.removeClass().addClass('alert alert-success').html('Joueur '+previousPlayer+' gagne !');
                return false;
            }
        });
    }
    
    squares.click(function(e){
        play($(this));
        if(turns >= 5){
            check();
        }
    });
    
    $reset.click(function(){
        reset();
    });
    
});