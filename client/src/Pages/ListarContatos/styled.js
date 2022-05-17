import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContatoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
    color: #eee;
  }

  div + div {
    border-top: 1px solid #eee;
  }
`;
export const Container = styled.div`
    color: white;
    background-color: white;
    width: 860px;
    border-radius: 5px;
    padding: 10px;
`
export const EditarContato = styled(Link)`
  display: block;
  padding: 20px 0 10px 0;
`;
