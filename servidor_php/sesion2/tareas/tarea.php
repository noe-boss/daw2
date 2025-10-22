<?php

class Tarea
{
    private $id;
    private $descripcion;
    private $completada;

    public function __construct($id, $descripcion, $completada = false)
    {
        $this->id = $id;
        $this->descripcion = $descripcion;
        $this->completada = $completada;
    }

    public function getId()
    {
        return $this->id;
    }
    public function getDescripcion()
    {
        return $this->descripcion;
    }
    public function isCompletada()
    {
        return $this->completada;
    }
    public function setCompletada($estado)
    {
        $this->completada = $estado;
    }
    //devuelve los atributos o el objeto en formato cadena
    public function toString()
    {
        return $this->id . '|' . $this->descripcion . '|' . ($this->completada ? '1' : '0');
    }
    //convierte la tarea a formato cadena a objeto
    public static function fromString($linea)
    {
        $partes = explode('|', trim($linea));
        return new Tarea($partes[0], $partes[1], $partes[2] == '1');
    }
}
