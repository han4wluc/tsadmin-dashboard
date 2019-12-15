
import axios from 'axios'

class EntityService {

    createEntity = async (entityName: string, data: any) => {
        const res = await axios.post<any, any>(`http://localhost:8000/${entityName}`, data)
        return res.data
    }

    updateEntity = async (entityName: string, id: any, data: any) => {
        const res = await axios.patch<any, any>(`http://localhost:8000/${entityName}/${id}`, data)
        return res.data
    }

    fetchEntities = async () => {
        const reps = await axios.get<any, any>('http://localhost:8000/entities')
        return reps.data
    }

    fetchItems = async (entityName: string) => {
        const reps = await axios.get<any, any>(`http://localhost:8000/${entityName}`)
        return reps.data
    }

    deleteItem = async (entityName: string, id: any) => {
        const res = await axios.delete<any, any>(`http://localhost:8000/${entityName}/${id}`)
        return res.data
    }
}


const entityService = new EntityService()

export {
    entityService
}

export default EntityService
