import React, {Fragment} from "react"
import Linkify from 'react-linkify'
import parse from 'html-react-parser';

export const RawHTML = ({ children, className = "" }) => {
  return (
    <Linkify>
      {children && parse(children)}
    </Linkify>
  )
}