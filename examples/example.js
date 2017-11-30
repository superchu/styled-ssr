const React = require('react');
const { default: styled } = require('styled-components');
const render = require('../index.js');

const Wrapper = styled.div`
color: #abcdef;

& p {
  color: #000;
}
`;

const Demo = () => {
  return React.createElement(Wrapper, {}, React.createElement('p', {}, 'Hello World'));
};

console.log(render(Demo()));
