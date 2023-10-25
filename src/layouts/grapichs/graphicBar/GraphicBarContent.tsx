import { Fragment,useEffect,useState } from "react";
import { Styled } from ".";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
import axios from 'axios'

/*interface Data{

}*/
export function GrafichBarContent(){

    const [dados, setdados] = useState([]);

    async function requestApiLaunchesState(){

      const result = await axios.get('http://localhost:8080/launches/stats?full=all')

      console.log(result.data)
    
      setdados(result.data)
     
    }

    useEffect( () => {
        requestApiLaunchesState()
    },[])

     const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
          },
          title: {
            display: false,
            text: 'Chart.js Bar Chart',
          },
        },
      };
      
 

      function BarChart(){

        const labels = dados.map((e) =>e.date)
        const data = []
        dados.map((element,i) => {

        data.push({
                    label: element.name,
                    data: [0,1,element.flight],
                    backgroundColor:  element.cores.hexadecimal,
                  }      
        )
        
        })
        const newData = {
            labels:labels,
            datasets:data
        }
        console.log({newData:newData})
       return <Bar options={options} data={newData} />

      }


    return(
        <Fragment>
            <Styled.Card>
                { dados.length !== 0 ? (
                    <BarChart />
                ):'Carregando..'}
               
            </Styled.Card>
        </Fragment>
    )
}