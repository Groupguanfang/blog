export async function usePostList() {
  const posts = import.meta.glob('../pages/posts/*.md')
  const postsInfos = await Promise.all(Object.keys(posts).map(async (path) => {
    const filename = path.split('/').pop() as string
    return { filename, ...await posts[path]() as Record<'title' | 'date' | 'lang' | 'desc', string> }
  }))
    // Sort posts by date
    .then(posts => posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    // Format the date
    .then(posts => posts.map(post => ({ ...post, date: post.date ? new Date(post.date).toLocaleDateString() : undefined })))
    // Filter out posts that are excluded in the config
    .then(posts => posts.filter((post) => {
      if (__GCZ_CONFIG__.excludePost && Array.isArray(__GCZ_CONFIG__.excludePost))
        return !__GCZ_CONFIG__.excludePost.includes(post.filename)
      return true
    }))

  return { posts, postsInfos }
}

export function useTimelineList() {
  const timelinePosts: Record<string, any> = import.meta.glob('../pages/now/*.md', { eager: true })

  for (const i in timelinePosts) {
    console.log(h(timelinePosts[i].default))
  }

  return { timelinePosts }
}
