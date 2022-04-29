import { forwardRef, useImperativeHandle, useState } from "react"
import { Modal } from "react-bootstrap";


const DeleteAstronaut = forwardRef((props, ref) => {

    const [show, setShow] = useState(false);

    useImperativeHandle(ref, () => ({
        showDeleteModal() {
            setShow(true);
        }
    }));

    const deleteAstronaut = () => {
        props.onConfirmed();
        setShow(false);
    };

    return (
        <Modal show={show}>
            <div className="modal-header">
                <h5 className="modal-title">Potvrzení</h5>
                <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
            </div>

            <div className="modal-body">
                Opravdu smazat?
            </div>

            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Zrušit</button>
                <button type="button" className="btn btn-danger" onClick={() => deleteAstronaut()}>Smazat</button>
            </div>
        </Modal>
    );
});

export {DeleteAstronaut};