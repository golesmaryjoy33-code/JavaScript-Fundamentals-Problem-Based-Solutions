let subscriptions = [];

function addSubscription() {

    function addSubscription() {
        const name= document.getElementById("name").value;
        const cost= parseFloat(document.getElementById("cost").value);
        const cycle= document.getElementById("cycle").value;
        const used= document.getElementById("used").value;


if (!name || isNaN(cost)){
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

function render(){
    const list=document.getElementById("list");
    const totalDisplay=document.getElementById("total");


    list.innerHTML="";
    let total=0;

    subscriptions.forEach((sub, index) => {
        total += sub.monthlyCost;


     const div = document.createElement("div");
        div.className = "item";


        if (sub.used ==="no"){
            div.classList.add("unused");
        }
        div.innerHTML=`
        <strong>${sub.name}</strong><br>
        $${sub.monthlyCost.toFixed(2)}/month
        `;

        list.appendChild(div);
    });

    totalDisplay.innerHTML=`Total Monthly Burn: $${total.toFixed(2)}`;
}

function clearForm(){
    document.getElementById("name").value="";
    document.getElementById("cost").value="";
}