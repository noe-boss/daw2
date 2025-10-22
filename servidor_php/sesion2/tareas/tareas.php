<?php

require_once 'Tarea.php';

class Tareas
{
    private $lista = [];
    private $archivo;

    public function __construct($archivo)
    {
        $this->archivo = $archivo;
        $this->cargar();
    }

    private function cargar()
    {
        $this->lista = [];
        if (!file_exists($this->archivo)) {
            return;
        }
        $lineas = file($this->archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lineas as $linea) {
            $this->lista[] = Tarea::fromString($linea);
        }
    }

    private function guardar()
    {
        $contenido = '';
        foreach ($this->lista as $tarea) {
            $contenido .= $tarea->toString() . PHP_EOL;
        }
        file_put_contents($this->archivo, $contenido);
    }

    public function agregarTarea($descripcion)
    {
        $id = count($this->lista) > 0 ? end($this->lista)->getId() + 1 : 1;
        $tarea = new Tarea($id, $descripcion);
        $this->lista[] = $tarea;
        $this->guardar();
        return $tarea;
    }

    public function eliminarTarea($id)
    {
        foreach ($this->lista as $key => $tarea) {
            if ($tarea->getId() == $id) {
                unset($this->lista[$key]);
                $this->lista = array_values($this->lista);
                $this->guardar();
                return true;
            }
        }
        return false;
    }

    public function buscarTareaPorId($id)
    {
        foreach ($this->lista as $tarea) {
            if ($tarea->getId() == $id) {
                return $tarea;
            }
        }
        return null;
    }

    public function modificarEstadoTarea($id, $estado)
    {
        $tarea = $this->buscarTareaPorId($id);
        if ($tarea) {
            $tarea->setCompletada($estado);
            $this->guardar();
            return true;
        }
        return false;
    }

    public function getLista()
    {
        return $this->lista;
    }
}
