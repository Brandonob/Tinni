// import React from "react"
// import Modal from "react-modal"
// import {styles} from "./modalStyling" 
// import { useSelector } from "react-redux"
// import {modalState, updateModal} from "./ModalSlice"
// import BusinessDisplay from "../BusinessInfo/BusinessInfoDisplay"


// const Modal = () =>{
//     const isOpen = useSelector(modalState)
//     const dispatch = useDispatch()

//     return (
//         <Modal
//           contentLabel="Example Modal"
//           ariaHideApp={false}
//           ariaModal={true}
//           style={styles}
//           isOpen={isOpen}
//         >
//           <button onClick={() => dispatch(updateModal(!isOpen))}>Close</button>
//           <BusinessDisplay />
//         </Modal>
//       );
// }
// export default Modal 