import React from 'react'

const WaistRecord = ({date, measure}) =>
  <div>
    `${date} ${measure}`
    <button>Edit</button>
    <button>Delete</button>
  </div>
