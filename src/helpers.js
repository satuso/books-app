export const replacePath = (path) => {
  if (path.length > 0){
    return path.replaceAll(" ", "-")
  }
  if (path.length === 0){
    return path.replace(" ", "-")
  }
}