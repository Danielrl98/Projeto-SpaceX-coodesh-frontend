import { Fragment, useEffect, useState } from "react";
import { LaunchesContext } from "./launchesContent";
import axios from "axios";
import debounce from 'lodash/debounce'
import { Dados } from "./interface";

export const Launches: React.FC = () =>{

    const [dados,setDados] = useState(Array<Dados>)
    const [load,setLoad] = useState(false)
  

    const requestApi = debounce( async (term = '%') => {

        if(term ==''){
            term = '%'
        }
        await axios.get(`http://localhost:8080/launches?search=${term}&offset=0`).then((success) => {

            setDados(success.data)
          
            setLoad(true)
        
          /*  datesConvert.forEach((element:string) => {

                newLink.push(JSON.stringify(element))
            })*/
            

        }).catch( (error:string) => {
            console.log(error)
        })

    },100)

    useEffect( () => {
        requestApi()
    },[])

    return(
        <Fragment>
            <LaunchesContext load={load} dados={dados} requestApi={requestApi}/>
        </Fragment>
    )
} 