import axiosInstance from "@/apis/axiosConfig"

const Uid2Name = (uid: number) => {
    axiosInstance.get(`/user/name/${uid}`).then((res) => {
        return res.data.data.username
    }) 
}

export {Uid2Name}