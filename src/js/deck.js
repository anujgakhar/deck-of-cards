var Deck = function() {
    // sorting by Clubs, Spades, Hearts, Diamonds
    this.suits = {
        'Clubs': 1,
        'Spades': 2,
        'Hearts': 3,
        'Diamonds': 4
    };
    // Ace is higher in sorting
    this.ranks = {
        'Two': 2,
        'Three': 3,
        'Four': 4,
        'Five': 5,
        'Six': 6,
        'Seven': 7,
        'Eight': 8,
        'Nine': 9,
        'Ten': 10,
        'Jack': 11,
        'Queen': 12,
        'King': 13,
        'Ace': 0
    };

    this.cards = [];
    this.drawnCards = [];

    this.reset();
};

Deck.prototype = {
    createDeck: function() {
        // generate cards
        for (var suit in this.suits) {
            for (var rank in this.ranks) {
                this.cards.push(this.createCard(suit, rank));
            }
        }
    },
    createCard: function(suit, rank) {
        return {
            suit: suit,
            rank: rank,
            pos: [this.suits[suit], this.ranks[rank]],
            text: suit + '-' + rank
        };
    },
    reset: function() {
        this.drawnCards.length = 0;
        this.cards.length = 0;
        this.createDeck();
        this.shuffle();
    },
    hasCards: function() {
        return this.cards.length > 0;
    },
    getDrawnCards: function() {
        return this.sort(this.drawnCards);
    },
    // draws a given number of cards from the top of the deck
    draw: function(num) {
        if (!this.hasCards()) {
            return null;
        }

        num = num || 1;
        var drawn = this.cards.splice(0, num);
        this.drawnCards = this.drawnCards.concat(drawn);
        return this.sort(drawn);
    },
    shuffle: function() {
        var i = this.cards.length,
            j, temp;

        if (i === 0) {
            return;
        }

        while (--i) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.cards[i];
            this.cards[i] = this.cards[j];
            this.cards[j] = temp;
        }
    },
    sort: function(cards) {
        return cards.sort(function(a, b) {
            var suitA = parseInt(a.pos[0], 10),
                suitB = parseInt(b.pos[0], 10),
                rankA = parseInt(a.pos[1], 10),
                rankB = parseInt(b.pos[1], 10);

            return suitA - suitB || rankA - rankB;
        });
    }
};
