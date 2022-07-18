const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.map(b => b.likes).reduce((sum, i) => sum + i, 0)
}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(b => b.likes)
  const highest = Math.max(...likes)
  const index = likes.indexOf(highest)

  return index === -1
    ? {}
    : blogs[index]
}

// Starting to see why the lodash-library would have been useful
const mostBlogs = (blogs) => {
  const authorList = blogs.map(b => b.author)
  const occurences = authorList.reduce((acc, cur) => {
    acc[cur] ? ++acc[cur] : acc[cur] = 1
    return acc
  }, {})
  const authors = Object.keys(occurences)
  const counts = Object.values(occurences)
  const highestIndex = counts.indexOf(Math.max(...counts))

  return highestIndex === -1
    ? {}
    : { author: authors[highestIndex], blogs: counts[highestIndex] }
}

const mostLikes = (blogs) => {
  const occurences = blogs.reduce((acc, cur) => {
    const value = acc[cur.author] ? acc[cur.author] : 0
    acc[cur.author] = value + cur.likes
    return acc
  }, {})
  const authors = Object.keys(occurences)
  const likes = Object.values(occurences)
  const highestIndex = likes.indexOf(Math.max(...likes))

  return highestIndex === -1
    ? {}
    : { author: authors[highestIndex], likes: likes[highestIndex] }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}