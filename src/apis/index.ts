import axios from '../utils/axios'

// 获取所有网格员接口
export const getContentListApi = (req: any) => {
    return axios.post<Array<any>>('/wwzy/wwzy0409.asmx/getallwgy ', req)
}
