
// DECLARING IMPORTANT VARIABLES AND CLASSES

let characters = document.getElementsByClassName('characters')[0];
let results = [];

class card{
    constructor(name, desc, cat, pic, date, pvotes, nvotes){
        this.name = name;
        this.desc = desc;
        this.cat = cat;
        this.pic =  pic;
        this.date = date;
        this.pvotes = pvotes;
        this.nvotes = nvotes;
    }
}

// CONSUMING DATA.JSON FILE


fetch('assets/data.json')
  .then(response => response.json())
  .then(res => {


    // IF LOCALSTORAGE IS EMPTY, STORE RESULTS CONTAINED IN DATA.JSON

    if (localStorage.length === 0) {
        for(var n in res.data)
        localStorage.setItem('Character'+n, JSON.stringify(res.data[n]));
    }

    // FILL AN EMPTY ARRAY WITH THE DATA OBTAINED FROM LOCALSTORAGE

    for (var i = 0; i < 6; i++){
        results.push(JSON.parse(localStorage.getItem('Character'+i)));
    }


    // USING OUR NEW ARRAY TO CREATE THE CHARACTER'S CARDS
    
    for (var i = 0; i < results.length; i++){

        const character = new card (
            results[i].name,
            results[i].description,
            results[i].category, 
            results[i].picture,
            results[i].lastUpdated,
            results[i].votes.positive,
            results[i].votes.negative
        );

        let cardContainer = document.createElement('div');
        cardContainer.classList.add('cardContainer');
        cardContainer.style.backgroundImage = 'url(assets/img/characters/'+character.pic+')';
        
        let cardTop = document.createElement('div');
        cardTop.classList.add('cardTop');

        // DRAWING THUMB ICONS ACCORDING TO POPULARITY

        let gRating = document.createElement('img');
        gRating.classList.add('gRating');
        if(character.pvotes > character.nvotes){
            gRating.src = 'assets/img/thumbs-up.svg';
            gRating.style.backgroundColor = "rgb(60, 187, 180)"
        } else {
            gRating.src = 'assets/img/thumbs-down.svg';
            gRating.style.backgroundColor = "rgb(249, 173, 29)";
        }

        let cardText = document.createElement('div');
        cardText.classList.add('cardText');
        let cardName = document.createElement('h3');
        cardName.innerText = character.name;
        cardName.classList.add('cardName');
        let cardDesc = document.createElement('p');
        cardDesc.innerText = character.desc;
        cardText.appendChild(cardName);
        cardText.appendChild(cardDesc);

        let cardAct = document.createElement('div');
        cardAct.classList.add('cardAct');
        let cardDate = document.createElement('p');
        cardDate.classList.add('cardDate');


        // CALCULATING TIME LAPSED SINCE THE POLL'S RELEASE

        let fDate = new Date(character.date);
        let days = Math.round((Date.now()-fDate)/86400000);
        let years, months = 0;

        if(days > 365){
             years = Math.round(days/365);
             cardDate.innerText = years+' year(s) ago in '+character.cat;
        } else if ((days < 365) && (days > 31)){
             months = Math.round(days/12);
             if (months > 12){
                years = Math.round(months/12);
                cardDate.innerText = years+' year(s) ago in '+character.cat;
             } else
             cardDate.innerText = months+' months ago in '+character.cat;
        };


        let cardTY = document.createElement('p');
        cardTY.classList.add('cardTY');
        cardTY.innerText = 'Thank you for your vote!';

        let cardVote = document.createElement('div');
        cardVote.classList.add('cardVote');
        

        let cardThumbsUp = document.createElement('div');
        cardThumbsUp.classList.add('cardThumbsUp');
        cardThumbsUp.setAttribute('onclick', 'voteP('+i+')');
        let cardThumbsUpImg = document.createElement('img');
        cardThumbsUpImg.classList.add('cardThumbsUpImg');
        cardThumbsUpImg.src = 'assets/img/thumbs-up.svg';
        cardThumbsUp.appendChild(cardThumbsUpImg);
        let cardThumbsDw = document.createElement('div');
        cardThumbsDw.classList.add('cardThumbsDw');
        cardThumbsDw.setAttribute('onclick', 'voteN('+i+')');
        let cardThumbsDwImg = document.createElement('img');
        cardThumbsDwImg.classList.add('cardThumbsDwImg');
        cardThumbsDwImg.src = 'assets/img/thumbs-down.svg';
        cardThumbsDw.appendChild(cardThumbsDwImg);

        let cardV = document.createElement('button');
        cardV.classList.add('cardV');
        cardV.setAttribute('disabled', true);
        let cardVText = document.createElement('h5');
        cardVText.classList.add('cardVText');
        cardVText.innerHTML = 'Vote Now';
        cardV.appendChild(cardVText);

        let cardVA = document.createElement('button');
        cardVA.classList.add('cardVA');
        cardVA.setAttribute('onclick', 'voteA('+i+')');
        let cardVAText = document.createElement('h5');
        cardVAText.innerHTML = 'Vote Again';
        cardVA.appendChild(cardVAText);

        cardAct.appendChild(cardDate);
        cardAct.appendChild(cardTY);
        cardVote.appendChild(cardThumbsUp);
        cardVote.appendChild(cardThumbsDw);
        cardVote.appendChild(cardV);
        cardVote.appendChild(cardVA);
        cardAct.appendChild(cardVote);

        cardTop.appendChild(gRating);
        cardTop.appendChild(cardText);
        cardTop.appendChild(cardAct);

        cardContainer.appendChild(cardTop);


        let cardGauge = document.createElement('div');
        cardGauge.classList.add('cardGauge');

        let cardGaugeP = document.createElement('div');
        cardGaugeP.classList.add('cardGaugeP');
        cardGaugeP.style.backgroundColor = 'rgba(60, 187, 180, 0.7)';

        // CALCULATING POPULARITY PERCENTAGES

        let totalVotes = (character.pvotes) + (character.nvotes);
        let pPercent = ((character.pvotes*100)/totalVotes).toFixed(2);

        cardGaugeP.style.width = pPercent+'%';

        let cardGaugeP_img = document.createElement('img');
        cardGaugeP_img.src = 'assets/img/thumbs-up.svg';
        let cardGaugeP_n = document.createElement('h4');
        cardGaugeP_n.classList.add('cardGaugeP_n');
        cardGaugeP_n.innerText = pPercent+'%';
        cardGaugeP.appendChild(cardGaugeP_img);
        cardGaugeP.appendChild(cardGaugeP_n);

        cardGauge.appendChild(cardGaugeP);

        let cardGaugeN = document.createElement('div');
        cardGaugeN.classList.add('cardGaugeN');
        cardGaugeN.style.backgroundColor = 'rgba(249, 173, 29, 0.7)';
        let nPercent = ((character.nvotes*100)/totalVotes).toFixed(2);
        cardGaugeN.style.width = nPercent+'%';

        let cardGaugeN_img = document.createElement('img');
        cardGaugeN_img.src = 'assets/img/thumbs-down.svg';
        let cardGaugeN_n = document.createElement('h4');
        cardGaugeN_n.classList.add('cardGaugeN_n');
        cardGaugeN_n.innerText = nPercent+'%';
        cardGaugeN.appendChild(cardGaugeN_img);
        cardGaugeN.appendChild(cardGaugeN_n);

        cardGauge.appendChild(cardGaugeN);


        cardContainer.appendChild(cardGauge);


        characters.appendChild(cardContainer);
        
    }

  });
