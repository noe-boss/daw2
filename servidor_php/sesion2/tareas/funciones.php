<?php

require_once 'Tareas.php';

function agregarTareaMenu($tareas, $descripcion)
{
    return $tareas->agregarTarea($descripcion);
}

function eliminarTareaMenu($tareas, $id)
{
    return $tareas->eliminarTarea((int)$id);
}

function buscarTareaMenu($tareas, $id)
{
    return $tareas->buscarTareaPorId((int)$id);
}

function modificarEstadoTareaMenu($tareas, $id, $estado)
{
    return $tareas->modificarEstadoTarea((int)$id, $estado);
}

function mostrarTareasMenu($tareas)
{
    return $tareas->getLista();
}
