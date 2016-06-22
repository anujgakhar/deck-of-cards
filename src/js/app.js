$(document).ready(function() {
    var deck = new Deck();

    $('button').on('click', function() {
        var buttonText = $(this).text();
        switch (buttonText) {
            case 'New Deck':
                deck.reset();
                generateHTML(deck.cards);
                generateHTML(deck.getDrawnCards(), '#drawn-cards');
                break;
            case 'Shuffle':
                deck.shuffle();
                generateHTML(deck.cards);
                generateHTML(deck.getDrawnCards(), '#drawn-cards');
                break;
            case 'Sort':
                deck.shuffle();
                generateHTML(deck.sort(deck.cards));
                generateHTML(deck.getDrawnCards(), '#drawn-cards');
                break;
            case 'Draw':
                deck.draw();
                generateHTML(deck.cards);
                generateHTML(deck.getDrawnCards(), '#drawn-cards');
                break;
            case 'Draw Multiple':
                count = $('input[name=count-draw]').val();
                deck.draw(count);
                generateHTML(deck.cards);
                generateHTML(deck.getDrawnCards(), '#drawn-cards');
                break;
        }
    });

    var newDeck = function() {
        deck.reset();
        generateHTML(deck.cards);
    };

    var generateHTML = function(cards, containerSelector) {
        var html = '',
            suitClass, cardClass, rankClass, rank;

        for (var i = 0, j = cards.length; i < j; i++) {
            suitClass = cards[i].suit.toLowerCase();
            rank = cards[i].pos[1];
            if (rank === 11) {
                rank = 'J';
            } else if (rank === 12) {
                rank = 'Q';
            } else if (rank === 13) {
                rank = 'K';
            } else if (rank === 0) {
                rank = 'A';
            }
            rankClass = 'rank-' + rank.toString().toLowerCase();
            cardClass = ['card', suitClass, rankClass].join(' ');
            if (suitClass === 'diamonds') {
                suitClass = 'diams';
            }

            if (i % 12 === 0) {
                html += '<div class="row">';
            }
            html += '<div class="col-xs-1"><div class="' + cardClass + '"><span class="rank">' + rank + '</span><span class="suit">&' + suitClass + ';</span></div></div>';
            if (i % 12 === 11) {
                html += '</div>';
            }
        }

        containerSelector = containerSelector || '#deck-cards';
        $(containerSelector).html(html);
    };

    newDeck();
});
