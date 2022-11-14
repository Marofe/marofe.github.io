import React from 'react';
import './Notes.css';
import Helmet from 'react-helmet';
const NotesList = (props) => {
    let list= props.notes.map((note)=>(
        <div className="listCell">
            <h2><a href={'/notes/'+note.link}>{note.title}</a></h2>
            <p>{note.desc}</p>
        </div>
    ));
    return   <div>
  <Helmet>
    <title>Notes | Marcos Rogério Fernandes</title>
    <meta name="description" content="Here you will find my research notes." />
</Helmet>
<div className="top">
   <h1>My Notes</h1>
   <p>The following contents are some of my research notes about a few topics that I have been working on.</p>
</div>
{list}
</div>
}
export default NotesList;