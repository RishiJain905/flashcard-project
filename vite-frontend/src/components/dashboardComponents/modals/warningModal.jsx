import { Modal } from "react-bootstrap";
import "../../styles/modal.css";
import { deleteGroup } from "../../../helperFunctions/axiosRequests";
export default function WarningModal({ show, setShow, groupsFormik, index }) {
    const deleteGroup = async () => {
        await deleteGroup(groupsFormik.values.userGroups[index]);
        groupsFormik.values.userGroups.splice(index, 1);
        await groupsFormik.setFieldValue("userGroups", groupsFormik.values.userGroups);
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