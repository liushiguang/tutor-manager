import axiosInstance from "@/apis/axiosConfig"

const uid2Name = (uid: number) => {
    axiosInstance.get(`/user/name/${uid}`).then((res) => {
        return res.data.data
    }) 
}

export {uid2Name}