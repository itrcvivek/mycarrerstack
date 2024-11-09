import React from 'react'
import Helmet from "react-helmet"
interface MetaDataProps {
  title: string;
  description:string;
}
function MetaData({title, description}:MetaDataProps) {
  return (
    <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
    </Helmet>
  )
}

export default MetaData