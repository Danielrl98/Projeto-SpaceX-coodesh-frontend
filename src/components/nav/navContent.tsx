import React, { Fragment } from "react";
import { Styled } from ".";
import { theme } from "../../theme/theme";

export const Nav: React.FC = () => {
  return (
    <Fragment>
      <Styled.Flex>
        <Styled.Icon>
          <img src={theme.icons.rocket}></img>
        </Styled.Icon>
        <Styled.Title>
          <h1>Space X</h1>
        </Styled.Title>
      </Styled.Flex>
    </Fragment>
  );
};
