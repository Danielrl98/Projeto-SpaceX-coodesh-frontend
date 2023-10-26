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


export function GrafichBarContent() {
  const [dados, setDados] = useState([]);
  const [dados2, setDados2] = useState([]);

  async function requestApiLaunchesState() {
    const result = await axios.get(
      "http://localhost:8080/launches/stats?full=all"
    );


    const grupos = {};

    result.data.forEach((objeto) => {
      const ano = objeto.date.split("-")[0];
      if (!grupos[ano]) {
        grupos[ano] = [];
      }
      grupos[ano].push(objeto);
    });

    setDados(Object.values(grupos));
console.log(Object.values(grupos))

  }

  useEffect(() => {
    requestApiLaunchesState();
   
  }, []);



  return (
    <Fragment>
      <Styled.Card>
       
      </Styled.Card>
    </Fragment>
  );
  
}
