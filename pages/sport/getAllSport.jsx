import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { sportAPI } from "../api/sport/sport";
import { Carousel, Container } from "react-bootstrap";
const GetAllSport = () => {
  const Router = useRouter();
  const [adminSport, setAdminSport] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [idSport, setIdSport] = useState("");

  useEffect(() => {
    sportAPI
      .getSport()
      .then((res) => {
        // console.log(res);
        setAdminSport(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleUpdateStatusSport = (id) => (e) => {
    const body = {
      sport: id,
      update: "1",
    };
    sportAPI
      .updateStatusSport(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatusSportHide = (id) => (e) => {
    const body = {
      sport: id,
      update: "0",
    };
    sportAPI
      .updateStatusSport(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleCreateService = (e) => {
    Router.push("/serviceSport/createServiceSport");
  };

  const handleDelete = (id) => (e) => {
    sportAPI
      .deleteSport(id)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="getall-spa">
      <div className="getplace">
        <div className="container alert alert-light">
          {" "}
          <div style={{ display: "flex", justifyContent: "space-between" ,marginBottom:'10px'}}>
          <h2>Tất cả thể thao giải trí</h2>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/sport/createSport");
            }}
          >
           Thêm thể thao
          </Button>
        </div>
          <br />
          <input
            id="search"
            type="text"
            className="form-control"
            placeholder="Search for name and email......"
          />
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Địa chỉ</th>
                <th>Ảnh đại diện</th>
                <th>Status</th>
                <th style={{width: "50%"}}>Action</th>
              </tr>
            </thead>
            <tbody id="table">
              {adminSport.map((sport) => (
                <tr key={sport.id}>
                  <td>{sport.name}</td>
                  <td>{sport.diachi}</td>
                  <td style={{ width: "70%" }}>
                  <Carousel interval={3000000} nextLabel='' prevLabel='' variant="dark" >
                {sport.image &&
                  sport.image.split(",").map((e, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <Image
                          className="d-block w-100"
                          src={e}
                          alt={`anh ${index} `}
                        />
                        
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
                  </td>
                  <td>
                    {sport.status == "0" ? (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSport(sport.id)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSportHide(sport.id)}
                      >
                        Hiển Thị
                      </Button>
                    )}
                  </td>
                  <td style={{height:'100%',flexDirection:"column",justifyContent:'space-between'}}>
                    <Button style={{margin:'10px'}} variant="primary" onClick={handleCreateService}>
                      Thêm dịch vụ
                    </Button>{" "}
                    
                    <Button
                    style={{margin:'10px'}}
                      variant="primary"
                      onClick={() => {
                        setIdSport(sport.id);
                        setLgShow(true);
                      }}
                    >
                      Xóa Sport
                    </Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Bạn có muốn xóa Sport này không
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="place-delete">
                        <Button
                          variant="primary"
                          onClick={handleDelete(idSport)}
                        >
                          Xóa Sport
                        </Button>{" "}
                      </Modal.Body>
                    </Modal>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetAllSport;
