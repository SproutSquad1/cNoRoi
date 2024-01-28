function calculateROI() {
    var totalSquareFootage = parseFloat(document.getElementById('totalSquareFootage').value);
    var cleaningEquipment = parseFloat(document.getElementById('cleaningEquipment').value);
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

// Attach the calculateROI function to the window object to make it accessible globally
window.calculateROI = calculateROI;
