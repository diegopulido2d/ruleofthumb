
// SWITCHES BETWEEN GRID VIEW AND LIST VIEW MODES

function gridmode() {
    document.styleSheets[3].disabled = true;
    document.getElementById('dropdownMenuButton').innerHTML = 'Grid';
}


function listmode() {
    document.styleSheets[3].disabled = false;
    document.getElementById('dropdownMenuButton').innerHTML = 'List';
}
