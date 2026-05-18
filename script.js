let subscriptions = [];

function addSubscription(){

    const name = document.getElementById("name").value;
    const cost = parseFloat(document.getElementById("cost").value);
    const category = document.getElementById("category").value;
    const renewal = document.getElementById("renewal").value;

    if(name === "" || isNaN(cost) || renewal === ""){
        alert("Please fill in all fields!");
        return;
    }

    const subscription = {
        id: Date.now(),
        name,
        cost,
        category,
        renewal,
        status:"Active"
    };

    subscriptions.push(subscription);

    renderSubscriptions();
    updateSummary();

    document.getElementById("name").value = "";
    document.getElementById("cost").value = "";
    document.getElementById("renewal").value = "";
}

function renderSubscriptions(){

    const list = document.getElementById("subscriptionList");

    list.innerHTML = "";

    subscriptions.forEach(sub => {

        const today = new Date();
        const renewalDate = new Date(sub.renewal);

        const diffTime = renewalDate - today;

        const diffDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
        );

        const card = document.createElement("div");

        card.classList.add("subscription-card");

        card.innerHTML = `

            <button class="delete-btn"
                onclick="deleteSubscription(${sub.id})">
                X
            </button>

            <h3>${sub.name}</h3>

            <p>
                <strong>Category:</strong>
                ${sub.category}
            </p>

            <p>
                <strong>Monthly Cost:</strong>
                ₱${sub.cost}
            </p>

            <p>
                <strong>Renewal Date:</strong>
                ${sub.renewal}
            </p>

            <p>
                <strong>Status:</strong>

                <span class="${sub.status === 'Active'
                    ? 'active'
                    : 'paused'}">

                    ${sub.status}

                </span>
            </p>

            <p class="reminder">

                ${diffDays <= 7 && diffDays >= 0 && sub.status === "Active"
                    ? `Renewing in ${diffDays} day(s)!`
                    : ""}

            </p>

            <button
                class="pause-btn"

                onclick="togglePause(${sub.id})"

                style="
                    background:
                    ${sub.status === 'Paused'
                        ? '#16a34a'
                        : '#f59e0b'};
                "

            >

                ${sub.status === 'Paused'
                    ? 'Resume Subscription'
                    : 'Pause Subscription'}

            </button>

        `;

        list.appendChild(card);

    });

}

function updateSummary(){

    document.getElementById("totalSubs").textContent =
        subscriptions.length;

    let total = 0;
    let renewals = 0;
    let monthlyTotal = 0;

    const today = new Date();

    subscriptions.forEach(sub => {

        if(sub.status === "Active"){

            total += sub.cost;

            monthlyTotal += sub.cost;
        }

        const renewalDate = new Date(sub.renewal);

        const diffTime = renewalDate - today;

        const diffDays = Math.ceil(
            diffTime / (1000 * 60 * 60 * 24)
        );

        if(
            diffDays <= 7 &&
            diffDays >= 0 &&
            sub.status === "Active"
        ){
            renewals++;
        }

    });

    document.getElementById("totalCost").textContent =
        total.toFixed(2);

    document.getElementById("renewalCount").textContent =
        renewals;

    document.getElementById("monthlyTotal").textContent =
        monthlyTotal.toFixed(2);
}

function togglePause(id){

    subscriptions = subscriptions.map(sub => {

        if(sub.id === id){

            if(sub.status === "Active"){
                sub.status = "Paused";
            }else{
                sub.status = "Active";
            }

        }

        return sub;

    });

    renderSubscriptions();
    updateSummary();
}

function deleteSubscription(id){

    subscriptions = subscriptions.filter(sub =>
        sub.id !== id
    );

    renderSubscriptions();
    updateSummary();
}
