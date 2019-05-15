

const buildInterestObj = (placeId, name, description, cost, review, visited) => {
  let newObj = {
    "placeId": placeId,
    "name": `${name}`,
    "description": `${description}`,
    "cost": cost,
    "review": `${review}`,
    "visited": visited
  }
  return newObj
}

export default buildInterestObj