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
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function GrafichBarContent() {
  const [dados, setDados] = useState([]);
  const [load,setLoad] = useState(false)
  const [labels,setLabels] = useState('')

  async function requestApiLaunchesState() {
    const result = await axios.get(
      "http://localhost:8080/launches/stats?full=all"
    );

    setDados(result.data);
  
    const labels = (result.data).map((e) => e.date);
    const data = [];

    const arrayCombinado = combinarSucessosPorAno(result.data);
    const nomesDasPropriedades = Object.keys(arrayCombinado);

    const arrayDeObjetos = [];

    for (const chave in arrayCombinado) {
      if (arrayCombinado.hasOwnProperty(chave)) {
        const objetoAninhado = arrayCombinado[chave];
        const objetoTransformado = { chave, ...objetoAninhado };
        arrayDeObjetos.push(objetoTransformado);
      }
    }
    let newArray = []

    arrayDeObjetos.forEach((e,i) => {
      Object.values(arrayDeObjetos[i]).forEach((e2,i2) => {
       
        newArray.push(e2)
      });
    })
 
    nomesDasPropriedades.map((element, i) => {
      data.push({
        label: arrayDeObjetos[i][0].name,
        data: arrayDeObjetos[i][0].success,
        backgroundColor: arrayDeObjetos[i][0].cores.hexadecimal,
      });
    });
    const newData = {
      labels: nomesDasPropriedades,
      datasets: newArray,
    };
    setLabels(nomesDasPropriedades)
   /*const juntarObjeto = newArray.reduce((acc, obj) => {
    console.log(acc)
      if (!acc[obj.label]) {
        acc[obj.label] = { label: obj.label, data: [] };
      }
      acc[obj.label].data.push(obj.data);
      return acc;
    }, {});*/
 

    console.log({newArray:newArray })
   setLoad(true)
  }

  useEffect(() => {
   
      requestApiLaunchesState();
    
  }, []);

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

  function BarF() {
    const data2 = {
      labels: labels,
      datasets: [
        {
          label: "Cor 1",
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          data: [10, 20, 15, 25, 30],
        },
        {
          label: "Cor 2",
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          data: [15, 25, 10, 20, 35],
        },
        {
          label: "Cor 3",
          backgroundColor: "rgba(153, 102, 255, 0.2)",
          borderColor: "rgba(153, 102, 255, 1)",
          borderWidth: 1,
          data: [5, 15, 30, 10, 20],
        },
      ],
    };
    return <Bar data={data2} />;
  }

  return (
    <Fragment>
      <Styled.Card>
        {load ?  <BarF /> : ''}
       
      </Styled.Card>
    </Fragment>
  );
}
