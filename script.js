function calculateROI() {
    var totalSquareFootage = parseFloat(document.getElementById('totalSquareFootage').value);
    var cleaningCoverage = parseFloat(document.getElementById('cleaningCoverage').value);
	var hoursToClean = totalSquareFootage / cleaningCoverage;
    var hourlyLaborCost = parseFloat(document.getElementById('hourlyLaborCost').value);
    var laborBurden = parseFloat(document.getElementById('laborBurden').value) / 100;
    var purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    var installationCosts = parseFloat(document.getElementById('installationCosts').value);
    var trainingCosts = parseFloat(document.getElementById('trainingCosts').value);
    var newLaborCost = parseFloat(document.getElementById('newLaborCost').value);

    // Fixed costs
    var annualMaintenance = 605.2; // Fixed annual maintenance cost
    var annualElectricity = 113.82; // Fixed annual electricity cost
    var annualSupplies = 892.9; // Fixed annual supplies cost

    if (!isNaN(totalSquareFootage) && !isNaN(hourlyLaborCost) && !isNaN(laborBurden) &&
        !isNaN(purchasePrice) && !isNaN(installationCosts) && !isNaN(trainingCosts) &&
        !isNaN(newLaborCost)) {

        var hoursToClean = totalSquareFootage / cleaningEquipment;
        var totalLaborCost = hoursToClean * hourlyLaborCost * (1 + laborBurden);
        var totalAnnualLaborCost = totalLaborCost * 5 * 52; // Assuming 5 days a week for 52 weeks

        var totalInitialInvestment = purchasePrice + installationCosts + trainingCosts;
        var totalAnnualOperationalCost = annualMaintenance + annualElectricity + annualSupplies;
        var totalAnnualSavings = totalAnnualLaborCost - newLaborCost - totalAnnualOperationalCost;
        var roi = (totalAnnualSavings / totalInitialInvestment) * 100;
        var breakEven = totalInitialInvestment / totalAnnualSavings;

        document.getElementById('result').innerHTML = 'ROI: ' + roi.toFixed(2) + '%<br>Break-Even Point: ' + breakEven.toFixed(2) + ' years';
    } else {
        document.getElementById('result').innerHTML = 'Please enter all values.';
    }
}

function updateCleaningCoverage() {
    var cleaningEquipment = document.getElementById('cleaningEquipment');
    var cleaningCoverage = document.getElementById('cleaningCoverage');
    cleaningCoverage.value = cleaningEquipment.value;
}

function updateRobotDetails() {
    var robotModel = document.getElementById('robotModel').value;
    var purchasePrice = document.getElementById('purchasePrice');
    var stationLabel = document.getElementById('stationLabel');
    var stationPrice = document.getElementById('stationPrice');
    var sp50Options = document.querySelectorAll('.sp50-option');
    var l50Options = document.querySelectorAll('.l50-option');

    if (robotModel === 'SP50') {
        purchasePrice.value = 30000;
        stationLabel.textContent = 'Charging Station/Dock:';
        stationPrice.value = 0;
        sp50Options.forEach(opt => opt.style.display = 'block');
        l50Options.forEach(opt => opt.style.display = 'none');
    } else if (robotModel === 'L50') {
        purchasePrice.value = 35000;
        stationLabel.textContent = 'Work Station/Dock:';
        stationPrice.value = 0;
        sp50Options.forEach(opt => opt.style.display = 'none');
        l50Options.forEach(opt => opt.style.display = 'block');
    }
	
    updateStationPrice();
    updateCleaningCoverage();
    updateInvestmentPanel();
}

function updateStationPrice() {
    var robotModel = document.getElementById('robotModel').value;
    var stationOption = document.getElementById('stationOption').value;
    var stationPrice = document.getElementById('stationPrice');

    if (stationOption === 'yes') {
        stationPrice.value = (robotModel === 'SP50') ? 3300 : 5000;
    } else {
        stationPrice.value = 0;
    }
	
	updateInvestmentPanel();
}

function updateInvestmentPanel() {
	var totalSquareFootage = parseFloat(document.getElementById('totalSquareFootage').value);
    var purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
    var stationPrice = parseFloat(document.getElementById('stationPrice').value);

    var totalEquipmentCost = purchasePrice + stationPrice;
    document.getElementById('totalEquipmentCost').textContent = totalEquipmentCost.toFixed(2);

    // Calculate installation cost: $500 for every 30,000 sq.ft
    var installationCost = Math.ceil(totalSquareFootage / 30000) * 500;
    document.getElementById('installationCost').value = installationCost;
    
	var trainingCost = parseFloat(document.getElementById('trainingCost').value);
    var miscCost = parseFloat(document.getElementById('miscCost').value);
	
    var totalInvestment = totalEquipmentCost + installationCost + trainingCost + miscCost;
    document.getElementById('totalInvestment').textContent = 'Total Investment = ' + totalInvestment.toFixed(2);
}

// Attach the calculateROI function to the window object to make it accessible globally
window.calculateROI = calculateROI;
window.updateCleaningCoverage = updateCleaningCoverage;
window.updateRobotDetails = updateRobotDetails;
window.updateStationPrice = updateStationPrice;

// Initialize with default values
window.onload = function() {
    updateRobotDetails();
    updateStationPrice();
	updateInvestmentPanel();
};