import { Styled } from ".";
import React, { Fragment } from "react";
import { Data } from "./interface";

interface FormartFC {
  dados: Array<Data>;
  successLaunches: number;
  failLaunches: number;
  DoughnutChart: React.FC;
}

export const GraphicPizzaContent: React.FC<FormartFC> = ({
  dados,
  successLaunches,
  failLaunches,
  DoughnutChart,
}) => {
  return (
    <Fragment>
      <Styled.Card>
        <h2>Lançamento de foguetes</h2>
        <div className="flex">
          <div>
            {dados
              ? dados.map((data, i: number) => (
                  <ul key={i}>
                    <li>
                      <div
                        style={{ backgroundColor: data.cores.hexadecimal }}
                        className="color"
                      ></div>
                      {data.name}
                    </li>
                  </ul>
                ))
              : "Carregando..."}
            <div>
              {successLaunches ? (
                <div>
                  <h3>Resultado de lançamento:</h3>
                  <p>Sucesso:{successLaunches}%</p>
                  <p>Falha:{failLaunches}%</p>
                </div>
              ) : (
                "Carregando..."
              )}
            </div>
          </div>
          <div>
            {dados ?  <DoughnutChart /> :"Carregando..." }
          </div>
        </div>
      </Styled.Card>
    </Fragment>
  );
};
