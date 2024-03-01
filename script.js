document.addEventListener('DOMContentLoaded', function() {
    const scoreDisplay = document.getElementById('score');
    const clickButton = document.getElementById('clickButton');
    const buildingButtons = document.querySelectorAll('.building-button');
    const productivityUpgradeButton = document.getElementById('productivityUpgrade');
    const efficiencyUpgradeButton = document.getElementById('efficiencyUpgrade');
  
    let score = 0;
    let buildings = [
      { name: 'Cursor', count: 0, cost: 10, rate: 0.1 },
      { name: 'Grandma', count: 0, cost: 100, rate: 5 },
      { name: 'Farm', count: 0, cost: 1000, rate: 10 }
    ];
    let productivityUpgradeCost = 100;
    let efficiencyUpgradeCost = 150;
  
    clickButton.addEventListener('click', function() {
      score++;
      updateScoreDisplay();
    });
  
    buildingButtons.forEach(function(button, index) {
      button.addEventListener('click', function() {
        if (score >= buildings[index].cost) {
          score -= buildings[index].cost;
          buildings[index].count++;
          buildings[index].cost = Math.ceil(buildings[index].cost * 1.2); // Increase building cost by 20% each time
          updateScoreDisplay();
          updateBuildingCost(index);
          startGeneratingScore(index);
        } else {
          alert("Not enough score to buy this building!");
        }
      });
    });
  
    productivityUpgradeButton.addEventListener('click', function() {
      if (score >= productivityUpgradeCost) {
        score -= productivityUpgradeCost;
        increaseProductivity();
        productivityUpgradeCost *= 2; // Increase upgrade cost
        updateScoreDisplay();
        updateProductivityUpgradeCost();
      } else {
        alert("Not enough score to buy this upgrade!");
      }
    });
  
    efficiencyUpgradeButton.addEventListener('click', function() {
      if (score >= efficiencyUpgradeCost) {
        score -= efficiencyUpgradeCost;
        increaseEfficiency();
        efficiencyUpgradeCost *= 2; // Increase upgrade cost
        updateScoreDisplay();
        updateEfficiencyUpgradeCost();
      } else {
        alert("Not enough score to buy this upgrade!");
      }
    });
  
    function updateScoreDisplay() {
      scoreDisplay.textContent = score;
    }
  
    function updateBuildingCost(index) {
      const buildingCostSpan = document.getElementById(`building${index + 1}Cost`);
      buildingCostSpan.textContent = buildings[index].cost;
    }
  
    function startGeneratingScore(index) {
      const interval = setInterval(function() {
        score += buildings[index].rate * buildings[index].count;
        updateScoreDisplay();
      }, 1000); // Generate score every 1 second per building
  
      // Stop generating score if no buildings left
      if (buildings[index].count === 0) {
        clearInterval(interval);
      }
    }
  
    function increaseProductivity() {
      buildings.forEach(function(building) {
        building.rate *= 2; // Double the productivity of all buildings
      });
    }
  
    function increaseEfficiency() {
      buildings.forEach(function(building) {
        building.cost = Math.ceil(building.cost * 0.8); // Decrease the cost of all buildings by 20%
      });
    }
  
    function updateProductivityUpgradeCost() {
      const productivityUpgradeCostSpan = document.getElementById('productivityUpgradeCost');
      productivityUpgradeCostSpan.textContent = productivityUpgradeCost;
    }
  
    function updateEfficiencyUpgradeCost() {
      const efficiencyUpgradeCostSpan = document.getElementById('efficiencyUpgradeCost');
      efficiencyUpgradeCostSpan.textContent = efficiencyUpgradeCost;
    }
  });
  