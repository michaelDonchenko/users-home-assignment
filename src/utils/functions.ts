export function generateRandomImage() {
  const generateGender = Math.round(Math.random())

  const generateImageNumber = Math.ceil(Math.random() * 98)

  return `https://randomuser.me/api/portraits/med/${
    generateGender === 0 ? 'men' : 'women'
  }/${generateImageNumber.toString()}.jpg`
}
