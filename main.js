let presupuesto = 0;
let gastos = [];
let presupuestoRestante = 0;

function validarGastos() {
    let gasto = document.getElementById('gasto').value;
    let cantidad = parseFloat(document.getElementById('cantidad').value);

    if (gasto == '') {
        swal('Advertencia', 'Por favor llena el campo de "Gasto".', 'warning');
    } else if (isNaN(cantidad) || cantidad <= 0) {
        swal('Error', 'Por favor ingrese un valor válido en "Cantidad" (Número mayor a 0).', 'error');
    } else if (!isNaN(gasto)) {
        swal('Error', 'Por favor ingrese un valor válido en "Gasto" (Solo letras).', 'error');
    } else {
        if (cantidad > presupuestoRestante) {
            swal('Error', 'El gasto supera el presupuesto restante.', 'error');
        } else {
            swal('¡Excelente!', "Tu gasto ha sido registrado", "success");
            registrarGasto(gasto, cantidad);
            presupuestoRestante -= cantidad;
            actualizarPresupuestoRestante();
        }
    }
}

function validarPresupuesto() {
    let presupuestoIngresado = parseFloat(document.getElementById('presupuesto').value);

    if (isNaN(presupuestoIngresado) || presupuestoIngresado <= 0) {
        swal('Error', 'Por favor ingrese un valor válido en "Presupuesto" (Número mayor a 0).', 'error');
    } else {
        presupuesto = presupuestoIngresado;
        presupuestoRestante = presupuestoIngresado;
        actualizarPresupuestoRestante();
    }
}

function registrarGasto(gasto, cantidad) {
    gastos.push({
        nombre: gasto,
        cantidad: cantidad,
    });

    document.getElementById("tarjeta").innerHTML = "";

    mostrarGastos();
}

function mostrarGastos() {
    gastos.forEach((item, index) => {
        let fila = document.createElement('tr');
        fila.classList.add('borde');
        let nombre = document.createElement('td');
        let cantidad = document.createElement('td');
        let eliminar = document.createElement('td');
        let botonEliminar = document.createElement('button');

        botonEliminar.textContent = 'Borrar';
        botonEliminar.addEventListener('click', () => {
            eliminarGasto(item, index);
        });

        nombre.textContent = item.nombre;
        cantidad.textContent = item.cantidad;

        eliminar.appendChild(botonEliminar);
        fila.appendChild(nombre);
        fila.appendChild(cantidad);
        fila.appendChild(eliminar);

        document.getElementById('tarjeta').appendChild(fila);

        let filaVacia = document.createElement('tr');
        let celdaVacia = document.createElement('td');

        celdaVacia.setAttribute('colspan', '3');
        filaVacia.appendChild(celdaVacia);

        document.getElementById('tarjeta').appendChild(filaVacia);
    });
}

function eliminarGasto(item, index) {
    let i = index;
    const cantidadADevolver = gastos[i].cantidad;
    gastos.splice(i, 1);

    document.getElementById("tarjeta").innerHTML = "";

    mostrarGastos();


    presupuestoRestante += cantidadADevolver;
    actualizarPresupuestoRestante();
}

function actualizarPresupuestoRestante() {
    document.getElementById('cambRestante').textContent = presupuestoRestante.toFixed(2);
}
