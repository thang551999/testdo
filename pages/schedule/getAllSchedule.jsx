import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { placeAPI } from "../api/place/place";
import { Button, Modal } from "react-bootstrap";
import { scheduleAPI } from "../api/schedule/schedule";
import { useRouter } from "next/dist/client/router";
const GetAllSchedule = () => {
  const Router = useRouter();
  const [placeSchedule, setPlaceShedule] = useState([]);
  const [schedule, setSchedule] = useState([]);
  const [lgShow, setLgShow] = useState(false);
  const [message, setMessage] = useState("");
  const [idChedule, setIdChedule] = useState("");
  useEffect(() => {
    scheduleAPI.getSchedule().then((res) => {
      console.log(res.data)
      setSchedule(res.data);
    });
  }, []);

  const handleDelete = (id) => (e) => {
    scheduleAPI
      .deleteSchedule(id)
      .then((res) => {
        // console.log(res)
        setMessage(res.data.message);
        // Router.replace("/pt/getallpt")
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        setMessage("Bạn không được quyền xóa");
      });
  };

  return (
    <div className="getplace">
      <div className="container alert alert-light">
        {" "}
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h2>Tất cả các lịch tập</h2>
          <Button
            variant="primary"
            onClick={() => {
              Router.push("/schedule/createSchedule");
            }}
          >
            Thêm lịch tập
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
              <th>Tên lịch hẹn</th>
              <th>Thời gian bắt đầu</th>
              <th>Thời gian kết thúc</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Địa điểm</th>
              <th style={{ width: "20%" }}>Action</th>
            </tr>
          </thead>
          <tbody id="table">
                {schedule.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.name}</td>
                    <td>{schedule.thoigianbatdau}</td>
                    <td>{schedule.thoigianketthuc}</td>
                    <td>{schedule.gia}</td>
                    <td>{schedule.soluong}</td>
                    <td>{placeSchedule.diachi}</td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setIdChedule(schedule.id);
                          setLgShow(true);
                          setMessage("");
                        }}
                      >
                        Xóa Chedule
                      </Button>
                      <Modal
                        size="lg"
                        show={lgShow}
                        onHide={() => setLgShow(false)}
                        aria-labelledby="example-modal-sizes-title-lg"
                      >
                        <Modal.Header closeButton>
                          <Modal.Title id="example-modal-sizes-title-lg">
                            Bạn có muốn xóa Schedule này không
                          </Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="place-delete">
                          <p>{message}</p>
                          <Button
                            variant="primary"
                            onClick={handleDelete(idChedule)}
                          >
                            Xóa Chedule
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
  );
};

export default GetAllSchedule;
