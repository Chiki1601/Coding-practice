const { body } = document;
body.innerHTML = `<form>
${Array(8)
	.fill()
	.map(
		(d, i, { length }) => `
  <label>
    <span class="visually-hidden">${`2 to the power of ${
					length - (i + 1)
				}`}</span>
    <input type="checkbox" />
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-22.5 -37.5 45 52" width="1rem" height="1rem">
      <g>
        <circle fill="hsl(45, 90%, 55%)" stroke="hsl(0, 0%, 70%)" stroke-width="1" cy="-15" r="15" />
        <path fill="none" stroke="hsl(0, 0%, 100%)" stroke-width="0.5" d="M -2 0 v -12 a 3 3 0 0 0 -6 0 3 3 0 0 0 3 3 h 9 a 3 3 0 0 0 3 -3 3 3 0 0 0 -6 0 v 12" />
      </g>
      <g fill="hsl(0, 0%, 70%)" stroke="hsl(0, 0%, 60%)" stroke-width="1">
        <circle cy="9" r="5" />
        <rect x="-7" width="14" height="5" rx="2.5" />
        <rect x="-7" width="14" y="5" height="5" rx="2.5" />
      </g>
    </svg>
  </label>
`
	)
	.join("")}

</form>
<p>0</p>
<button disabled>Shift bit \>\></button>
`;

const form = document.querySelector("form");
form.addEventListener("submit", (e) => e.preventDefault());
form.addEventListener("input", (e) => {
	const inputs = form.querySelectorAll("input");
	const total = [...inputs].reduce(
		(acc, curr, i, { length }) =>
			curr.checked ? acc + 2 ** (length - (i + 1)) : acc,
		0
	);
	document.querySelector("p").textContent = total;

	const someChecked = [...inputs].some((input) => input.checked);
	if (someChecked) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", true);
	}
	for (const input of inputs) {
		if (input.checked) {
			button.removeAttribute("disabled");
			break;
		}
	}
});

const button = document.querySelector("button");
button.addEventListener("click", () => {
	const inputs = form.querySelectorAll("input");
	let wasChecked = false;
	inputs.forEach((input) => {
		if (input.checked) {
			if (!wasChecked) {
				input.checked = false;
			}
			wasChecked = true;
		} else {
			if (wasChecked) {
				input.checked = true;
				wasChecked = false;
			}
		}
	});

	const total = [...inputs].reduce(
		(acc, curr, i, { length }) =>
			curr.checked ? acc + 2 ** (length - (i + 1)) : acc,
		0
	);
	document.querySelector("p").textContent = total;

	// let someChecked = false;
	// for (const input of inputs) {
	//   if (input.checked) {
	//     someChecked = true;
	//     break;
	//   }
	// }
	const someChecked = [...inputs].some((input) => input.checked);
	if (someChecked) {
		button.removeAttribute("disabled");
	} else {
		button.setAttribute("disabled", true);
	}
});
