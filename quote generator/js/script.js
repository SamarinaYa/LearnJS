document.addEventListener('DOMContentLoaded', () => {


    const quotes = [
        ["But eyes are blind. You have to look with the heart", "Antoine de Saint-Exupéry"], 
        ["Woman is sacred; the woman one loves is holy", "Alexander Dumas"],
        ["There is nothing more deceptive than an obvious fact", "Arthur Conan Doyle"],
        ["So easy to be loved – so hard to love", "Francis Scott Fitzgerald"],
        ["Revenge is a dish that tastes best when served cold", "Mario Gianluigi Puzo"],
        ["It’s not too bad when the sun’s out, but it only comes out when it feels like coming out", "Jerome David Salinger"],
        ["Just take a look at our patrons, and you’ll know. Some don’t appreciate us, others never will", "Johann Wolfgang von Goethe"],
        ["An artist should create beautiful things, but should put nothing of his own life into them", "Oscar Wilde"],
        ["I’ve learned that people will forget what you said, people will forget what you did, but people will never forget how you made them feel.", "Maya Angelou"],
        ["Either you run the day, or the day runs you.", "Jim Rohn"],
        ["Whether you think you can or you think you can’t, you’re right.","Henry Ford"],
        ["The best revenge is massive success.", "Frank Sinatra"],
        ["People often say that motivation doesn’t last. Well, neither does bathing.  That’s why we recommend it daily.", "Zig Ziglar"],
        ["There is only one way to avoid criticism: do nothing, say nothing, and be nothing", "Aristotle"],
        ["The only person you are destined to become is the person you decide to be.", "Ralph Waldo Emerson"],
    ]
   
    const button = document.querySelector('.custom-btn')

    button.addEventListener("click", () => {
        
            let random = quotes[ Math.floor( Math.random() * quotes.length ) ];
            // цитата
            let quote = document.querySelector(".quote");
            // автор
            let author = document.querySelector(".author");
            
            quote.style.cssText = 'font-family: Fasthand, sans-serif; font-size: 36px;'
    
        quote.textContent = `" ${random[0]} "`;
        author.textContent = `~ ${random[1]}`;

    })
});

