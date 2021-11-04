import { useRouter } from "next/router";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Modal, Image } from "react-bootstrap";
import { spaAPI } from "../api/spa/spa";
import { Carousel, Container } from "react-bootstrap";
const GetAllSpa = () => {
  const [adminSpa, setAdminSpa] = useState([]);
  const Router = useRouter();
  const [lgShow, setLgShow] = useState(false);
  const [idSpa, setIdSpa] = useState("");

  useEffect(() => {
    spaAPI
      .getAllSpa()
      .then((res) => {
        // console.log(res);
        // setArrayImage(res.data.image.split(";"));
        setAdminSpa(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCreateService = (e) => {
    e.preventDefault();
    Router.push("/serviceSpa/createService");
  };

  const handleUpdateStatusSpa = (id) => (e) => {
    const body = {
      update: "1",
      spa: id,
    };
    console.log(body);
    spaAPI
      .updateStatusSpa(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateStatusSpaHide = (id) => (e) => {
    const body = {
      update: "0",
      spa: id,
    };
    console.log(body);
    spaAPI
      .updateStatusSpa(body)
      .then((res) => {
        console.log(res);
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => (e) => {
    console.log(id);
    spaAPI
      .deleteSpa(id)
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
          <h2>Tất cả các chăm sóc sức khoẻ làm đẹp</h2>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/spa/createSpa");
            }}
          >
           Thêm spa
          </Button>
        </div>
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
                <th style={{width: "30%"}}>Action</th>
              </tr>
            </thead>
            <tbody id="table">
              {adminSpa.map((spa) => (
                <tr key={spa.id}>
                  <td>{spa.name}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>{spa.diachi}</td>
                  <td style={{ width: "65%" }}>
                  <Carousel interval={3000000} nextLabel='' prevLabel='' variant="dark" >
                {spa.image &&
                  spa.image.split(",").map((e, index) => {
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
                    {spa.status == "0" ? (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSpa(spa.id)}
                      >
                        Ẩn
                      </Button>
                    ) : (
                      <Button
                        variant="primary"
                        onClick={handleUpdateStatusSpaHide(spa.id)}
                      >
                        Hiển Thị
                      </Button>
                    )}
                  </td>
                  <td style={{flexDirection:'column',justifyContent:'space-between'}}>
                    <Button style={{margin:'10px'}} variant="primary" onClick={handleCreateService}>
                      Thêm dịch vụ
                    </Button>{" "}
                    <Button
                    style={{margin:'10px'}}
                      variant="primary"
                      onClick={() => {
                        setIdSpa(spa.id);
                        setLgShow(true);
                      }}
                    >
                      Xóa Spa
                    </Button>
                    <Modal
                      size="lg"
                      show={lgShow}
                      onHide={() => setLgShow(false)}
                      aria-labelledby="example-modal-sizes-title-lg"
                    >
                      <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                          Bạn có muốn xóa Spa này không
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body className="place-delete">
                        <Button variant="primary" onClick={handleDelete(idSpa)}>
                          Xóa Spa
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

export default GetAllSpa;
