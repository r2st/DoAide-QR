import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { BLOG_POSTS } from '../data/blogPosts'

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog"
        description="QR code guides, best practices, and tips. Learn how to use QR codes effectively for your business."
        path="/blog"
      />
      <div className="container" style={{ padding: '2rem 0 4rem', maxWidth: 800, margin: '0 auto' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '0.5rem' }}>Blog</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Guides, tips, and best practices for QR codes.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {BLOG_POSTS.map(post => (
            <Link key={post.slug} to={`/blog/${post.slug}`} style={styles.postCard}>
              <div>
                <h2 style={styles.postTitle}>{post.title}</h2>
                <p style={styles.postExcerpt}>{post.excerpt}</p>
                <div style={styles.postMeta}>
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

const styles = {
  postCard: {
    background: 'var(--bg-card)',
    border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)',
    padding: '1.5rem',
    textDecoration: 'none',
    color: 'var(--text-primary)',
    display: 'block',
    transition: 'border-color 0.2s',
  },
  postTitle: {
    fontSize: '1.2rem',
    fontWeight: 600,
    marginBottom: '0.5rem',
  },
  postExcerpt: {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: 1.6,
    marginBottom: '0.75rem',
  },
  postMeta: {
    display: 'flex',
    gap: '1.5rem',
    color: 'var(--text-muted)',
    fontSize: '0.8rem',
  },
}
