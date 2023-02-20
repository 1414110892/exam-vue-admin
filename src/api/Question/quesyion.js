import request from "@/utils/request";

export const reqGetSubjectPageList=(query)=>request({url:`/exam/question/page`,method:'post',data:query})
