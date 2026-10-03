import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { BLOG_POSTS } from '../data/blogPosts'

export default function BlogPost() {
  const { slug } = useParams()
  const post = BLOG_POSTS.find(p => p.slug === slug)

  if (!post) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h1>Post Not Found</h1>
        <Link to="/blog" className="btn btn-primary" style={{ marginTop: '1rem' }}>Back to Blog</Link>
      </div>
    )
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'DoAide' },
    publisher: { '@type': 'Organization', name: 'DoAide' },
    url: `https://qr.doaide.com/blog/${post.slug}`,
  }

  return (
    <>
      <SEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        jsonLd={jsonLd}
      />
      <article className="container" style={{ padding: '2rem 0 4rem', maxWidth: 700, margin: '0 auto' }}>
        <div style={{ marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Link to="/blog">Blog</Link> / {post.title}
        </div>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '0.75rem', lineHeight: 1.3 }}>{post.title}</h1>
        <div style={{ display: 'flex', gap: '1.5rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
        <div
          style={styles.content}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
        <div style={{ marginTop: '3rem', borderTop: '1px solid var(--border)', paddingTop: '1.5rem' }}>
          <Link to="/blog" style={{ color: 'var(--gold)' }}>&larr; Back to all posts</Link>
        </div>
      </article>
    </>
  )
}

function renderMarkdown(text) {
  return text
    .replace(/```([\s\S]*?)```/g, '<pre style="background:#1a1a1a;padding:1rem;border-radius:8px;overflow-x:auto;font-size:0.85rem;border:1px solid #2a2a2a"><code>$1</code></pre>')
    .replace(/`([^`]+)`/g, '<code style="background:#1a1a1a;padding:0.15rem 0.4rem;border-radius:4px;font-size:0.85rem">$1</code>')
    .replace(/^## (.+)$/gm, '<h2 style="font-size:1.35rem;font-weight:600;margin:2rem 0 0.75rem">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 style="font-size:1.1rem;font-weight:600;margin:1.5rem 0 0.5rem">$1</h3>')
    .replace(/^\*\*(.+?)\*\*/gm, '<strong>$1</strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+)\. (.+)$/gm, '<li style="margin-left:1.5rem;margin-bottom:0.25rem">$2</li>')
    .replace(/^- (.+)$/gm, '<li style="margin-left:1.5rem;margin-bottom:0.25rem;list-style-type:disc">$1</li>')
    .replace(/\n\n/g, '</p><p style="margin-bottom:1rem;line-height:1.7;color:#ccc">')
    .replace(/^/, '<p style="margin-bottom:1rem;line-height:1.7;color:#ccc">')
    .replace(/$/, '</p>')
}

const styles = {
  content: {
    lineHeight: 1.8,
    fontSize: '1rem',
  },
}
