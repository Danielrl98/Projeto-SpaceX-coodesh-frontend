import { Fragment, useEffect, useState } from "react";
import { Styled } from ".";
import { Dados } from "./interface";
/*import 'font-awesome/css/font-awesome.min.css';*/

export const LaunchesContext: React.FC<Dados> = (props) => {

    console.log(props)
    const dados = props.dados.results
    const load:boolean = props.load
    const requestApi = props.requestApi
    
    const [webcastLink,setWebCastlink] = useState([])
    const [search,setSearch] = useState('')

    useEffect(() => {
        
        if(load){

    
         const links =  dados[0].map(e => e.links)

          console.log(links)

          links.forEach( (e:string) => {
            setWebCastlink(state => [...state,JSON.parse(e)])
          })
       
        }
    },[dados])

    const pesquisar = () => {
        requestApi(search)
    }

  return (
    <Fragment>
      <Styled.SectionRegister>
        <div>
          <h2>Registro de lançamentos</h2>
        </div>
        <div>
            <div>
                <input type="text" onChange={(e) => setSearch(e.target.value)}placeholder="Search here"/>
                <button onClick={pesquisar}>Buscar</button>
            </div>
          
        </div>
        <div className="list-launches">
        <table>
            <thead>
              <tr className="tr-head">
                <div className="responsive one">
                    <th>Nº Vôo</th>
                    <th>Logo</th>
                </div>
                <div className="responsive two">
                    <th>Data de lançamento</th>
                    <th>Foguete</th>
                </div>
                <div className="responsive three">
                    <th>Resultado</th>
                    <th>Video</th>
                </div>
              </tr>
            </thead>
            <tbody>
                {load ? dados[0].map((data,i) => 
                
                (
                   <tr className="datas" key={i}>
                     <div className="responsive one">
                         <td>{data.flight_number}</td>
                         <td><img width="20" src="https://starwalk.space/assets/icons/icon-512x512.png"></img></td>
                     </div>
                     <div className="responsive two">
                         <td>{(data.date_utc).substring(0,10)}</td>
                         <td>{data.name}</td>
                     </div>
                     <div className="responsive three">
                         <td>{data.success ? 'Sucesso': 'Falha'}</td>
                         <td><a target="__blank" href={webcastLink.length !==0 ? webcastLink[i].webcast : '#'}><img className="icon-youtube"  width="50" src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"></img></a></td>
                     </div>
                 </tr> 
                )) : 'Carregando'}
                 
            </tbody>
          </table>
        </div>
      </Styled.SectionRegister>
    </Fragment>
  );
};
