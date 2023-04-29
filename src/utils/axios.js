import axios from "axios";

import  {baseUrl} from "./Constants";

const instance = axios.create({
    caseUrl:baseUrl,
})

export default instance;