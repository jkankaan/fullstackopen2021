const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let totalLikes = 0
  if ((blogs.length) > 1) {
    for (var i in blogs) {
      totalLikes += blogs[i].likes
    }
    return totalLikes
  }
  else if ((blogs.length) === 1) {
    const totalLikes = blogs[0].likes
    return totalLikes
  }
  else {
    totalLikes = 0
    return totalLikes
  }
}

module.exports = {
  dummy,
  totalLikes
}