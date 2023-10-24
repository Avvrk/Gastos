let budgets = [];
let bG = null;

function validateExpenses() {
    let exp = document.getElementById('gasto').value;
    let quantity = document.getElementById('cantidad').value;

    if (exp == '')
        swal('Advertencia', 'Por favor llene el campo de "gasto".', 'warning');
    else if (quantity == '')
        swal('Advertencia', 'Por favor llene el campo de "cantidad".', 'warning');
    else if (quantity < 0)
        swal('Error', 'Por favor ingrese un valor mayor a 0', 'error');
    else if (!isNaN(exp))
        swal('Error', 'Por favor ingrese un valor válido en "Gasto" (Solo letras).', 'error');
    else if (isNaN(quantity))
        swal('Error', 'Por favor ingrese un valor válido en "Cantidad" (Solo números).', 'error');
    else {
        swal('¡Exelente!', "Tu gasto a sido registrado", "success");
        expense()
    }

}

function validateBudget() {
    let budget = document.getElementById('presupuesto').value;

    if (budget == '')
        swal('Advertencia', 'Por favor llena el campo de "Presupuesto".', 'warning');
    else if (budget < 1)
        swal('Error', 'Por favor ingrese un valor mayor a 0', 'error');
    else 
        bG = budget;
}

function expense() {
    let exp = document.getElementById('gasto').value;
    let quantity = document.getElementById('cantidad').value;

    budgets.push({
        gasto: exp,
        cantidad: quantity,
    })

    document.getElementById("tarjeta").innerHTML = "";

    showCard()
}

function showCard() {
    budgets.forEach((item, index) => {
        let tr = document.createElement('tr');
        let name = document.createElement('td');
        let number = document.createElement('td');
        let delet = document.createElement('td');
        let dL = document.createElement('button');

        dL.textContent = 'Borrar';
        dL.addEventListener('click', () => {
            eraseCard(index)
        })

        name.textContent = item.gasto;
        number.textContent = item.cantidad;
        
        delet.appendChild(dL);
        tr.appendChild(name);
        tr.appendChild(number);
        tr.appendChild(delet);

        document.getElementById('tarjeta').appendChild(tr);
    })
}

function eraseCard(index) {
    let i = index;
    budgets.splice(i, 1);

    document.getElementById("tarjeta").innerHTML = "";

    showCard();
}