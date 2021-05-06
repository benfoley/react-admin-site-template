import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { useFirestoreConnect } from "react-redux-firebase"
import { useSelector } from "react-redux"
import { Button, Container, Divider } from 'semantic-ui-react'
import NavBar from "./NavBar"

const PageList = () => {
  let option = { collection: "pages" }
  useFirestoreConnect(option)
  const firestoreData = useSelector(state => state.firestore.ordered.pages)

  const [pages, setPages] = useState([])
  const [sortOrder, setSortOrder] = useState(">")

  const changeSortOrder = () => {
    const newSortOrder = (sortOrder === "<") ? ">" : "<"
    setSortOrder(newSortOrder)
  }

  useEffect(() => {
    if (firestoreData === pages) return
    setPages(filterData(firestoreData))
  }, [firestoreData, sortOrder])

  const addItemToFiltered = (filtered, item) => {
    return [...filtered, { ...item }]
  }

  const filterData = data => {
    let filtered = []
    // Variable comparison operator technique from https://stackoverflow.com/a/10591359
    const name_operator_table = {
      '>': (a, b) => (a.name > b.name),
      '<': (a, b) => (a.name < b.name)
    }
    // Sort
    if (data) {
      data.map(item => {
        // Do filtering here ...
        filtered = addItemToFiltered(filtered, item)
        filtered.sort((a, b) => name_operator_table[sortOrder](a, b) ? 1 : -1)
      }
      )
    }
    return filtered
  }


  return (
    <Container>
      <NavBar />
      <h1>Pages</h1>
      <p>This is a list of pages.</p>
      <Divider />
      <div className="list-tools">
        <Button
          basic
          circular
          color="green"
          icon={sortOrder === "<" ?
            "arrow up" :
            "arrow down"}
          onClick={changeSortOrder} />
      </div>

      {pages && pages.map(page => (
        <div key={page.id}>
          <Link to={`/page/${encodeURI(page.name)}`}>{page.name}</Link>
        </div>
      ))}
    </Container>
  )
}
export default PageList

