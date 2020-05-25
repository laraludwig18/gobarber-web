import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    font-size: 20px;
    font-weight: 400;
    color: #999591;
  }

  div {
    background: #3e3b47;
    border-radius: 10px;
    display: flex;
    align-items: center;
    padding: 16px 24px;
    margin-top: 24px;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      height: 80%;
      width: 2px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
      font-size: 24px;
    }

    span {
      margin-left: auto;
      display: flex;
      align-items: center;
      color: #999591;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`;

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  > p {
    margin-top: 8px;
    color: #ff9000;
    font-weight: 500;

    span + span::before {
      content: '|';
      margin: 0 8px;
    }
  }
`;

export const Section = styled.section`
  margin-top: 48px;

  > strong {
    color: #999591;
    font-size: 20px;
    line-height: 26px;
    border-bottom: 1px solid #3e3b47;
    display: block;
    padding-bottom: 17px;
    margin-bottom: 16px;
  }
`;
