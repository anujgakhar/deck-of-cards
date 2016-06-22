define([
    'intern!bdd',
    'intern/chai!expect',
    'intern/order!app/js/deck.js'
], function(
    bdd,
    expect
) {
    bdd.describe('Deck tests', function() {
        bdd.it('should have 52 cards', function() {
            var deck = new Deck();
            expect(deck.cards.length).to.equal(52);
        });

        bdd.it('should not contain duplicate cards', function() {
            var deck = new Deck();
            var cards = deck.cards.map(function(card) {
                return card.suit + '-' + card.rank;
            });

            // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
            // Set will only have unique values
            var uniqueCardLength = new Set(cards);

            expect(deck.cards.length).to.equal(uniqueCardLength.size);
        });
    });

    bdd.describe('Draw Card tests', function() {
        bdd.it('should draw one card if no arguments passed', function() {
            var deck = new Deck();
            var drawnCards = deck.draw();

            expect(drawnCards.length).to.equal(1);

            var card = drawnCards[0];
            expect(card.hasOwnProperty('pos') && card.hasOwnProperty('suit') && card.hasOwnProperty('rank')).to.be.true;
        });

        bdd.it('should draw specified number of cards', function() {
            var deck = new Deck();
            var drawnCards = deck.draw(5);

            expect(drawnCards.length).to.equal(5);

            drawnCards.forEach(function(card) {
                expect(card.hasOwnProperty('pos') && card.hasOwnProperty('suit') && card.hasOwnProperty('rank')).to.be.true;
            });
        });

        bdd.it('should remove dealt cards from the deck', function() {
            var deck = new Deck();
            var drawnCards = deck.draw();
            var remainingCards = deck.cards.map(function(card) {
                return card.text;
            });
            expect(deck.cards.length).to.equal(51);
            expect(remainingCards.indexOf(drawnCards[0].text)).to.equal(-1);

            // another test
            deck = new Deck();
            drawnCards = deck.draw(15);
            remainingCards = deck.cards.map(function(card) {
                return card.text;
            });
            expect(deck.cards.length).to.equal(37);
            expect(drawnCards.length).to.equal(15);

            drawnCards.forEach(function(drawnCard) {
                expect(remainingCards.indexOf(drawnCard.text)).to.equal(-1);
            });
        });

        bdd.it('should return null if no cards are left in the deck', function() {
            var deck = new Deck();

            while (!!deck.cards.length) {
                deck.draw();
            }

            expect(deck.draw()).to.equal(null);
        });
    });

    bdd.describe('Card sorting tests', function() {
        bdd.it('should sort cards by suit if rank is same', function() {
            var deck = new Deck();

            var firstCard = deck.createCard('Hearts', 'Seven');
            var secondCard = deck.createCard('Clubs', 'Seven');
            var sorted = deck.sort([firstCard, secondCard]);

            expect(sorted[0].suit).to.equal('Clubs');
            expect(sorted[1].suit).to.equal('Hearts');
        });

        bdd.it('should sort cards by suit and rank', function() {
            var deck = new Deck();

            var firstCard = deck.createCard('Hearts', 'Seven');
            var secondCard = deck.createCard('Hearts', 'Ace');
            var thirdCard = deck.createCard('Spades', 'Ace');
            var sorted = deck.sort([firstCard, secondCard, thirdCard]);

            expect(sorted[0].suit).to.equal('Spades');
            expect(sorted[1].suit).to.equal('Hearts');
            expect(sorted[1].rank).to.equal('Ace');
            expect(sorted[2].rank).to.equal('Seven');
        });
    });
});
