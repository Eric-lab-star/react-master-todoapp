import { Outlet } from "react-router-dom";
import styled from "styled-components";

const Title = styled.h1`
  font-size: 40px;
  margin-top: 50px;
`;

export const Header = () => {
  return (
    <>
      <Title>To Do List</Title>
      <Outlet />
    </>
  );
};
