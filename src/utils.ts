export function removeTags(str: string) {
  str = str.toString();
  return str.replace(/(<([^>]+)>)/gi, "");
}
