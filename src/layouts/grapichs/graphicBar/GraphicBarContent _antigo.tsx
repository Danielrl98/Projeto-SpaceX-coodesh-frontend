import { Fragment, useEffect, useState } from "react";
import { Styled } from ".";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);
import axios from "axios";

/*interface Data{

}*/
export function GrafichBarContent() {
  const [dados, setdados] = useState([]);

  async function requestApiLaunchesState() {
    const result = await axios.get(
      "http://localhost:8080/launches/stats?full=all"
    );

    setdados(result.data);
  }

  useEffect(() => {
    requestApiLaunchesState();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Bar Chart",
      },
    },
  };

  function BarChart() {
    const labels = dados.map((e) => e.date);
    const data = [];

    const arrayCombinado = combinarSucessosPorAno(dados);
    const nomesDasPropriedades = Object.keys(arrayCombinado);

    const arrayDeObjetos = [];

for (const chave in arrayCombinado ) {
  if (arrayCombinado .hasOwnProperty(chave)) {
    const objetoAninhado = arrayCombinado[chave];
    const objetoTransformado = { chave, ...objetoAninhado };
    arrayDeObjetos.push(objetoTransformado);
  }
}


    nomesDasPropriedades.map((element,i) => {
      
    
      data.push({
        label: arrayDeObjetos[i][0].name,
        data: arrayDeObjetos[i][0].success,
        backgroundColor: arrayDeObjetos[i][0].cores.hexadecimal,
      });
    });
    const newData = {
      labels: nomesDasPropriedades,
      datasets: data,
    };
  
   /* return <Bar options={options} data={newData} />;*/
  }

  const agruparPorAno = (array: Array<object>) => {
    const grupos = {};

    array.forEach((objeto) => {
      const ano = objeto.date.split("-")[0];
      if (!grupos[ano]) {
        grupos[ano] = [];
      }
      grupos[ano].push(objeto);
    });

    return grupos;
  };

  const combinarSucessosPorAno = (array: Array<object>) => {
    const grupos = agruparPorAno(array);

    for (const ano in grupos) {
      grupos[ano] = grupos[ano].reduce((acumulador, objeto) => {
        const objetoExistente = acumulador.find(
          (item) => item.date === objeto.date
        );
        if (objetoExistente) {
          objetoExistente.sucesso += objeto.sucesso;
        } else {
          acumulador.push(objeto);
        }
        return acumulador;
      }, []);
    }

    return grupos;
  };

  return (
    <Fragment>
      <Styled.Card>
        {dados.length !== 0 ? <BarChart /> : "Carregando.."}
      </Styled.Card>
    </Fragment>
  );
}
