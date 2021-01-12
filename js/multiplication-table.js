function multiplicationTable(colStart, rowStart, size) {

	let table = [];

	for(let i = 0; i <= size; i++) {
		let row = [];
		for(let j = 0; j <= size; j++) {
			if(i === 0 && j === 0) {
				row.push(null);
			} else if (i === 0) {
				row.push(colStart++);
			}

			if(i !== 0) {
				if(j === 0) {
					row.push(rowStart++);
				} else {
					row.push(row[0] * table[0][j])
				}
			}
		}

		table.push(row)
	}
	
	return table;
}