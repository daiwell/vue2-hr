import request from "@/utils/request";

export function getDepartments() {
  return request({
    url: "/company/department",
  });
}

export function DelDepartments(id: number) {
  return request({
    method: "delete",
    url: `/company/department/${id}`,
  });
}
