document.addEventListener('DOMContentLoaded', function() {
let game = 
{
    word:"",
    tries: 5,
    letters: [],
}

async function getWord() 
{
        let url = 'https://random-word-api.vercel.app/api?words=1&length=8';
        
        let response = await fetch(url);
        let data = await response.json();
        
        
        game.word = data[0];
        
}
getWord();

function cleanWord() {
   
    const accentMap = {
        'é': 'e', 'è': 'e', 'ê': 'e', 'ë': 'e',
        'ï': 'i', 'î': 'i',
        'ç': 'c',
        'à': 'a', 'â': 'a',
        'ô': 'o',
        'ù': 'u', 'û': 'u'
    };

    
    let cleanedWord = '';


    for (let i = 0; i < game.word.length; i++) {
        let caracter = game.word[i];

       
        cleanedWord += accentMap[caracter] || caracter;
    }


    game.word = cleanedWord;
}

function updateTries() {
        let triesDOM = document.querySelector('header h3 span');
        triesDOM.textContent = game.tries; 
    }


function checkGameStatus() {
    let wordDOM = document.querySelector('#word ul');
    let letterElements = wordDOM.querySelectorAll('li');
    

    let allLettersCorrect = true;
    
    letterElements.forEach((letter, i) => {

        if (letter.textContent !== game.word[i]) {
            allLettersCorrect = false; 
        }
    });


    if (allLettersCorrect) {
        alert('Félicitations, vous avez deviné le mot!');

    } else if (game.tries === 0) {
        let result = prompt('devinez le mot')
        if(result === game.word){
            alert('Félicitations, vous avez deviné le mot!');
        } else {
            alert('Dommage, vous n\'avez pas deviné le mot!');
        }

    }
}


let keyBoardDOM = document.querySelector('#keyboard');
let keys = keyBoardDOM.querySelectorAll('li');



keys.forEach(key => {
    key.addEventListener('click', function(e){
        let keysPressed = e.target.textContent;
        cleanWord();
        keysPressed = keysPressed.toLowerCase()
        
        game.letters.push(keysPressed);
        
        e.target.classList.add('disabled');
        
        if (game.word.includes(keysPressed)) {
                let wordDOM = document.querySelector('#word ul');
                let letterElements = wordDOM.querySelectorAll('li');

               
                for (let i = 0; i < game.word.length; i++) {
                    if (game.word[i] === keysPressed) {
                        letterElements[i].textContent = keysPressed; 
                    }
                }
            } else {
               
                game.tries--;
                updateTries();
            }
            checkGameStatus();
    });
    
    
    
});
 
console.log(game)  
    
    
    
    
    
    
})