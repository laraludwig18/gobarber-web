import styled from 'styled-components';
import { shade } from 'polished';

export const AvatarInput = styled.div`
  margin-bottom: 32px;
  align-self: center;
  position: relative;

  img {
    width: 186px;
    height: 186px;
    object-fit: cover;
    border-radius: 50%;
  }

  label {
    position: absolute;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    border: 0;
    background: #ff9000;
    bottom: 0;
    right: 0;
    cursor: pointer;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }

    svg {
      width: 20px;
      height: 20px;
      color: #312e38;
    }

    &:hover {
      background-color: ${shade(0.2, '#ff9000')};
    }
  }
`;

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
