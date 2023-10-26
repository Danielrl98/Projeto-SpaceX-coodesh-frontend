
import{ Fragment, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GraphicPizzaContent } from "./GraphicPizzaContent";
import { Data } from "./interface";
import axios from 'axios'
import  debounce  from 'lodash/debounce'

export const GraphicPizza = () => {

    const [dados, setdados] = useState(Array<Data>);
    const [successLaunches,setSuccessLaunches] = useState(0)
    const [failLaunches,setFailLaunches] = useState(0)
    
    const debouncedSearch = debounce(() => {
      
        axios.get(`http://localhost:8080/launches/stats`)
        .then((response) => {
         
          setdados(response.data)
         
        })
        .catch((error) => {
          console.error(error);
        });
    
  }, 1000); 

    ChartJS.register(ArcElement, Tooltip, Legend);

   
    function reduceArrays(array1: Array<number>, array2: Array<number>) {
      const result = [];
  
      for (let i = 0; i < array1.length; i++) {
        result.push(array1[i] / array2[i]);
      }
      return result;
    }
    function transformSuccessToPercentage(array: Array<number>) {
      const total = array.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        0
      );
      const percentageArray = array.map((number) => (number / total) * 100);
      const intArray = percentageArray.map((str) =>
        parseFloat(str.toFixed(2).toString())
      );
  
      return intArray;
    }
    function FailAndSucesssSum(array: Array<number>,array2: Array<number>) {
  
      const sumFail = array.reduce((acc,n) => acc+n,0)
      const sumSuccess = array2.reduce((acc,n) => acc+n,0)
     
  
      const result = sumFail + sumSuccess
  
      const percenteSucess = Math.round((sumSuccess / result) * 100);
      const percenteFail = Math.round((sumFail / result) * 100);
  
      setSuccessLaunches(percenteSucess)
      setFailLaunches(percenteFail)
    }
    
  
    const PiChar= () => {
      const name = dados.map((e) => e.name);
      const success = dados.map((e) => e.success);
      const fail = dados.map((e) => e.fail);
      const flight = dados.map((e) => e.cores.flight);
      const color = dados.map((e) => e.cores.hexadecimal);
  
      const resultPercent = reduceArrays(flight, success);
      const percentageArray = transformSuccessToPercentage(resultPercent);
  
      FailAndSucesssSum(fail,success)
    
      const data = {
        labels: name,
        datasets: [
          {
            data: percentageArray,
            backgroundColor: color,
          },
        ],
      };
  
      return <Pie data={data} />;
    };

    useEffect(() => {
    /*  requestApiLaunchesState()*/
      debouncedSearch()
    }, []);

    return(
        <Fragment>
          <GraphicPizzaContent dados={dados} successLaunches={successLaunches} failLaunches={failLaunches} PiChar={PiChar}/>
        </Fragment>
    )
}