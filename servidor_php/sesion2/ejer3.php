<?php

$numeros = [1, 2.1, 3.0, 4, 5];

function sumar($numeros, $contador = 0)
{

    if ($contador == count($numeros)) {
        return 0;
    }
    return $numeros[$contador] + sumar($numeros, $contador + 1);
}

$resultado = sumar($numeros);
echo "La suma es: " . $resultado;
