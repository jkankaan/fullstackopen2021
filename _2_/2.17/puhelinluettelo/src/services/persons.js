import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = nameAndNumberObject => {
    return axios.post(baseUrl, nameAndNumberObject)
}

const deleteFunction = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

const functions = {
    getAll,
    create,
    deleteFunction
}

export default functions