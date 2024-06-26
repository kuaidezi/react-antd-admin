import request from "./request";

export interface EventListDataType {
  Input1: string;
  Input2: string;
  Select: string;
  Treeselect: string;
  Cascader: string[];
  InputNumber: number;
  DatePicker: string;
  RangePicker: string[];
  Slider: number;
  Switch: boolean;
  Checkbox: string[];
  Radio: string;
  ColorPicker: string;
  TextArea: string;
  id: string;
}

export function fetchEventList(): Promise<EventListDataType[]> {
  return request({ url: "/event/list", method: "get" });
}

export function fetchEventDetail(id: string): Promise<EventListDataType> {
  return request({ url: `/event/detail/${id}/`, method: "get" });
}
export function updateEventDetail(
  data: EventListDataType
): Promise<EventListDataType> {
  return request({ url: `/event/detail/`, method: "put", data });
}

export function createEventDetail(
  data: EventListDataType
): Promise<EventListDataType> {
  return request({ url: `/event/detail/`, method: "post", data });
}

export function deteleEventDetail(
  data: EventListDataType
): Promise<EventListDataType> {
  return request({ url: `/event/detail/`, method: "detele", data });
}
