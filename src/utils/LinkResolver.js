exports.linkResolver = (doc) => {
  if (doc.type === 'page') {
    return `/${doc.uid}`
  }
  if (doc.type === 'blog') {
    return `/blog/${doc.uid}`
  }

  return '/'
}
