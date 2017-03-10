const endpoint = 'https://api.hearthstonejson.com/v1/17720/enUS/cards.collectible.json';
const deck = [];
const suggestions = document.querySelector('.suggestions');
const searchInput = document.querySelector('.search');

//Building a search filter that will return the name as we type.
const findMatches = (wordToMatch, cardList) => {
	return cardList.filter(card => {
		const regex = new RegExp(wordToMatch, 'gi'); // Regular Expression "g" global "i" in case sensitive, find both lower and uppercase
		const cardName = card.name || '';

		return card.name.match(regex);
	});
};

const displayMatches = () => {
	const matchArray = 
		(typeof searchInput.value !== 'undefined' && searchInput.value !== '')
		? findMatches(searchInput.value, deck)
		: deck;

	const html = matchArray.map(card => {
		const regex = 
			(typeof searchInput.value !== 'undefined' && searchInput.value !== '')
			? new RegExp(searchInput.value, 'gi')
			: null;

	const cardName = card.name
		.replace(regex, `<span class="highlight">${searchInput.value.toUpperCase()}</span>`);

	return `
		<div class="card">
			<h3>${cardName}</h3>
		</div>
		`;
	}).join('');

	suggestions.innerHTML = html;
};

fetch(endpoint)
	.then(blob => blob.json())
	.then(data => deck.push(...data))
	.then(() => { displayMatches(); });

searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);
