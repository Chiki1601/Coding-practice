var val = document.getElementById("tip");
var val1 = document.getElementById("totalBill");
var val2 = document.getElementById("tipBox");
var val3 = document.getElementById("totalBillBox");

function showHide() {
    val.style.display = "none";
    val1.style.display = "none";
    val2.style.display = "none";
    val3.style.display = "none";
}

function calculate() {
    var bill = document.getElementById("bill").value ;
    var tipPercentage = document.getElementById("tipPercentage").value;

    if (val.style.display === "none" && val1.style.display === "none" && val2.style.display === "none" && val3.style.display === "none") {
        val.style.display = "block";
        val1.style.display = "block";
        val2.style.display = "block";
        val3.style.display = "block";
    }

    if(tipPercentage === "") {
        alert("PLEASE, ENTER A TIP PERCENTAGE!");
        val.style.display = "none";
        val1.style.display = "none";
        val2.style.display = "none";
        val3.style.display = "none";
        return;
    }

    if(bill === "") {
        alert("PLEASE, ENTER A BILL!");
        val.style.display = "none";
        val1.style.display = "none";
        val2.style.display = "none";
        val3.style.display = "none";
        return;
    }

    bill = parseFloat(bill);
    totalBill = parseFloat(totalBill);

    var tip = bill * (tipPercentage / 100);
    document.getElementById("tip").value = tip;

    var totalBill = bill + tip;
    document.getElementById("totalBill").value = totalBill;

}