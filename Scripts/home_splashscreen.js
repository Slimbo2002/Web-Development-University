const quotes = [
    {quote: "'I have learned you are never too small to make a difference'", author:"Greta Thunberg", image: "Assets/and_you.png"},
    {quote: "'No one will protect what they don't care about, and no one will care about what they haven't experienced'",author:"David Attenborough", image: "Assets/logo.png"},
    {quote: "'The earth is something we all have in common'", author:"Wendell Berry", image: "Assets/and_you.png"},
    {quote: "'Progress is impossible without change, and those that cannot change their minds cannot change anything'", author:"George Bernard Shaw", image: "Assets/and_you.png"},
]

const homeText = document.querySelector('.hero .herotext');
const homeImage = document.querySelector('.hero .heroimage');
const authorText = document.querySelector('.hero .author');

const randomInt = () =>{
    return Math.floor(Math.random() * quotes.length);
}

const loadQuote = () =>{
    let randInt = randomInt();
    let randQuote = quotes[randInt];

    homeText.innerHTML = randQuote.quote;
    authorText.innerHTML = randQuote.author
    homeImage.src = quotes[randInt].image;

}

loadQuote();