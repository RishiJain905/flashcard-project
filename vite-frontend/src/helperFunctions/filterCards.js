export function randomizeCards(cards) {
    cards.sort(() => Math.random() - 0.5);
}

export function addIndex(cards) {
    let filteredCards = new Array(cards.length);
    for (let i = 0; i < cards.length; i++) {
        filteredCards[i] = cards[i];
        filteredCards[i].index = i;
    }
    return filteredCards;
}

export function filterCards(cards, filters) {
    if (filters.mastery) {
        cards = cards.filter(card => 
            filters.mastery.includes(card.mastery)
        ).slice(0, filters.maxCards);
    }
    return cards;
}
