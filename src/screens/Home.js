import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import img1 from '../Images/carousel1.jpeg'
import img2 from '../Images/carousel2.jpeg'
import img3 from '../Images/carousel3.jpeg'


export default function Home() {

  const [foodItem, setfoodItem] = useState([]); 
  const [foodCat, setfoodCat] = useState([]);

  const [search, setSearch] = useState("");
  const onChange = (evt) => {
    setSearch(evt.target.value)
  }


  const loadData = async () => {
    let response = await fetch("https://gofoodbackend-hbqu.onrender.com/api/showfoodData", {
      method: "POST",
      header: {
        "Content-Type": "application/json"
      }
    });
    response = await response.json();
    console.log(response[0], response[1]);
    setfoodItem(response[0])
    setfoodCat(response[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <div>
      <div><Navbar /> </div>
      <div>
        <div id="carouselExampleFade" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
          <div className="carousel-inner" id="carousel">
            <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }}>
              <div className="d-flex justify-content-center" >
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={onChange} />
              </div>
            </div>
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>

            <div className="carousel-item">
              <img src={img2} className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
            <div className="carousel-item">
              <img src={img3} className="d-block w-100" alt="..." style={{ filter: "brightness(30%)" }} />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>


      <div className="container">
        {foodCat.map((data) => {
          return (
              <div className=" mb-3">
                <div key={data._id} className=" row fs-3 m-3">
                  {data.CategoryName}
                  <hr />
                  {
                    foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))).map(filterItem => {
                      return (
                        <div key={filterItem._id} className="col-12 col-md-6  col-lg-3 ">
                          <Card itemsData={filterItem} options={filterItem.options[0]} />
                        </div>
                      )
                    })
                  }
                </div>
              </div>
          )
        })
        }
      </div>
      <div><Footer /> </div>
    </div >
  )
}
