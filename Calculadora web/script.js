document.addEventListener("DOMContentLoaded", function () {
    let pantalla = document.getElementById("pantalla");
    let operandos = [];
    let operador = null;

    // Función para actualizar la pantalla
    function actualizarPantalla() {
        pantalla.textContent = operandos.join(" ") + (operador ? " " + operador : "");
    }

    // Manejar clics en botones de números y operadores
    document.querySelectorAll(".boton").forEach(function (boton) {
        boton.addEventListener("click", function () {
            if (boton.id === "limpiar") {
                operandos = [];
                operador = null;
            } else if (boton.id === "igual") {
                if (operador && operandos.length === 2) {
                    const resultado = calcular(operandos[0], operador, operandos[1]);
                    operandos = [resultado];
                    operador = null;
                }
            } else if (!isNaN(boton.textContent)) {
                if (operandos.length === 2 && operador) {
                    operandos.pop();
                }
                operandos.push(boton.textContent);
            } else {
                if (operandos.length === 1) {
                    operador = boton.textContent;
                }
            }

            actualizarPantalla();
        });
    });

    // Función para realizar cálculos
    function calcular(num1, operador, num2) {
        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch (operador) {
            case "+":
                return num1 + num2;
            case "-":
                return num1 - num2;
            case "*":
                return num1 * num2;
            case "/":
                if (num2 === 0) {
                    return "Error";
                }
                return num1 / num2;
            default:
                return "Error";
        }
    }
});