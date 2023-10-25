
import{ Fragment, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { GraphicPizzaContent } from "./GraphicPizzaContent";
import { Data } from "./interface";


export const GraphicPizzaFC = () => {

    const [dados, setdados] = useState(Array<Data>);
    const [successLaunches,setSuccessLaunches] = useState(0)
    const [failLaunches,setFailLaunches] = useState(0)
  
    ChartJS.register(ArcElement, Tooltip, Legend);
  
    useEffect(() => {
      setdados([
        {
          date: "2006-03-24",
          name: "Falcon 1",
          rocket: "5e9d0d95eda69955f709d1eb",
          success: 2,
          fail: 3,
          cores: {
            reused: 0,
            flight: 5,
            hexadecimal: "#000",
          },
          status: 200,
        },
        {
          date: "2010-06-04",
          name: "Falcon 9",
          rocket: "5e9d0d95eda69973a809d1ec",
          success: 176,
          fail: 2,
          cores: {
            reused: 114,
            flight: 292,
            hexadecimal: "#ff0",
          },
          status: 200,
        },
        {
          date: "2018-02-06",
          name: "Falcon Heavy",
          rocket: "5e9d0d95eda69974db09d1ed",
          success: 3,
          fail: 0,
          cores: {
            reused: 0,
            flight: 3,
            hexadecimal: "#f00",
          },
          status: 200,
        },
      ]);
    }, []);
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
    
  
    const DoughnutChart = () => {
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

    return(
        <Fragment>
          <GraphicPizzaContent dados={dados} successLaunches={successLaunches} failLaunches={failLaunches} DoughnutChart={DoughnutChart }/>
        </Fragment>
    )
}