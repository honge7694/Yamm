import React from 'react'
import { useRouter } from "next/router";


function foodinfo(props) {
  const router = useRouter();

    console.log(router)
  return (
    <div>
      foodinfo
    </div>
  )
}

export default foodinfo