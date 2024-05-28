import request from "./request";

export interface GraphPlugUnitType {
  id: string;
  plugList: string[];
  label: string;
}

export function fetchGraphPlugUnitList(
  id?: string
): Promise<GraphPlugUnitType[]> {
  return request({ url: `/graph/unit-list/${id || ""}`, method: "get" });
}
