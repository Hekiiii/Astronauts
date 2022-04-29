import { useEffect, useRef, useState } from "react";
import AstronautModel from "../model/astronautModel";
import AstronautService from '../service/astronautService';
import { SaveAstronaut } from "./saveAstronaut";
import { DeleteAstronaut } from "./deleteAstronaut";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { hover } from "@testing-library/user-event/dist/hover";


const AstronautsPage = () => {
    const [astronautsList, setAustronautsList] = useState([]);
    const [selectedAstronaut, setSelectedAstronaut] = useState(new AstronautModel('', '', '', '', ''));
    
    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() => {
        AstronautService.getAstronauts().then((response) => {
            setAustronautsList(response.data);
        });
    }, []);

    const addAdstonautRequest = () => {
        setSelectedAstronaut(new AstronautModel('', '', '', '', ''));
        saveComponent.current?.showModal();
    };

    const editAstronautRequest = (astronaut) => {
        setSelectedAstronaut(Object.assign({}, astronaut));
        saveComponent.current?.showModal();
    }

    const deleteAstronautRequest = (astronaut) => {
        setSelectedAstronaut(astronaut);
        deleteComponent.current?.showDeleteModal();
    };

    const deleteAstronaut = () => {
        AstronautService.deleteAstronaut(selectedAstronaut).then(_ => {
            setAustronautsList(astronautsList.filter(x => x.id !== selectedAstronaut.id));
        }).catch(error => {
            console.log(error);
        });
    };

    const saveAstronautWatcher = (astronaut) => {
        let idx = astronautsList.findIndex(item => item.id === astronaut.id);

        if (idx !== -1) {
            const newList = astronautsList.map((item) => {
                if(item.id === astronaut.id) {
                    return astronaut;
                }
                return item;
            });
            setAustronautsList(newList);
        } else {
            const newList = astronautsList.concat(astronaut);
            setAustronautsList(newList);
        }
    };

    return (
        <div>
            <div className="container">
                <div className="pt-5">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-6 text-start px-4">
                                    <h3>Seznam astronautů</h3>
                                </div>

                                <div className="col-6 text-end" >
                                    <FontAwesomeIcon icon={faPlus} className="fa-2xl add-icon"  onClick={() => addAdstonautRequest()} />
                                </div>
                            </div>
                        </div>

                        <div className="card-body">
                            <table className="table table-stripped">
                                <thead>
                                    <tr>
                                        <th scope="col">Jméno</th>
                                        <th scope="col">Datum narození</th>
                                        <th scope="col">Superschopnost</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {astronautsList.map((item) =>
                                    <tr key={item.id}>
                                        <td>{item.firstName + " " + item.lastName}</td>
                                        <td>{item.birthdate}</td>
                                        <td>{item.superpower}</td>
                                        <td>
                                            <FontAwesomeIcon icon={faPenToSquare} className="fa-xl edit-icon" onClick={() => editAstronautRequest(item)} />
                                            <FontAwesomeIcon icon={faTrash} className="px-3 fa-xl delete-icon" onClick={() => deleteAstronautRequest(item)} />
                                        </td>
                                    </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <SaveAstronaut ref={saveComponent} astronaut={selectedAstronaut} onSaved={(a) => saveAstronautWatcher(a)}/>
            <DeleteAstronaut ref={deleteComponent} onConfirmed={() => deleteAstronaut()} />
        </div>
    );
};

export {AstronautsPage};