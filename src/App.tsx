import { FormEvent } from "react";
import { useRecoilState } from "recoil";
import styled, { createGlobalStyle } from "styled-components";
import { InputData, InputDataSelector } from "./atom";

const GlobalCss = createGlobalStyle`
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
	margin: 0;
	padding: 0;
	border: 0;
	font-size: 100%;
	font: inherit;
	vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
	display: block;
}
body {
	line-height: 1;
}
ol, ul {
	list-style: none;
}
blockquote, q {
	quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
	content: '';
	content: none;
}
table {
	border-collapse: collapse;
	border-spacing: 0;
}
input:focus{
  outline: none;
}

`;
const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background-color: #304990;
  font-family: santorini-210;
`;

export default function App() {
  const [data, setData] = useRecoilState<number>(InputData);
  const [dataSelector, setDataSelector] = useRecoilState(InputDataSelector);

  const onChange = (event: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setData(+value);
  };

  const toMin = (event: FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setDataSelector(+value);
  };
  return (
    <Main>
      <GlobalCss />

      <input
        type={"number"}
        onChange={onChange}
        value={data}
        placeholder="hour"
      />
      <input
        type={"number"}
        value={dataSelector}
        onChange={toMin}
        placeholder="min"
      />
    </Main>
  );
}
