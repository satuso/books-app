export const replacePath = (path) => {
  if (path.length > 0){
    return path.replaceAll(" ", "-")
  } else {
    return path.replace(" ", "-")
  }
}