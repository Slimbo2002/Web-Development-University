//Your City Page Script

const co2Bar = document.getElementById('co2')
const happinessBar = document.getElementById('happiness')
const energyBar = document.getElementById('energy')
const costBar = document.getElementById('cost')

const cards = document.querySelectorAll(".card");
let selectedCards = [];

cards.forEach(card => {
  card.addEventListener("click", updateSelected)
});

function updateSelected(){
  const card = event.currentTarget;
  if (card.classList.contains("selected")) 
    {
      // unselect
      card.classList.remove("selected");
      selectedCards = selectedCards.filter(c => c !== card);
      
    } 
    else 
    {
      if (selectedCards.length >= 3) return; //max 3 cards selected

      card.classList.add("selected");
      selectedCards.push(card);
    }

    console.log(selectedCards.map(c => c.dataset.id));
    updateBars();
}

function updateBars() {
    let co2 = 50;
    let happiness = 50;
    let energy = 50;
    let cost = 50;

    for (const card of selectedCards) {
        co2 += Number(card.dataset.co2);
        if(co2 > 100){co2 = 100};
        happiness += Number(card.dataset.happiness);
        if(happiness > 100){happiness = 100};
        energy += Number(card.dataset.energy);
        if(energy > 100){energy = 100};
        cost += Number(card.dataset.cost);
        if(cost > 100){cost = 100};
    }

    document.getElementById('co2').value = co2;
    document.getElementById('happiness').value = happiness;
    document.getElementById('energy').value = energy;
    document.getElementById('cost').value = cost;

    updateBarColor(co2Bar, co2, true);
    updateBarColor(happinessBar, happiness, false);
    updateBarColor(energyBar, energy, false);
    updateBarColor(costBar, cost, true);

}

function updateBarColor(bar, value, reverse) {
    bar.classList.remove("green", "orange", "red");

    if (reverse) {
        if (value > 70) bar.classList.add("red");
        else if (value > 40) bar.classList.add("orange");
        else bar.classList.add("green");
    } else {
        if (value > 70) bar.classList.add("green");
        else if (value > 40) bar.classList.add("orange");
        else bar.classList.add("red");
    }
}
