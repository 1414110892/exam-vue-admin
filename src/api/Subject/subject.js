import request from "@/utils/request";

export const reqGetSubjectPageList=(page,limit,userSearch)=>request({url:`/subject/list?page=${page}&limit=${limit}&userSearch=${userSearch}`,method:'get'})
