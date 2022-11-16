import { unWantedKeys } from "../Data/helperData"

export const getCategories = (data) => {
  if (data.length !== 0) {
    return Object.keys(data[0]).filter(key => !unWantedKeys.includes(key)).reverse()

  }
  return []
}
