const BlogForm = (props) =>
  <form onSubmit={props.onSubmit}>
    <div>
      Title: <input
        value={props.title}
        onChange={({ target }) => props.setTitle(target.value)}
      />
    </div>
    <div>
      Author: <input
        value={props.author}
        onChange={({ target }) => props.setAuthor(target.value)}
      />
    </div>
    <div>
      Url: <input
        value={props.url}
        onChange={({ target }) => props.setUrl(target.value)}
      />
    </div>
    <button type="submit">create</button>
  </form>

export default BlogForm
