let subscriptions = [];

function addSubscription(){

    function addSubsciption (){
        const name= document.getElementById("name").ariaValueMax;
        const cost= document.getElementById("cost").ariaValueMax;
        const cycle= document.getElementById("cycle").ariaValueMax;
        const used= document.getElementById("used").ariaValueMax;


if (!name || isNan(cost)){
    alert ("Please fill all fields!");
    return;
}

//normalize the cost to monthly
let monthlyCost = cycle === "yearly"? cost / 12: cost;

subscriptions.push({
    name,
    monthlyCost,
    used


});
 render();
 clearForm();
    }
}