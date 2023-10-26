import styled from 'styled-components'

export const SectionRegister = styled.section`

    padding-top: 40px;
    
    h2{
        text-align: center;
        color:white;
    }
    .list-launches{
        background-color: #6C757D;
    }
    .datas{
        background-color: #C0BEBE;
        display: flex;
        width: 100%;
        justify-content:center;
        
    }
    table{
        margin-top: 25px;
        width: 100%;
        thead{
            display: none;
        }
        
        .responsive{
            width: 100%;
            display: flex;
            flex-direction:column;
            padding:12px;
            gap:20px;
            
        }
        .last{
            display:none
        }
    }
    @media(min-width:767px) {
        .list-launches{
        margin-top: 50px;
        padding: 12px;
    }
    table{
        width: 100%;

        
        .tr-head{
          gap: 50px;
        }
        .responsive{
            width: 100%;
            display: flex;
            flex-direction:row;
            justify-content: initial;
            gap: 70px;
          /*  padding:12px;*/
        }
        .one{
            width: 60%; 
        }
        
        tbody{
            .responsive{
                gap: 100px; 
            }
            .two{
             margin-left: 60px;
            }   

        }
        thead{
            display: block;
            .three{
            gap:90px;
        }
        }
        th{
            margin-bottom: 25px;
        }
        tr{
            width: 100%;
            display: flex;
            flex-direction:row;
        }
       
        
        .datas{
           border-radius: 8px;
           margin-bottom: 18px;
          
        }
        td{
            padding:12px
        }
        .last{
            display: block !important;
        }
        .icon-youtube{
            cursor: pointer;
        }
        
    }
    } 
        
    
    

`