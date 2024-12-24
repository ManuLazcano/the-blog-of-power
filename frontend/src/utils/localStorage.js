function setItemInLocalStorageWithExpiration(key, value, expirationInMinutes) {
  const now = new Date().getTime()
  const expirationTime = now + expirationInMinutes * 60 * 1000

  const item = {
    value: value,
    expiration: expirationTime,
  }

  localStorage.setItem(key, JSON.stringify(item))
}

function getItemInLocalStorageWithExpiration(key) {
  const itemStr = localStorage.getItem(key)
  
  if (!itemStr) {
    return null
  }
  
  const item = JSON.parse(itemStr)
  const now = new Date().getTime()
  
  if (now > item.expiration) {
    localStorage.removeItem(key)
    return null
  }
  
  return item.value
}


function clearExpiredItemsInLocalStorage() {
  const keys = Object.keys(localStorage)
  
  keys.forEach((key) => {
    const itemStr = localStorage.getItem(key)
    if (itemStr) {
      const item = JSON.parse(itemStr)
      const now = new Date().getTime()
  
      if (item.expiration && now > item.expiration) {
        localStorage.removeItem(key)
      }
    }
  })
}

export { 
  setItemInLocalStorageWithExpiration, 
  getItemInLocalStorageWithExpiration, 
  clearExpiredItemsInLocalStorage 
}