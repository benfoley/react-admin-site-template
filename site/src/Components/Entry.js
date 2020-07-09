import React, { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { useFirestoreConnect } from "react-redux-firebase"
import { Container, Segment, Image } from 'semantic-ui-react'
import NavBar from "Components/NavBar"
import EntryContent from "Components/EntryContent"

const Entry = () => {

  let { id } = useParams()

  // TODO should be able to get this from redux instead of looking up each time?
  let option = { collection: "entries" }
  useFirestoreConnect(option)
  const entries = useSelector(state => state.firestore.data.entries)

  // Find matching resource by name
  const filterEntries = (data, id) => {
    let arr = {}
    if (data) {
      for (var [key, item] of Object.entries(data)) {
        if (item.Headline === id) {
          arr = item
        }
      }
    }
    return arr
  }
  let data = filterEntries(entries, id)

  return (
    <Container className="entry-page">
      <NavBar />
      <Container text>
        <EntryContent 
          data={data} 
          showDownloadLink={true} 
          showFullPDFs={true} 
          />
      </Container>
    </Container>
  )
}

export default Entry
