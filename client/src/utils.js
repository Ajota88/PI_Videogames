export const paginate = videogames=>{
  const itemsPerPage=15
  const pages = Math.ceil(videogames.length / itemsPerPage)
  const newVideogames = Array.from({length:pages},(_,index)=>{
    const start = index * itemsPerPage
    return videogames.slice(start,start+itemsPerPage)
  })
  console.log(newVideogames)
  return newVideogames
}

export function sortAsc(arr, field) {
  return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
          return 1;
      }
      if (b[field]> a[field]) {
          return -1;
      }
      return 0;
  })
}

export function sortDesc(arr, field) {
  return arr.sort(function (a, b) {
      if (a[field] > b[field]) {
          return -1;
      }
      if (b[field]> a[field]) {
          return 1;
      }
      return 0;
  })
}