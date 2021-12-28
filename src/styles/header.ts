import styled from 'styled-components'
import {colors} from '../styles/color'


export const SHeader = styled.h1`
color: white;
  list-style-type: none;
  margin: 0;
  margin-left: -10px;
  padding: 0;
  overflow: hidden;
  background-color: ${colors.bl};
  position: fixed;
  top: 0;
  width: 110%;
  text-align: center;
  z-index: 9;
  padding-top: 8px;
  padding-bottom: 8px;
`