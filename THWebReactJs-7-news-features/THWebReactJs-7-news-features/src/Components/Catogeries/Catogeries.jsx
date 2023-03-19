import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import instance from '../../Services/Axois';
import { useNavigate } from 'react-router-dom';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import { LeftArrow, RightArrow } from "./ArrowsFilter";

const CatogeriesFilter = ({ selected, setselected, setData, route }) => {
  const navigate = useNavigate();
  const [filters, setfilters] = useState()
  const location = useLocation()
  console.log(location,"locationlocationlocation");
  const { guidesname } = useParams()

  const handleItemClick = (itemId,item) => () => {
    console.log(item,"itemmmmmmmmmmmmmm");
    // setselected(itemId)
    onFilterClick(item)
  };
  const getCatogerisData = async () => {
    await instance.get(`/website/categories?type=${route.slice(0, -1)}`)
      .then(response => {
        setfilters(response?.data?.data?.records)
        if (location?.state) {
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
        navigate(filter?.slug?`/${route}/${filter?.slug}`:location?.pathname)

      })
      .catch(response => {
        setData([])
        console.log(response, "responseresponse");
      })
    // setselected(prev=>[...prev,filter])
  }

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}  
    //  options={{
    //   ratio: 0.2,
    //   rootMargin: "5px",
    //   threshold: [0.01, 0.05, 0.5, 0.75, 0.95, 1]
    // }}
    transitionDuration={600}
    >
      {filters && filters?.map((item) => (
        <Card
          itemId={item?.id} // NOTE: itemId is required for track items
          title={item?.title}
          key={item?.id}
          onClick={handleItemClick(item?.id,item)}
          selected={item?.id === selected.id}
        />
      ))}
    </ScrollMenu>
  );
}


function Card({ onClick, selected, title, data }) {
  const visibility = React.useContext(VisibilityContext);

  return (
    <div
      onClick={() => onClick(visibility)}
      style={{
        // width: '160px',
      }}
      tabIndex={0}
    >
      <div className={`content-filter ${selected ? 'catActive' : ''}`}>
        <h1>{title}</h1>
      </div>
      <div
        style={{
          height: "20px"
        }}
      />
    </div>
  );
}

export default CatogeriesFilter