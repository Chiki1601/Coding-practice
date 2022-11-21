function calculateWater() {
  var weight = document.getElementById("weight").value;
  var activity = document.getElementById("exercise").value;
  var requiredWaterOz = weight / 2 + (activity / 30) * 12;
  var waterBottles = requiredWaterOz / 16.9;
  var waterBottles2 = waterBottles.toFixed(2);
  if (isNaN(weight) || isNaN(activity)) {
    alert("Please enter only numeric values.");
  }
  else if (weight === "") {
    alert("Please enter your weight.");
  }
  else if (activity === "") {
    alert("Please enter your exercise time. If you have not been active, please enter 0.");
  }
  else {
    document.getElementById("required_water").value = requiredWaterOz;
    document.getElementById("water_bottles").value = waterBottles2;
  }
}
function resetForm() {
	document.getElementById("personal_info").reset();
}

