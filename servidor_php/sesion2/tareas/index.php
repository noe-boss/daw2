<?php
require_once 'funciones.php';

$archivoTareas = __DIR__ . '/tareas.txt';
$tareas = new Tareas($archivoTareas);

$resultado = []; // Para mostrar todas las tareas
$resultadoBusqueda = ''; // Para mostrar una sola tarea al buscar

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $accion = $_POST['accion'] ?? '';
    switch ($accion) {
        case 'agregar':
            $desc = $_POST['descripcion'] ?? '';
            if ($desc) {
                agregarTareaMenu($tareas, $desc);
            }
            break;
        case 'eliminar':
            $id = $_POST['id'] ?? '';
            eliminarTareaMenu($tareas, $id);
            break;
        case 'modificar':
            $id = $_POST['id'] ?? '';
            $estado = ($_POST['estado'] ?? '0') === '1';
            modificarEstadoTareaMenu($tareas, $id, $estado);
            break;
        case 'mostrar':
            $resultado = mostrarTareasMenu($tareas); // Mostrar todas
            break;
        case 'buscar':
            $id = $_POST['id'] ?? '';
            $tarea = buscarTareaMenu($tareas, $id);
            if ($tarea) {
                $resultadoBusqueda = "ID: " . $tarea->getId() . " | " .
                                     htmlspecialchars($tarea->getDescripcion()) . " | " .
                                     ($tarea->isCompletada() ? "Completada" : "Pendiente");
            } else {
                $resultadoBusqueda = "Tarea no encontrada.";
            }
            break;
    }
    // No redirigir, para que se muestre el resultado en la misma carga
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8">
<title>Gestor de Tareas</title>
</head>
<body>
<h1>Gestor de Tareas</h1>

<?php if (!empty($resultado)): ?>
    <h2>Lista de Tareas</h2>
    <ul>
    <?php foreach ($resultado as $tarea): ?>
        <li>
            ID: <?= $tarea->getId() ?> |
            <?= htmlspecialchars($tarea->getDescripcion()) ?> |
            <?= $tarea->isCompletada() ? 'Completada' : 'Pendiente' ?>
        </li>
    <?php endforeach; ?>
    </ul>
<?php endif; ?>

<?php if ($resultadoBusqueda): ?>
    <h2>Resultado de Búsqueda</h2>
    <p><?= $resultadoBusqueda ?></p>
<?php endif; ?>

<form id="formAccion" method="POST" style="display:none;">
    <input type="hidden" name="accion" id="accion">
    <input type="hidden" name="descripcion" id="descripcion">
    <input type="hidden" name="id" id="id">
    <input type="hidden" name="estado" id="estado">
</form>

<button onclick="agregarTarea()">Agregar Tarea</button>
<button onclick="eliminarTarea()">Eliminar Tarea</button>
<button onclick="modificarEstado()">Modificar Estado</button>
<button onclick="mostrarTareas()">Mostrar Todas</button>
<button onclick="buscarTarea()">Buscar Tarea</button>

<script>
function enviarFormulario() {
    document.getElementById('formAccion').submit();
}

function agregarTarea() {
    let desc = prompt("Escribe la descripción de la tarea:");
    if (desc) {
        document.getElementById('accion').value = 'agregar';
        document.getElementById('descripcion').value = desc;
        enviarFormulario();
    }
}

function eliminarTarea() {
    let id = prompt("Introduce el ID de la tarea a eliminar:");
    if (id) {
        document.getElementById('accion').value = 'eliminar';
        document.getElementById('id').value = id;
        enviarFormulario();
    }
}

function modificarEstado() {
    let id = prompt("Introduce el ID de la tarea:");
    let estado = prompt("Nuevo estado (1 = completada, 0 = pendiente):");
    if (id && (estado === '0' || estado === '1')) {
        document.getElementById('accion').value = 'modificar';
        document.getElementById('id').value = id;
        document.getElementById('estado').value = estado;
        enviarFormulario();
    }
}

function mostrarTareas() {
    document.getElementById('accion').value = 'mostrar';
    enviarFormulario();
}

function buscarTarea() {
    let id = prompt("Introduce el ID de la tarea a buscar:");
    if (id) {
        document.getElementById('accion').value = 'buscar';
        document.getElementById('id').value = id;
        enviarFormulario();
    }
}
</script>
</body>
</html>