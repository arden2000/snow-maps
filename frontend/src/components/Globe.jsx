
import React, { useState, useEffect } from 'react'
import { geoOrthographic, geoPath } from 'd3-geo'
import { feature } from 'topojson-client'
import { Feature, FeatureCollection, Geometry } from 'geojson'
// import './WorldMap.scss'
import Button from '@mui/material/Button';
import AnimationFrame from './AnimationFrame.tsx'
import CloseIcon from "@mui/icons-material/Close";



const uuid = require('react-uuid')



const scale = 200
const cx = 400
const cy = 150
const initRotation = 50

const Globe = () => {
  const [geographies, setGeographies] = useState([])
  const [rotation, setRotation] = useState(initRotation)
  const [isRotate, setIsRotate] = useState(true)

  useEffect(() => {
    fetch('/data/world.json').then((response) => {
      if (response.status !== 200) {
        // eslint-disable-next-line no-console
        console.log(`Houston we have a problem: ${response.status}`)
        return
      }
      response.json().then((worldData) => {
        const mapFeatures = ((feature(worldData, worldData.objects.countries))).features
        setGeographies(mapFeatures)
      })
    })
  }, [])

  // geoEqualEarth
  // geoOrthographic
  const projection = geoOrthographic().scale(scale).translate([cx, cy]).rotate([rotation, 0])

  AnimationFrame(() => {
    if (isRotate) {
      let newRotation = rotation
      if (rotation >= 360) {
        newRotation = rotation - 360
      }
      setRotation(newRotation + 0.5)
      // console.log(`rotation: ${  rotation}`)
    }
  })

  function returnProjectionValueWhenValid(point, index) {
    const retVal = projection(point)
    if (retVal?.length) {
      return retVal[index]
    }
    return 0
  }



  return (
    <>
      <svg width={scale * 3} height={scale * 3} viewBox="0 0 800 450">
        <g>
          <circle fill="#f2f2f2" cx={cx} cy={cy} r={scale} />
        </g>
        <g>
          {(geographies).map((d, i) => (
            <path
              key={`path-${uuid()}`}
              d={geoPath().projection(projection)(d)}
              fill={`rgba(38,50,56,${(1 / (geographies ? geographies.length : 0)) * i})`}
              stroke="aliceblue"
              strokeWidth={0.5}
            />
          ))}
        </g>
        <g>
          
        </g>
      </svg>
    </>
  )
}

export default Globe;

