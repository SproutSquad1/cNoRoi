function calculateROI() {
    var netProfit = document.getElementById('netProfit').value;
    var investment = document.getElementById('investment').value;

    if (investment == 0) {
        alert("Investment cannot be zero.");
        return;
    }

    var roi = (netProfit / investment) * 100;
    document.getElementById('result').innerText = `Your ROI is ${roi.toFixed(2)}%`;
}
