// for preventing animations on load
window.addEventListener("DOMContentLoaded",() => {
	const atr = new ATRToggle(".toggle");
});

class ATRToggle {
	constructor(qs) {
		this.el = document.querySelector(qs);
		this.input = this.el?.querySelector("input");
		this.input?.addEventListener("change",this.removePristine.bind(this));
	}
	removePristine() {
		this.el?.classList.remove("toggle--pristine");
	}
}
