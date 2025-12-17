import Image from "next/image";
import { logout, getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const user = await getCurrentUser();
  const posts = await getPosts();

  return (
    <main className="bg-white dark:bg-black text-gray-900 dark:text-gray-100">
      {/* --- BARRE DE NAVIGATION / AUTH --- */}
      <nav className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-gray-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-bold text-xl tracking-tighter">LL.</span>

          <div className="flex items-center gap-4">
            {/* Logique d'affichage selon l'utilisateur */}
            {user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium hidden sm:block text-green-600">
                  ● {typeof user === "string" ? user : user?.name || "User"}
                </span>
                <form action={logout}>
                  <button className="text-sm bg-red-50 text-red-600 px-4 py-2 rounded-full hover:bg-red-100 transition">
                    Logout
                  </button>
                </form>
              </div>
            ) : (
              <Link
                href="/auth"
                className="text-sm bg-black text-white dark:bg-white dark:text-black px-4 py-2 rounded-full hover:opacity-80 transition"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <section id="blog" className="py-20 bg-gray-50/50 dark:bg-zinc-900/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-4xl font-bold mb-12">Latest Articles</h2>
          <div className="space-y-6">
            {posts.length > 0 ? (
              posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="block group"
                >
                  <article className="p-6 bg-white dark:bg-black rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition">
                    <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-500 text-sm mt-2">
                      By {post.creator}
                    </p>
                  </article>
                </Link>
              ))
            ) : (
              <p className="text-gray-500 italic">No articles yet.</p>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
