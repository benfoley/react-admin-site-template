import React, { useCallback, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useFirestoreConnect } from "react-redux-firebase"
import _ from 'lodash'
import { Container, Button, Segment, Image, Input } from 'semantic-ui-react'
import NavBar from "Components/NavBar"
import EntryContent from "Components/EntryContent"

const EntryList = () => {

  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState("name")
  const [sortOrder, setSortOrder] = useState("<")
  const [entries, setEntries] = useState([])
  const delayedQuery = useCallback(_.debounce(term => setSearchTerm(term), 500), []);

  let option = { collection: "entries" }
  useFirestoreConnect(option)
  const rawEntries = useSelector(state => state.firestore.ordered.entries)

  const filterEntries = data => {
    let filtered = []

    // Strip punctuation and spaces and convert to lowercase for better string comparison for sorting
    const sort_prep = (str) => {
      return str.replace(/[^\w\s]|_/g, "").replace(/\s+/g, "").toLowerCase();
    }

    // Variable comparison operator technique from https://stackoverflow.com/a/10591359
    const name_operator_table = {
      '>': (a, b) => (sort_prep(a.name) > sort_prep(b.name)),
      '<': (a, b) => (sort_prep(a.name) < sort_prep(b.name))
    }

    if (data) {
      data.map(item => {
        const nameMatch = item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase()) ? true : false
        const textMatch = item.body && item.body.toLowerCase().includes(searchTerm.toLowerCase()) ? true : false
        if (nameMatch || textMatch) {
          const myItem = { ...item }
          filtered = [...filtered, myItem]
        }
      })
      // Sort
      if (sortBy === "name") filtered.sort((a, b) => name_operator_table[sortOrder](a, b) ? 1 : -1)
    }
    return filtered
  }

  useEffect(() => {
    if (rawEntries === entries) return
    setEntries(filterEntries(rawEntries))
  }, [rawEntries, searchTerm, sortBy, sortOrder])

  function changeSearchTerm(e) {
    // TODO sanitise etc
    // setSearchTerm(e.target.value)
    // debounce version from https://medium.com/@rajeshnaroth/using-throttle-and-debounce-in-a-react-function-component-5489fc3461b3
    delayedQuery(e.target.value)
  }

  function changeSortBy() {
    // const newSortBy = (sortBy === "date") ? "name" : "date"
    setSortBy("name")
  }

  function changeSortOrder() {
    const newSortOrder = (sortOrder === "<") ? ">" : "<"
    console.log("newSortOrder", newSortOrder)
    setSortOrder(newSortOrder)
  }

  

  return (
    <Container className="entry-list-page">
      <NavBar />
      <Container text>
        <div className="list-tools">
          <Input
            icon='search'
            placeholder='Search...'
            onChange={changeSearchTerm}
          />
          <div>
          <Button basic onClick={changeSortBy}>
            Sort by name
            {/* {sortBy === "date" ? " name" : " date"} */}
          </Button>
            <Button basic icon={sortOrder === "<" ? "arrow alternate circle down" : "arrow alternate circle up"} onClick={changeSortOrder} />
          </div>
        </div>

        {entries && entries.map((data, i) => (
          <EntryContent
            key={i}
            data={data}
          />
        ))
        }
      </Container>
    </Container>
  )
}

export default EntryList
