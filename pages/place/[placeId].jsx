import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getPlace } from "../api/place/place";
import StarRatings from "react-star-ratings";
import {
  Col,
  Row,
  Image,
  Modal,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Carousel, Container } from "react-bootstrap";
const Post = () => {
  const router = useRouter();
  const { placeId } = router.query;
  const [place, setPlace] = useState({});

  useEffect(() => {
    if (placeId) {
      getPlace(placeId).then((e) => {
        setPlace(e.data[0]);
        console.log(e.data[0]);
      });
    }
  }, [placeId]);
  return (
    <div className="getplace">
      <div className="container alert alert-light">
        <Button
          style={{ marginRight: "10px", width: "200px", height: "40px" }}
          variant="primary"
          onClick={() => {
            router.push("/place/getAllPlace");
          }}
        >
          Tất cả phòng gym
        </Button>
        <div style={{ display: "flex", marginBottom: "10px" }}>
          <h1 className="title">Chi tiết phòng gym {place?.name}</h1>
        </div>
        <Row>
          <Col lg={6} sm={6} md={12} xs={12}>
            <div className="multi-image">
              <Carousel interval={3000000}>
                {place.image &&
                  place.image.split(",").map((e, index) => {
                    return (
                      <Carousel.Item key={index}>
                        <Image
                          className="d-block w-100"
                          src={e}
                          alt="First slide"
                        />
                      </Carousel.Item>
                    );
                  })}
              </Carousel>
            </div>
          </Col>
          <Col lg={6} sm={6} md={12} xs={12}>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <p
                style={{
                  marginTop: "5px",
                  marginRight: "10px",
                  fontWeight: "700",
                }}
              >
                {" "}
                Đánh giá :{" "}
              </p>
              <StarRatings
                rating={
                  place.star === "NaN" || !place.star
                    ? 4.5
                    : Number.parseFloat(place.star)
                }
                starRatedColor="#FFD700"
                numberOfStars={5}
                starDimension="20px"
                starSpacing="5px"
                name="rating"
              />
            </div>
            <p
              style={{
                marginTop: "5px",
                marginRight: "10px",
                fontWeight: "700",
              }}
            >
              Địa chỉ : {place?.diachi}
            </p>
            <div
              style={{
                marginTop: "5px",
                marginRight: "10px",
                fontWeight: "700",
                whiteSpace:'pre-wrap'
              }}
            >
              Thông tin chi tiết : {place?.thongtinthem}
            </div>
          </Col>
        </Row>
        <p style={{ marginTop: "5px", marginRight: "10px", fontWeight: "700" }}>
          Phản hồi khách hàng :
        </p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {place.listFeedback &&
            place.listFeedback.map((e) => {
              return (
                <div
                  style={{
                    display: "flex",
                    boxShadow: "0 2px 4px 0 rgb(0 0 0 / 20%)",

                    margin: "10px",
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                  key={e.id}
                >
                  {" "}
                  <Image
                    src="https://static.xx.fbcdn.net/rsrc.php/v1/yi/r/odA9sNLrE86.jpg"
                    alt="avatar"
                    style={{ width: "100px" }}
                  />
                  <div style={{ marginLeft: "10px" }}>
                    <p>Tên tài khoản :{e?.customer.name}</p>
                    <p>Số điện thoại :{e?.customer.name}</p>
                    <p>Nội dung : {e.content}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Post;
