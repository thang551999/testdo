import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { sportAPI } from "../api/sport/sport";

const GetAllServiceSport = () => {
  const [serviceSport, setServiceSport] = useState([]);

  useEffect(() => {
    sportAPI
      .getSport()
      .then((res) => {
        console.log(res.data);
        setServiceSport(res.data)
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <h2>Tất cả các dịch vụ thể thao giải trí</h2>
        <br />
        {/* <input
          id="search"
          type="text"
          className="form-control"
          placeholder="Search for name and email......"
        />
        <br /> */}
        <table className="table">
          <thead>
            <tr>
              <th>Tên dịch vụ</th>
              <th>Nội dung</th>
              <th>Ảnh</th>
              <th>Giá</th>
            </tr>
          </thead>
          <tbody id="table">
            {serviceSport.map((serviceSport) => (
              <>
                {serviceSport.dichvu.map((dichvu) => (
                  <tr key={dichvu.id}>
                    <td>{dichvu.tendichvu}</td>
                    <td style={{whiteSpace: "pre-wrap"}}>{dichvu.noidung}</td>
                    <td style={{width:"25%"}}>
                        <Image src={dichvu.image} alt="loading..." style={{width: "100%"}}/>
                    </td>
                    <td>{dichvu.gia}</td>
                  </tr>
                ))}
              </>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetAllServiceSport;
