import request from "@/utils/request"

export function getDepartments () {
  return request({
    url: "/company/department",
  })
}

export function DelDepartments (id) {
  return request({
    method: "delete",
    url: `/company/department/${id}`,
  })
}

/**
 *  新增部门接口
 *
 * ****/
export function addDepartments (data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
/** *
 * 获取部门详情
 * ***/

export function getDepartDetail (id) {
  return request({
    url: `/company/department/${id}`
  })
}

/**
 * 编辑部门
 *
 * ***/
export function updateDepartments (data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}