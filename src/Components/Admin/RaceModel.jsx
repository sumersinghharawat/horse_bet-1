import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Context } from "../../App";
import { db } from "../../config/firebase";

const RaceModel = (props) => {
  const {
    userData,
    setUseData,
    indexNum,
    indiaRace,
    raceIndexNum,
    setRaceIndexNums,
    setIndiaRace,
  } = useContext(Context);

  const handleSubmit = async (user) => {
    db.collection("TimeData").doc("RaceData").update({ Allrace: indiaRace });
    // db.collection("users")
    //   .doc(userData.uid)
    //   .update(userData)
    //   .then(function () {});
    // e.preventDefault();
    // AddDataToFirebase(formData);
    props.onHide();
  };
  console.log("props.data", indiaRace);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>WIN</Form.Label>
            <Form.Control
              type="text"
              name="Amount"
              required
              placeholder="Enter prize"
              defaultValue={
                indiaRace[raceIndexNum]?.runners[indexNum]?.odds.WIN
              }
              value={indiaRace[raceIndexNum]?.runners[indexNum]?.odds.WIN}
              onChange={(e) => {
                // setUseData({ ...userData, amount: e.target.value });
                const array1 = [...indiaRace];
                array1[raceIndexNum].runners[indexNum].odds.WIN =
                  e.target.value;
                console.log(array1);
                setIndiaRace(array1);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>PLC</Form.Label>
            <Form.Control
              type="text"
              name="Amount"
              required
              placeholder="Enter prize"
              defaultValue={
                indiaRace[raceIndexNum]?.runners[indexNum]?.odds.PLC
              }
              value={indiaRace[raceIndexNum]?.runners[indexNum]?.odds.PLC}
              onChange={(e) => {
                const array1 = [...indiaRace];
                array1[raceIndexNum].runners[indexNum].odds.PLC =
                  e.target.value;
                console.log(array1);
                setIndiaRace(array1);
              }}
            />
          </Form.Group>
          <Button
            style={{
              marginRight: "10px",
            }}
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button variant="secondary" onClick={props.onHide}>
            Close
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default RaceModel;
