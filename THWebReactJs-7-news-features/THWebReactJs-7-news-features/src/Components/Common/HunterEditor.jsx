import React from 'react'
import PicksCard from './Slider/PicksCard';
import SlickSlides from './Slider/SlickSlides';
import PickImage1 from "../../Assets/images/pickimg.png";
import PickImage2 from "../../Assets/images/pickimg2.png";

const HunterEditor = () => {
    const editorsPicks = [
        {
          key: 1,
          title: "San Beach",
          description: "There are many variations of passages of Lorem Ipsum",
          image: PickImage1,
        },
        {
          key: 2,
          title: "San Brew",
          description: "There are many variations of passages of Lorem Ipsum",
          image: PickImage2,
        },
        {
          key: 3,
          title: "San Beach",
          description: "There are many variations of passages of Lorem Ipsum",
          image: PickImage1,
        },
        {
          key: 4,
          title: "San Brew",
          description: "There are many variations of passages of Lorem Ipsum",
          image: PickImage2,
        },
        {
          key: 5,
          title: "John Doe",
          description: "There are many variations of passages of Lorem Ipsum",
          image: PickImage2,
        },
      ];
  return (
    <section className="editors-picks-wrapper">
        <div className="container">
          <h2>Huntr editor's picks</h2>

          {/* Slider */}
          <SlickSlides total={editorsPicks.length} slidesToShow={4}>
            {editorsPicks?.map((pick) => {
              return <PicksCard key={pick?.key} data={pick} />;
            })}
          </SlickSlides>
        </div>
      </section>
  )
}

export default HunterEditor