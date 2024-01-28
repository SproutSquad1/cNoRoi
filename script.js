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
	var cleaningEquipment = document.getElementById('cleaningEquipment');
	var totalOperationalCost = 0;
    var operationalCostContent = '';
	
    if (robotModel === 'SP50') {
        purchasePrice.value = 30000;
        stationLabel.textContent = 'Charging Station/Dock:';
        stationPrice.value = 0;
       operationalCostContent = `
            <p><strong>Maintenance Costs:</strong></p>
            <ul>
                <li>Roller Brush Synchronous belt (every 12 months) $76.7</li>
                <li>Baffle Synchronous belt (every 12 months) $28.5</li>
                <li>Installation service cost (every 12 months) $500</li>
                <li><strong>Total annual maintenance cost = $605.2</strong></li>
            </ul>
            <p><strong>Electricity Costs:</strong></p>
            <ul>
                <li>2.88 kWh per charge at $0.152/kWh = $0.43776 per charge</li>
                <li><strong>Total Annual cost (5 x 52 weeks) x $0.43776 = $113.82</strong></li>
            </ul>
            <p><strong>Replacement Parts or Supplies:</strong></p>
            <ul>
                <li>Dust filter (Monthly) $7.4 ($88.8 annually)</li>
                <li>Roller Brush (every 3 months) $121.1 ($109.1 annually)</li>
                <li>2 Side brush (every 3 months) $134 ($536 annually)</li>
                <li>HEPA filter (every 12 months) $59</li>
                <li><strong>Total cost annually = $792.9 + $100 (est. shipping) = $892.9</strong></li>
            </ul>
        `;
		totalOperationalCost = 605.2 + 28.5 + 500 + 113.82 + 792.9 + 100; // Sum of SP50 costs
		
    } else if (robotModel === 'L50') {
        purchasePrice.value = 35000;
        stationLabel.textContent = 'Work Station/Dock:';
        stationPrice.value = 0;
        cleaningEquipment.innerHTML = `
            <option value="15000">20" Walk Behind Auto Scrubber</option>
            <option value="18000">24" Walk Behind Auto Scrubber</option>
            <option value="20000">28" Walk Behind Auto Scrubber</option>
            <option value="28000">32" Ride On Auto Scrubber</option>`;
        operationalCostContent = `
            <p><strong>Maintenance Costs:</strong></p>
            <ul>
                <li>Debris filter bag (every 12 months) $13.5</li>
            </ul>
            <p><strong>Electricity Costs:</strong></p>
            <ul>
                <li>2.88 kWh per charge at $0.152/kWh = $0.43776 per charge</li>
                <li><strong>Total Annual cost (5 x 52 weeks) x $0.43776 = $113.82</strong></li>
            </ul>
            <p><strong>Consumables Replacement Parts or Supplies:</strong></p>
            <ul>
                <li>Front Squeegee blade (every 3 months) $47.7 ($190.80 annually)</li>
                <li>Rear Squeegee blade (every 3 months) $33.6 ($134.4 annually)</li>
                <li>2 x Disk Brush (every 4 months) $138.5/each ($831 annually)</li>
                <li>Side skirt blade (every 4 months) $28.3 ($84.9 annually)</li>
                <li><strong>Total annual cost = $1241.1 + $100 (est. shipping) = $1341.1</strong></li>
            </ul>
        `;
		totalOperationalCost = 13.5 + 113.82 + 1341.1; // Sum of L50 costs
    }
	
	document.getElementById('annualOperationalCost').innerHTML = operationalCostContent;
	document.getElementById('annualOperationalCost').innerHTML = operationalCostContent;
	
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