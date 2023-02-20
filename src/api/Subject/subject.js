import request from "@/utils/request";

export const reqGetSubjectPageList=(page,limit,userSearch)=>request({url:`/subject/list?page=${page}&limit=${limit}&userSearch=${userSearch}`,method:'get'})

export const reqAddOrUpdateSubject = (subject)=> {
  if(subject.id){
    //修改学科信息
    return request({url: '/subject/update', method: 'put', data: subject})

  }else{
    //新增学科信息
    return request({url: '/subject/add', method: 'post', data: subject})
  }

}

export const deleteSubject = (id)=>request({url:`/subject/delete/${id}`,method:'delete'})

export const selectSubjectByLevel = (levelId)=>request({url:`/subject/findSubjectByLevel/${levelId}`,method:`get`})
