
document.addEventListener("DOMContentLoaded", () => {

	let renderBtn = document.querySelector('.js-cta-render-table');
	let form = document.querySelector('.config-group');
	let pageTable = document.querySelector('.table');

	function renderTable(evt) {

		evt.preventDefault();

		let colStart = document.querySelector('.js-config-output-cols').value;
		let rowStart = document.querySelector('.js-config-output-rows').value;
		let tableSize = document.querySelector('.js-config-output-size').value;

		const table = multiplicationTable(colStart, rowStart, tableSize);

		let pageTable = document.querySelector(".table");
		let tableFragment = document.createDocumentFragment();
		let thead = document.createElement("thead");
		let tbody = document.createElement("tbody");

		for(let i = 0; i < table.length; i++) {
			if(i === 0) {
				let tr = document.createElement("tr");
				for(let j = 0; j < table[i].length; j++) {
					let th = document.createElement("th");
					th.textContent = table[i][j];
					tr.appendChild(th);
					thead.appendChild(tr);
				}
			} else {
				let tr = document.createElement("tr");
				for(let j = 0; j < table[i].length; j++) {
					if(j === 0) {
						let th = document.createElement("th");
						th.textContent = table[i][j];
						tr.appendChild(th);
						tbody.appendChild(tr);
					} else {
						let td = document.createElement("td");
						td.textContent = table[i][j];
						tr.appendChild(td);
						tbody.appendChild(tr);
					}
				}
			}
		}

		tableFragment.appendChild(thead);
		tableFragment.appendChild(tbody);

		pageTable.innerHTML = '';
		pageTable.append(tableFragment);
	}

	/*RENDER TABLE LISTENERS*/

	renderBtn.addEventListener('click', renderTable);

	form.addEventListener('keydown', (evt) => {
		if (evt.keyCode === 13) {
			renderTable(evt);
		}
	});

	/*HIGHLIGHT CELLS*/

	pageTable.addEventListener('mouseover', (evt) => {
		if(evt.target.tagName === 'TH' ||  evt.target.tagName === 'TD') {
			let thead = document.querySelector(".table thead");
			evt.target.classList.add('highlight');
			evt.target.parentNode.children[0].classList.add('highlight');
			thead.children[0].children[evt.target.cellIndex].classList.add('highlight');
		}
	});

	pageTable.addEventListener('mouseout', (evt) => {
		if(evt.target.tagName === 'TH' ||  evt.target.tagName === 'TD') {
			let thead = document.querySelector(".table thead");
			evt.target.classList.remove('highlight');
			evt.target.parentNode.children[0].classList.remove('highlight')
			thead.children[0].children[evt.target.cellIndex].classList.remove('highlight')
		}
	});

	/*CHANGE ROWS AND DELETE*/

	pageTable.addEventListener('click', (evt) => {

		let currentElement = evt.target.closest('tr');

		if(evt.target.closest('tr').parentNode.tagName === 'TBODY') {

			if(evt.ctrlKey) {
				currentElement.remove();
				return;
			}
			if(evt.target.closest('tr').rowIndex !== 1) {
				currentElement.previousSibling.before(currentElement);
			} else {
				alert('Error! This is first row.')
			}
		}
	});	
});