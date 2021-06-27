  let newVote = [];
  

  function voteP (n) {

    let cardBtnP = document.getElementsByClassName('cardThumbsUp')[n];
    cardBtnP.style.border = "2px solid white";

    let cardBtnN = document.getElementsByClassName('cardThumbsDw')[n];
    cardBtnN.style.border = "transparent";

    voteBtn = document.getElementsByClassName('cardV')[n];
    voteBtn.disabled = false;
    voteBtn.setAttribute('onclick', 'thumbsUp('+n+')');

  }

  function voteN (n) {

    let cardBtnN = document.getElementsByClassName('cardThumbsDw')[n];
    cardBtnN.style.border = "2px solid white";

    let cardBtnP = document.getElementsByClassName('cardThumbsUp')[n];
    cardBtnP.style.border = "2px solid transparent";

    voteBtn = document.getElementsByClassName('cardV')[n];
    voteBtn.disabled = false;
    voteBtn.setAttribute('onclick', 'thumbsDw('+n+')');

  }




  function thumbsUp(n){

    newVote.push(JSON.parse(localStorage.getItem('Character'+n)));
    newVote[0].votes.positive++;

    localStorage.setItem('Character'+n, JSON.stringify(newVote[0]));

    newVote = [];

  }

  function thumbsDw(n){

    newVote.push(JSON.parse(localStorage.getItem('Character'+n)));
    newVote[0].votes.negative++;

    localStorage.setItem('Character'+n, JSON.stringify(newVote[0]));

    newVote = [];

  }