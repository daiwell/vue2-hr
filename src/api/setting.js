
import request from "@/utils/request"
/**
 * 获取角色列表
 * ***/
export function getRoleList (params) {
  return request({
    url: '/sys/role',
    params
  })
}

export function getCompanyInfo (companyId) {
  return request({
    url: `/company/${companyId}`
  })
}

/** **
 *  删除角色
 *
 * ****/
export function deleteRole (id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}