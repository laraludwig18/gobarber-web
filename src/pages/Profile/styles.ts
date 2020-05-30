import styled from 'styled-components';

export const Container = styled.div`
  > header {
    height: 144px;
    position: relative;
    background-color: #28262e;

    display: flex;
    align-items: center;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;
    }

    svg {
      color: #999591;
      width: 24px;
      height: 24px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: -110px auto 0;
  width: 100%;

  form {
    margin: 20px 0;
    width: 340px;
    display: flex;
    flex-direction: column;

    h1 {
      margin-bottom: 24px;
      font-size: 20px;
    }
  }
`;
