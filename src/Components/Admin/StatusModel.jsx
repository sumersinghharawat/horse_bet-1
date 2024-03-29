import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./AdminDashboard.css";
import { Context } from "../../App";
import { db } from "../../config/firebase";
import ReactLoading from "react-loading";

const StatusModel = (props) => {
  const { betData, amountData } = useContext(Context);
  const [dividend, setDividend] = useState(0);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [lossLoading, setLossLoading] = useState(false);
  const [adminAmountData, setAdminAmountData] = useState();
  const [userBetData, setUserBetData] = useState([]);
  useEffect(() => {
    db.collection("users")
      .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
      .onSnapshot((snapshot) => {
        setAdminAmountData(snapshot.data());
      });
    db.collection("participant")
      .doc(props?.updateData?.data?.user_id)
      .onSnapshot((snapshot) => {
        setUserBetData(snapshot.data()?.data);
      });
  }, []);

  const handleChange = async (event) => {
    if (event.target.checked) {
      setPaymentLoading(true);
      db.collection("participant")
        .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
        .set({
          data: betData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "enabled";
              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        });
      db.collection("participant")
        .doc(props?.updateData?.data?.user_id)
        .set({
          data: userBetData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "enabled";
              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        })
        .then(async (dd) => {
          db.collection("users")
            .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
            .update({
              ...adminAmountData,
              amount:
                Number(adminAmountData?.amount) -
                (Number(props?.updateData?.data?.user_amount) *
                  (Number(props?.updateData?.data?.value) -
                    (Number(props?.updateData?.data?.value) * dividend) / 100) +
                  Number(props?.updateData?.data?.user_amount)),
            })
            .then(function () {
              setPaymentLoading(false);
            });
          db.collection("users")
            .doc(props?.updateData?.data?.user_id)
            .update({
              ...amountData,
              amount:
                Number(amountData.amount) +
                (Number(props?.updateData?.data?.user_amount) *
                  (Number(props?.updateData?.data?.value) -
                    (Number(props?.updateData?.data?.value) * dividend) / 100) +
                  Number(props?.updateData?.data?.user_amount)),
            })
            .then(() => {
              setDividend(0);
              props.onHide();
            });
        });
    } else {
      setPaymentLoading(true);
      db.collection("participant")
        .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
        .set({
          data: betData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";
              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        });
      db.collection("participant")
        .doc(props?.updateData?.data?.user_id)
        .set({
          data: userBetData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";
              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        })
        .then(async (dd) => {
          db.collection("users")
            .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
            .update({
              ...adminAmountData,
              amount:
                Number(adminAmountData?.amount) +
                (Number(props?.updateData?.data?.user_amount) *
                  (Number(props?.updateData?.data?.value) -
                    (Number(props?.updateData?.data?.value) * dividend) / 100) +
                  Number(props?.updateData?.data?.user_amount)),
            })
            .then(function () {
              setPaymentLoading(false);
            });
          db.collection("users")
            .doc(props?.updateData?.data?.user_id)
            .update({
              ...amountData,
              amount:
                Number(amountData.amount) -
                (Number(props?.updateData?.data?.user_amount) *
                  (Number(props?.updateData?.data?.value) -
                    (Number(props?.updateData?.data?.value) * dividend) / 100) +
                  Number(props?.updateData?.data?.user_amount)),
            })
            .then(() => {
              setDividend(0);
              props.onHide();
            });
        });
    }
  };

  const handleLossChange = async (event) => {
    if (event.target.checked) {
      setLossLoading(true);
      db.collection("participant")
        .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
        .set({
          data: betData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";

              data.withdraw = false;
              data.loss = true;
            }
            return data;
          }),
        });
      db.collection("participant")
        .doc(props?.updateData?.data?.user_id)
        .set({
          data: userBetData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";

              data.withdraw = false;
              data.loss = true;
            }
            return data;
          }),
        })
        .then(async (dd) => {
          setLossLoading(false);
        });
    } else {
      setLossLoading(true);
      db.collection("participant")
        .doc("gP7ssoPxhkcaFPuPNIS9AXdv1BE3")
        .set({
          data: betData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";

              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        });
      db.collection("participant")
        .doc(props?.updateData?.data?.user_id)
        .set({
          data: userBetData.map((data, index) => {
            if (
              props?.updateData?.data?.time === data.time &&
              props?.updateData?.data?.user_id === data.user_id &&
              props?.updateData?.data?.race_number === data.race_number &&
              props?.updateData?.data?.horce_number === data.horce_number &&
              props?.updateData?.data?.venue === data.venue
            ) {
              data.status = "disabled";

              data.withdraw = false;
              data.loss = false;
            }
            return data;
          }),
        })
        .then(async (dd) => {
          setLossLoading(false);
        });
    }
  };
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          status update
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Dividend ( IN %)</Form.Label>
            <Form.Control
              type="number"
              name="dividend"
              required
              placeholder="Enter divident amount"
              value={dividend}
              onChange={(e) => setDividend(e.target.value)}
            />
          </Form.Group>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <p>
              Potential Amount :{"  "}
              {Number(props?.updateData?.data?.user_amount) *
                (Number(props?.updateData?.data?.value) -
                  (Number(props?.updateData?.data?.value) * dividend) / 100) +
                Number(props?.updateData?.data?.user_amount)}
            </p>
            <Form.Group
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "15px",
                padding: "0px",
              }}
              controlId="formBasicPassword"
            >
              <Form.Label>Win :</Form.Label>
              {paymentLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={30}
                  width={30}
                />
              ) : (
                <input
                  style={{
                    height: "26px",
                    width: "26px",
                  }}
                  type="checkbox"
                  disabled={
                    props?.updateData?.data?.loss ||
                      props?.updateData?.data?.withdraw
                      ? true
                      : false
                  }
                  checked={
                    props?.updateData?.data?.status === "enabled" ? true : false
                  }
                  id="vehicle1"
                  name="vehicle1"
                  onChange={(event) => {
                    handleChange(event);
                  }}
                ></input>
              )}
              <Form.Label>Loss :</Form.Label>
              {lossLoading ? (
                <ReactLoading
                  type={"spin"}
                  color={"#000000"}
                  height={30}
                  width={30}
                />
              ) : (
                <input
                  style={{
                    height: "26px",
                    width: "26px",
                  }}
                  type="checkbox"
                  disabled={
                    props?.updateData?.data?.loss ||
                      props?.updateData?.data?.status === "enabled"
                      ? true
                      : false
                  }
                  checked={props?.updateData?.data?.loss ? true : false}
                  id="vehicle1"
                  name="vehicle1"
                  onChange={(event) => {
                    handleLossChange(event);
                  }}
                ></input>
              )}
            </Form.Group>
          </div>

          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default StatusModel;
