import { Modal } from "react-bootstrap";
import "./modal.css";

export default function WarningModal({ show, setShow, groupsFormik, index }) {
    const deleteGroup = () => {
        const currentGroups = [...groupsFormik.values.userGroups];
        //Delete Logic
    };
    return (
        <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this group? This can't be undone</Modal.Title>
        </Modal.Header>
        <Modal.Footer className="warningFooter">
            <button
            onClick={deleteGroup}
            className="deleteButton">
            Delete
            </button>
            <button
            className="cancelButton"
            onClick={() => {
                setShow(false);
            }}
            >
            Cancel
            </button>
        </Modal.Footer>
        </Modal>
    );
    }