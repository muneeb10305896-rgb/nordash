'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Skeleton, { SkeletonGrid } from '@/components/Skeleton';

export default function Portfolio() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProjects();
  }, []);

  const getDefaultProjects = () => [
    {
      _id: '1',
      title: "Social Media Marketing Strategy & Campaign Management",
      slug: "oktopus-group-social-media",
      description: "Comprehensive social media marketing strategy development and execution across multiple platforms. Managed day-to-day social media channels (LinkedIn, Facebook, Twitter, Instagram, YouTube), developed data-driven media plans, monitored ad campaigns, and optimized spending allocation.",
      category: "digital-marketing",
      client: "Oktopus Group",
      imageUrl: "https://i.ibb.co/C3FFgNyD/oktopus-360-media-logo.jpg",
      technologies: ["Facebook Ads", "Instagram Marketing", "LinkedIn Strategy", "YouTube", "Data Analytics"],
      results: { metric: "Campaign Optimization", value: "Improved ad spend efficiency and audience targeting" },
      featured: true,
      status: "completed"
    },
    {
      _id: '2',
      title: "Agency Partnership & Marketing Strategy Development",
      slug: "hovertise-agency-partnerships",
      description: "Led strategic partnerships with local advertising agencies and developed comprehensive marketing initiatives. Onboarded new agency partners, established positioning and marketing strategies, managed relationship communications, and provided creative direction for advertising campaigns.",
      category: "digital-marketing",
      client: "Hovertise",
      imageUrl: "https://i.ibb.co/23cRR1Vw/boxeyi-com-logo.jpg",
      technologies: ["Strategic Planning", "Market Analysis", "Creative Direction", "Partnership Management"],
      results: { metric: "Partnership Success", value: "Successfully managed multiple agency partnerships" },
      featured: true,
      status: "completed"
    },
    {
      _id: '3',
      title: "Social Media Content Marketing for International Outreach",
      slug: "uef-social-media-content",
      description: "Designed and produced English-language social media content for TikTok and Instagram to promote University of Eastern Finland. Created short-form videos and reels targeting international students. Achieved 49.9% engagement growth, 31.6% reach increase, and 420K+ views.",
      category: "digital-marketing",
      client: "University of Eastern Finland",
      imageUrl: "https://i.ibb.co/bMt5R67x/university-of-eastern-finland-logo.jpg",
      technologies: ["TikTok", "Instagram", "Video Production", "Content Creation", "Audience Growth"],
      results: { metric: "Content Performance", value: "49.9% engagement growth, 31.6% reach increase, 420K+ views" },
      featured: true,
      status: "completed"
    },
    {
      _id: '4',
      title: "TikTok Advertising Campaign Management & Optimization",
      slug: "fonezone-tiktok-ads",
      description: "Planned and executed TikTok advertising campaigns with strategic targeting and audience segmentation. Conducted A/B testing, managed advertising budgets, and prepared detailed performance reports with actionable insights for maximum ROI.",
      category: "digital-marketing",
      client: "FoneZone.Ae",
      imageUrl: "https://i.ibb.co/x8XWp2wR/1630642503926.jpg",
      technologies: ["TikTok Ads Manager", "Campaign Planning", "A/B Testing", "Budget Optimization", "Analytics"],
      results: { metric: "Campaign Performance", value: "Optimized ad delivery and audience targeting" },
      featured: true,
      status: "completed"
    }
  ];

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects?featured=true');
      if (response.ok) {
        const data = await response.json();
        setProjects(data.projects && data.projects.length > 0 ? data.projects : getDefaultProjects());
      } else {
        setProjects(getDefaultProjects());
      }
    } catch (error) {
      console.error('Failed to fetch projects:', error);
      setProjects(getDefaultProjects());
    } finally {
      setLoading(false);
    }
  };

  const categories = ['all', 'web-development', 'mobile-app', 'digital-marketing', 'branding', 'software'];

  const filteredProjects = selectedCategory === 'all'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" style={{ background: 'var(--midnight)', padding: '120px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background */}
      <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 15, repeat: Infinity }}
        style={{ position: 'absolute', inset: 0, width: '800px', height: '600px', borderRadius: '50%', background: 'radial-gradient(ellipse, #00E5FF 0%, #7B61FF 50%, transparent 70%)', filter: 'blur(80px)', pointerEvents: 'none', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, justifyContent: 'center', marginBottom: 24 }}>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
            <span className="section-label-aurora" style={{ color: 'var(--aurora-cyan)' }}>Our Work</span>
            <div style={{ width: 40, height: 1, background: 'var(--aurora-cyan)' }} />
          </div>

          <h2 className="font-syne" style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            Portfolio Showcase
          </h2>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', maxWidth: 600, margin: '0 auto' }}>
            Check out our latest projects and case studies. From branding to full-scale software solutions.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}
        >
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className="font-dm"
              style={{
                padding: '10px 20px',
                fontSize: 12,
                fontWeight: 500,
                border: selectedCategory === cat ? '1px solid var(--aurora-cyan)' : '1px solid var(--border)',
                background: selectedCategory === cat ? 'rgba(0,229,255,0.1)' : 'transparent',
                color: selectedCategory === cat ? 'var(--aurora-cyan)' : 'var(--text-muted)',
                borderRadius: 8,
                cursor: 'pointer',
                transition: 'all 0.3s',
                textTransform: 'capitalize',
              }}
            >
              {cat === 'all' ? 'All Projects' : cat.replace('-', ' ')}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        {loading ? (
          <SkeletonGrid count={4} columns={3} cardHeight={380} />
        ) : filteredProjects.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p className="font-dm" style={{ color: 'var(--text-muted)' }}>No projects yet. Check back soon!</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 32 }}>
            {filteredProjects.map((project, i) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                }}
                whileHover={{ borderColor: 'var(--aurora-cyan)', y: -5 }}
              >
                {project.imageUrl && (
                  <div style={{
                    width: '100%',
                    height: 220,
                    background: 'var(--deep)',
                    backgroundImage: `url(${project.imageUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }} />
                )}
                <div style={{ padding: 24 }}>
                  <p className="font-dm" style={{ fontSize: 11, color: 'var(--aurora-cyan)', textTransform: 'uppercase', letterSpacing: '0.1em', margin: '0 0 8px 0' }}>
                    {project.category.replace('-', ' ')}
                  </p>
                  <h3 className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', margin: '0 0 8px 0' }}>
                    {project.title}
                  </h3>
                  <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-muted)', margin: '0 0 12px 0', lineHeight: 1.5 }}>
                    {project.description.substring(0, 100)}...
                  </p>
                  <p className="font-dm" style={{ fontSize: 12, color: 'var(--text-faint)', margin: '0 0 16px 0' }}>
                    Client: <strong>{project.client}</strong>
                  </p>
                  {project.technologies && (
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                      {project.technologies.slice(0, 3).map(tech => (
                        <span key={tech} className="font-dm" style={{ fontSize: 10, background: 'rgba(0,229,255,0.1)', color: 'var(--aurora-cyan)', padding: '4px 8px', borderRadius: 4 }}>
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  <Link href={`/portfolio/${project.slug}`}>
                    <motion.button
                      className="btn-ghost"
                      whileHover={{ scale: 1.05 }}
                      style={{ width: '100%', padding: '10px 16px', fontSize: 12 }}
                    >
                      View Case Study →
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
