import React from "react";
import Modal from "react-modal";
import { styles } from "../BusinessModal/HelperSetting";
import BusinessInfoDisplay from "../BusinessInfo/BusinessInfoDisplay"
import { useSelector, useDispatch } from "react-redux";
import { modalState, updateModal } from "../BusinessModal/ModalSlice"

const ModalDisplay = () => {
  const isOpen = useSelector(modalState);
  const dispatch = useDispatch();

  return (
    <Modal
      contentLabel="Example Modal"
      ariaHideApp={false}
      ariaModal={true}
      style={styles}
      isOpen={isOpen}
    >
      <button onClick={() => dispatch(updateModal(!isOpen))}>Close</button>
      <BusinessInfoDisplay />
    </Modal>
  );
};

export default ModalDisplay;
