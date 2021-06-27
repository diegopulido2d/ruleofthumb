
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