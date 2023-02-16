// import request from "@/utils/brand-request";
import request from "@/utils/request";

//学生信息分页
export const reqStudentList=(page,limit,userSearch)=>request({url:`/user/list?page=${page}&limit=${limit}&userSearch=${userSearch}`,method:'get'});

//  /admin/User/baseTrademark/save  post 携带学生信息

//  /admin/User/baseTrademark/update  put  修改学生信息

export const reqAddOrUpdateStudent=(student)=>{

  if(student.id){
    //修改学生数据
    return request({url:'/user/update',method:'put',data:student})
  }else {
    //新增学生数据
    return request({url:'/user/add',method:'post',data:student})
  }


}

//删除学生  /admin/User/baseTrademark/remove/{id}

export const reqDeleteStudent = (id)=>request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})

