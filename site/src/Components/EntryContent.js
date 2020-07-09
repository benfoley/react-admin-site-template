import React, { useEffect, useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { Container, Header, Segment, Image } from 'semantic-ui-react'
import { RawHTML } from "Components/RawHTML"
import LazyLoad from 'react-lazyload';
import { format } from 'date-fns'

const EntryContent = props => {

  const { data } = props

  return (
    <LazyLoad height={200} offset={100}>
      <Segment className="card fluid">

        <Header as="h2" className="content-header">
          <Header as={Link} to={`/entry/${encodeURI(data.name)}`}>{data.name}</Header>
        </Header>

        <div className="content dont-break-out">
          <RawHTML>{data.body}</RawHTML>
        </div>


      </Segment>
    </LazyLoad>
  )
}

export default EntryContent