import { Fragment } from "react";
import { Components } from "../index";
import { Layouts } from "../index";
import styled from "styled-components";

export default function App() {
  return (
    <Fragment>
      <div>
        <Components.Nav></Components.Nav>
        <Graphics>
          <Layouts.GraphicPizza ></Layouts.GraphicPizza>
          <Layouts.GrafichBar></Layouts.GrafichBar>
        </Graphics>
        <Layouts.Launches></Layouts.Launches>
      </div>
    </Fragment>
  );
}
const Graphics = styled.div`
  width: 100%;
  display: flex;
  gap: 20px;

  main {
    width: 50%;
  }

  @media (max-width:767px) {
    flex-direction: column;

    main {
    width: auto;
    margin: 0 24px;
    }
  }
`;
