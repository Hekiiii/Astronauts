import { Modal } from "react-bootstrap";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import AstronautModel from '../model/astronautModel';
import AstronautService from "../service/astronautService";


const SaveAstronaut = forwardRef((props, ref) => {

    useImperativeHandle(ref, () => ({
        showModal() {
            setTimeout(() => {
                setShow(true);
            }, 0);
        }
    }));

    useEffect(() => {
        setAstronaut(props.astronaut);
    }, [props.astronaut]);

    const [astronaut, setAstronaut] = useState(new AstronautModel('', '', '', '', ''));
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveAstronaut = (e) => {
        e.preventDefault();

        setSubmitted(true);

        if(!astronaut.firstName || !astronaut.lastName || !astronaut.birthdate || !astronaut.superpower) {
            return;
        }

        AstronautService.saveAstronaut(astronaut).then(response => {
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);
        }).catch(error => {
            console.log(error);
        });
    };

    const handleChange = (e) => {
        const {name, value} = e.target;

        setAstronaut((prevState => {
            return {
                ...prevState, [name]: value
            };
        }));
    };

    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveAstronaut(e)} noValidate className={submitted ? 'was-validated' : ''}>
                <div className="modal-header">
                    <h5 className="modal-title">Údaje o astronautovi</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">
                    <div className="form-group">
                        <label htmlFor="firstName">Jméno: </label>
                        <input type="text" name="firstName" placeholder="Jméno" className="form-control" value={astronaut.firstName} onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Jméno je povinné
                        </div>

                        <label htmlFor="lastName">Přijméní: </label>
                        <input type="text" name="lastName" placeholder="Přijméní" className="form-control" value={astronaut.lastName} onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Přijméní je povinné
                        </div>

                        <label htmlFor="birthdate">Datum narození: </label>
                        <input type="date" name="birthdate" className="form-control" value={astronaut.birthdate} onChange={(e) => handleChange(e)} required />
                        
                        <label htmlFor="superpower">Superschopnost: </label>
                        <input type="text" name="superpower" placeholder="Superschopnost" className="form-control" value={astronaut.superpower} onChange={(e) => handleChange(e)} required />
                        <div className="invalid-feedback">
                            Superschopnost je povinná
                        </div>
                    </div>
                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Zavřít</button>
                    <button type="submit" className="btn btn-primary">Uložit</button>
                </div>
            </form>
        </Modal>
    );
});

export {SaveAstronaut};