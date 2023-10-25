import styled from 'styled-components'

export const Card = styled.main`

  /*  background-color: #6C757D;*/
    padding:20px;
    background-color: white;
    h2{
        color:#000;
        text-align: center;
        font-size: 18px;
    }
    .flex{
        padding-top: 20px;
        display: flex;
        gap:8px;

        div{
            width: 50%;
        }
    } 
    li{
        display: flex;
        gap:10px;
        padding-bottom: 4px;
    }   
    .color{
        width: 20px !important;
        height: 20px;
    }
    h3{
        font-size: 16px;
        padding: 10px 0;
        font-weight: 800;
    }
    @media(max-width:767px){
        .flex{
            flex-direction: column;
            div{
            width: auto;
            }
        }
        
    }
`