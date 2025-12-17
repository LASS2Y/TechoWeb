import { createPost, getPosts, deletePost, editPost } from "@/lib/blog";

export default async function BlogApp() {
  const posts = await getPosts();

  return (
    <div className="px-4 sm:px-8 md:px-16 lg:px-32 xl:px-56 max-w-5xl mx-auto py-10">
      <h1 className="text-center text-3xl font-bold mb-8">My Blog</h1>

      <form
        action={createPost}
        className="flex flex-col mb-12 bg-gray-50 p-6 rounded-lg"
      >
        <label className="text-xl font-semibold mb-4">New article</label>

        <textarea
          placeholder="Enter the content of your post"
          className="border w-full h-32 text-base p-4 rounded-md mb-4"
          name="content"
          required
        ></textarea>
        {/* Champ optionnel pour le titre si besoin */}
        <input
          type="text"
          name="title"
          placeholder="Title (optional)"
          className="border w-full p-2 mb-4 rounded-md"
        />

        <button className="px-6 py-2 rounded-md font-medium text-white bg-blue-600 hover:bg-blue-700 transition self-start">
          Publish
        </button>
      </form>

      <h2 className="text-center text-2xl font-bold mb-6 border-b pb-4">
        POSTS
      </h2>

      <ul className="space-y-8">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white shadow-md border rounded-xl p-6"
          >
            <form>
              <div className="flex flex-col gap-4">
                <label className="text-sm text-gray-500 font-bold">
                  edit title :
                </label>
                <textarea
                  name="title"
                  defaultValue={post.title}
                  className="border w-full h-24 p-2 rounded-md bg-gray-50"
                ></textarea>

                <div className="text-sm text-gray-400">
                  <p>ID: {post.id}</p>
                  <p className="mt-2 text-black font-medium">{post.content}</p>
                </div>

                {/* Input caché indispensable pour editPost */}
                <input type="hidden" name="id" value={post.id} />
              </div>

              <div className="flex gap-4 mt-4">
                <button
                  formAction={deletePost.bind(null, post.id)}
                  className="px-4 py-2 rounded-md font-medium text-red-600 border border-red-600 hover:bg-red-50 transition"
                >
                  Delete post
                </button>

                {/* Bouton Modifier */}
                <button
                  formAction={editPost}
                  className="px-4 py-2 rounded-md font-medium text-blue-600 border border-blue-600 hover:bg-blue-50 transition"
                >
                  Edit post
                </button>
              </div>
            </form>
          </li>
        ))}
      </ul>
    </div>
  );
}
