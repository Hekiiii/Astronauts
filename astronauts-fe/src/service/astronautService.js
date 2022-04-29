import axios from "axios";

const URL = 'http://localhost:8080/astronauts'

axios.defaults.withCredentials = false;

class AstronautService {

    saveAstronaut(astronaut) {
        return axios.post(URL, astronaut);
    }

    deleteAstronaut(astronaut) {
        return axios.delete(URL + '/' + astronaut.id)
    }

    getAstronauts() {
        return axios.get(URL);
    }
}

export default new AstronautService();