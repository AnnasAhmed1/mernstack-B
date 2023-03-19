import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import instance from '../../Services/Axois';
import { useNavigate } from  'react-router-dom';
const CatogeriesFilterOld = ({ selected, setselected, setData, route }) => {
  const navigate = useNavigate();
  const [filters, setfilters] = useState()
  const location = useLocation()
  const {guidesname} = useParams()
  // console.log(location?.state,"location?.state");
  console.log(guidesname,"guidesnameguidesname?.state");
  const getCatogerisData = async () => {
    await instance.get(`/website/categories?type=${route.slice(0, -1)}`)
      .then(response => {
        setfilters(response?.data?.data?.records)
        if(location?.state){
          setselected(location?.state)
          onFilterClick(location?.state)
        }
        else {
          setselected(false)
          // onFilterClick(response?.data?.data?.records[0])
        }
      })
      .catch(response => {
        console.log(response, "responseresponse");
      })
  }
  useEffect(() => {
    getCatogerisData()
    if (!selected) {
      instance.get(`/website/${route}`)
        .then(response => {
          setData(response?.data?.data?.records)
        })
        .catch(response => {
          setData([])
          console.log(response, "responseresponse");
        })
    }
  }, [])

  const onFilterClick = (filter) => {
    let queryString = `categoryIds[]=${filter?.id}`
    instance.get(`/website/${route}?${queryString}`)
      .then(response => {
        setData(response?.data?.data?.records)
        setselected(filter)
        navigate(`/${route}/${filter?.slug || guidesname }`)

      })
      .catch(response => {
        setData([])
        console.log(response, "responseresponse");
      })
    // setselected(prev=>[...prev,filter])
  }
  
  return (
    <div className="container">
      <div className="Catogeries-filters">
        {filters?.map((filter) => {
          return (
            <>
            <div key={filter?.id} className={`content-filter ${filter?.id == selected?.id ? 'catActive' : ''}`} onClick={() => onFilterClick(filter)}>
              <h1>{filter?.title}</h1>
            </div>
            </>
          );
        })}
      </div>
    </div>
  )
}

export default CatogeriesFilterOld