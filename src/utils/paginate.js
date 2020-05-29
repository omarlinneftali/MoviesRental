//import _ from "loadash";

export function paginate(items, pageNumber, pageSize) {
  let startIndex = (pageNumber - 1) * pageSize;
  let elements = extratPaginate(items, startIndex, pageSize);

  return elements;
}

export function extratPaginate(items, startIndex, count) {
  return items.slice(startIndex, startIndex + count);
}
