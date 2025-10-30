const months = JSON.parse(readFileSync("./months.json", "utf-8"));
let contador = 1;
let semanal = "lunes";

function mostrarCalendario(){


    months.months.forEach((month) => {
        
        for (let day = 1; day <= months.day; day ++) {

            if (contador > 5){
                contador = 1;
            }

            switch (contador) {
                case 1: 
                    semanal = "lunes";
                    break;
                case 2:
                    semanal = "Martes";
                    break;
                case 3:
                    semanal = "Miercoles";
                    break;
                case 4:
                    semanal = "jueves";
                    break;
                case 5:
                    semanal = "Viernes";
                    break;
            }
            

            console.log(semanal + " " + day + " de " + month + " de " + year)

            contador ++;
        }
    });
}