import React from "react"
import { useFirestoreConnect, isLoaded } from "react-redux-firebase"
import { useSelector } from "react-redux"
import { useParams } from 'react-router-dom'
import { Container, Icon } from 'semantic-ui-react'
import hash from "object-hash"
import parse from 'html-react-parser';
import NavBar from "./NavBar"

const Page = () => {
  let { name } = useParams()
  let name_hash = hash(name)
  let option = { collection: "pages", where: ["name", "==", name], storeAs: name_hash }
  useFirestoreConnect(option)
  const pages = useSelector(state => state.firestore.ordered[name_hash])
  let data = isLoaded(pages) ? pages[0] : null

  return (
    <Container>
      <NavBar />
      <h1>{data && data.name}</h1>
      {data && parse(data.info)}
      {data && data.links && data.links.length > 0 &&
        <ul className="links">
          {data.links.map(link => (
            <li key={link.url}>
              <a href={link.url} title={link.title} target="_blank">
                <Icon name="angle right" color='green' />
                       &nbsp;
                      {link.title}
              </a>
            </li>
          ))}
        </ul>
      }
    </Container>
  )
}

export default Page
