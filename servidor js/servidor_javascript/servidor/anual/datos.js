document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("formulario");
  const resultado = document.getElementById("resultado");

  const months = {
    months: [
      { name: "Enero", days: 31 },
      { name: "Febrero", days: 28 },
      { name: "Marzo", days: 31 },
      { name: "Abril", days: 30 },
      { name: "Mayo", days: 31 },
      { name: "Junio", days: 30 },
      { name: "Julio", days: 31 },
      { name: "Agosto", days: 31 },
      { name: "Septiembre", days: 30 },
      { name: "Octubre", days: 31 },
      { name: "Noviembre", days: 30 },
      { name: "Diciembre", days: 31 }
    ]
  };


  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const year = document.getElementById("year").value;

    let contador = 1;
    let semanal = "lunes";
    let texto = "";

    months.months.forEach((month) => {

      texto += ` <br>`;
      texto += `${month.name} <br>`;
      texto += `********************************************************* <br>`;
      texto += ` <br>`;

      for (let day = 1; day <= month.days; day++) {

        if (contador > 7) {
          contador = 1;
        }

        switch (contador) {
          case 1: semanal = "lunes"; break;
          case 2: semanal = "martes"; break;
          case 3: semanal = "miércoles"; break;
          case 4: semanal = "jueves"; break;
          case 5: semanal = "viernes"; break;
          case 6: semanal = "Sabado"; break;
          case 7: semanal = "Domingo"; break;
        }

        texto += `${semanal} ${day} de ${month.name} de ${year}<br>`;
        contador++;
      }
    });

    resultado.innerHTML = texto;
  });
});