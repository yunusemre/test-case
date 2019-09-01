export const get = (name) => {
  if (name != undefined) return JSON.parse(localStorage.getItem(name))
}

export const set = (name, list) => {
  if (name != undefined) return localStorage.setItem(name, JSON.stringify(list))
}

export const remove = () => {
  return localStorage.clear()
}