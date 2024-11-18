"use strict";

let mots, randomProprName, randomProprTheme;
//lettres
const letters ='abcdefghijklmnopqrstuvwxyzàâæçéèêëîïôùûüÿ0123456789';

//Get Array From Lettres
let lettresArray = Array.from(letters);

//Selection lettres container
let lettresContainer = document.querySelector(".letters");

//Genertes Lettres
lettresArray.forEach(letter=>{
// Cration de span 
let span = document.createElement("span");
// Cration lettre Test Node
// let theLettre = document.createTextNode(letter);
//Append The letter To span 
// span.appendChild(theLettre);
span.append(letter)
// ajout class span 
span.className='letter-box';
// Append span To the letters container 
lettresContainer.appendChild(span);
})
// Objet of words Cadregories*
const r1 = fetch("pendu/mots.json");
const r2 = fetch("pendu/theme.json");
Promise.any([r1, r2]).then(res=>{
    console.log(res);
    if(res.ok)
    {
        res.json().then(data=>{
            console.log("any", data)
            mots = data;
            selectionneMot()
            word()
            space()
       
        });
    }
});

function selectionneMot()
{
    //choise le theme ou le mot petit fiche
    let randomProprNumber = Math.floor(Math.random() * mots.length);
    randomProprName = mots[randomProprNumber];
    console.log(randomProprName);
    randomProprTheme = "Développement";
    if(typeof randomProprName === "string") return;
    // randomProprName=mots[randomProprName];
     //lettre au hasard
     randomProprTheme  = randomProprName.Thème_
    randomProprNumber = Math.floor(Math.random() * randomProprName.Listes.length);
    randomProprName = randomProprName.Listes[randomProprNumber];
    console.log(randomProprName);
   // choise les mots
    randomProprNumber = Math.floor(Math.random() * randomProprName.Mots.length);
    randomProprName = randomProprName.Mots[randomProprNumber];
    console.log(randomProprName);

    if(randomProprName == undefined)
    {
        selectionneMot()
    }
}

function word()
{
    // Set category info
    document.querySelector(".gam-info .catgory span").innerHTML= randomProprTheme;

}
//Select  Letters guess Container Elements
let letterGuessContainer = document.querySelector(".letters-gusse");

//Conformie choise de Word to Array
function space(){
    let lettresAndSpace = Array.from(randomProprName.toLowerCase())
    console.log(lettresAndSpace);
    lettresAndSpace.forEach(letter=>{
        //creat Empty Span
        let EmptySpan = document.createElement("span")
     // If Letter is Space
     if(letter === '')
     {
         // add Class to The Span 
         EmptySpan.className='with-space'
     }
       // append Span To the letters Gusse containier
   letterGuessContainer.append(EmptySpan)  
    })
    //Select tout les lettres
    let guessSpans = document.querySelectorAll(".letters-gusse span")
   //Set  wrong Attempts 
   let wrongAttempts = 0;
   // Select the Draw Element
   let theDraw = document.querySelector(".hangman-draw")

   //Handle Clicking On Letters
   document.addEventListener("click",(e)=>{
     // Set The chose Status 
     let theStatus = false;
    if(e.target.className === 'letter-box'){
        e.target.classList.add("clicked");
       // Get Cmlick letter
       let theClickeLetter =e.target.innerHTML.toLowerCase();
      //The Chosen word 
      let  theChosenWord = Array.from(randomProprName.toLowerCase())
       console.log(theClickeLetter);
     //The Chosen word  //    console.log( lettresAndSpace);
     lettresAndSpace.forEach((wordLetter,WordIndex)=>{
        //if The Clicked Letter Equal To One of Ehe Chosen Word Letter
       if(theClickeLetter == wordLetter){
        // console.log(`Fond At Index Number ${index}`);
        let vectoire = true;
        // Loop on ALl Guess Span
        guessSpans.forEach((span, spanIndex) =>{
            if(WordIndex === spanIndex) {
                // Set Status To Correct
                theStatus=true;
                span.innerHTML = theClickeLetter;

            }
            console.log(span, span.textContent);
            if (span.textContent == "")
            {
                vectoire = false;
            }
        })
        console.log(vectoire);
        if(vectoire)
        {
            endGame(true)
        }
       } 
     })
    // outSide Loop
    // console.log(theStatus);
    if(theStatus !==true){
   wrongAttempts++;
// add Class worng on The Dran
  theDraw.classList.add(`wrong-${wrongAttempts}`);
    }}
    if (wrongAttempts === 8) {
        endGame(false);
        letterGuessContainer.classList.add("finished")
        
    } 
   })
}
// End game Function 
// Fonction de fin de jeu
function endGame(isWin) {
    let div = document.createElement("div");
    div.className = 'popup';

    let messageContainer = document.createElement("div");
    messageContainer.className = 'message-container';

    let messageSpan = document.createElement("span");
    let separator = " ! ";
    if (isWin) {
        div.style.backgroundColor = "green"; // Couleur de fond pour la victoire
    } else {
        div.style.backgroundImage = "url('./hangman.jpg')";
        div.style.color = "back";  // Exemple de couleur rouge pour la défaite
        div.style.backgroundSize = "contain"; // Pour couvrir tout l'élément div
        div.style.backgroundPosition = "right"; // Centrer l'image
        div.style.backgroundRepeat = "no-repeat"; // Eviter que l'image se répète
      
       
    }

    if (isWin) {
        messageSpan.dataset.text = `Félicitations, vous avez gagné. Le mot était ${randomProprName}`;
        messageSpan.textContent = `Bravo${separator}`;
    } else {
        messageSpan.dataset.text = ` Le mot était ${randomProprName}`;
        messageSpan.textContent = `Désolé${separator}Vous avez perdu.`;
    }

    messageContainer.appendChild(messageSpan);
    div.appendChild(messageContainer);
    document.body.appendChild(div);

    div.animate(
        [
            { transform: "scale(0.8)", opacity: "0" },
            { transform: "scale(1)", opacity: "1" }
        ],
        {
            duration: 800,
            iterations: 1,
            fill: "forwards"
        }
    );

    let spans = [messageSpan];
    spans.forEach(async (sp) => {
        let slide = sp.animate({ textIndent: "0" }, { duration: 2000, fill: "forwards" });
        await slide.finished;

        let fade = sp.animate({ opacity: "0" }, { duration: 1000, fill: "forwards" });
        await fade.finished;

        slide.cancel();
        sp.textContent = sp.dataset.text;

        fade.reverse();
        await fade.finished;

        slide.play();
    });
}









