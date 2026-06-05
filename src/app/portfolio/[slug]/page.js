'use client';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const caseStudies = {
  'oktopus-group-social-media': {
    title: "Social Media Marketing Strategy & Campaign Management",
    client: "Oktopus Group",
    category: "Digital Marketing",
    duration: "2 years 7 months",
    image: "https://i.ibb.co/C3FFgNyD/oktopus-360-media-logo.jpg",
    challenge: "Oktopus Group needed a comprehensive social media strategy to manage multiple client accounts and campaigns across LinkedIn, Facebook, Twitter, Instagram, and YouTube with inconsistent performance metrics.",
    solution: "We developed and implemented a data-driven social media marketing framework that included daily channel management, strategic planning, ad optimization, and performance tracking across all major platforms.",
    results: [
      { metric: "Campaign Efficiency", value: "Improved ad spend ROI across all channels" },
      { metric: "Client Growth", value: "Expanded portfolio with 10+ new client accounts" },
      { metric: "Performance", value: "Increased engagement rates by average 35%" }
    ],
    technologies: ["Facebook Ads Manager", "Instagram Business Suite", "LinkedIn Campaign Manager", "YouTube Analytics", "CRM Tools", "Data Analytics"],
    learnings: [
      "Mastered platform-specific algorithms and ad targeting strategies",
      "Developed expertise in A/B testing and performance optimization",
      "Built scalable frameworks for multi-client campaign management",
      "Gained deep understanding of audience behavior analytics"
    ],
    marketInsights: "The digital marketing landscape in 2021-2023 showed a shift towards data-driven decision-making. We learned that successful campaigns required constant optimization, audience segmentation, and cross-platform integration rather than one-size-fits-all approaches.",
    highlights: [
      "Managed budgets ranging from €5K to €50K per month",
      "Created 200+ ad variations for A/B testing",
      "Trained 15+ junior marketers on platform best practices",
      "Achieved 4.2x average ROI across managed campaigns"
    ]
  },
  'hovertise-agency-partnerships': {
    title: "Agency Partnership & Marketing Strategy Development",
    client: "Hovertise",
    category: "Digital Marketing",
    duration: "8 months",
    image: "https://i.ibb.co/23cRR1Vw/boxeyi-com-logo.jpg",
    challenge: "Hovertise needed to expand its local agency partnerships and establish clear positioning and marketing strategies to compete in the competitive advertising market.",
    solution: "We developed a comprehensive partnership framework, identified and onboarded high-potential local agencies, created positioning strategy, and established marketing initiatives that aligned all partners around common objectives.",
    results: [
      { metric: "Partnerships", value: "Successfully onboarded 8 new agency partners" },
      { metric: "Revenue Growth", value: "Increased partnership revenue by 65%" },
      { metric: "Market Position", value: "Established clear market positioning" }
    ],
    technologies: ["Strategic Planning", "Market Analysis", "CRM Systems", "Partnership Tracking Tools", "Competitive Intelligence"],
    learnings: [
      "Developed expertise in B2B relationship management and partnership development",
      "Learned frameworks for creating win-win partnership agreements",
      "Built skills in market positioning and brand differentiation",
      "Gained insights into local market dynamics and agency ecosystems"
    ],
    marketInsights: "2022 showed a strong shift towards partnership-based business models. We discovered that agencies valued partners offering clear value propositions, reliable support systems, and transparent communication over traditional commission-based relationships.",
    highlights: [
      "Negotiated contracts worth €2.3M annually",
      "Created partnership playbook used by 50+ agencies",
      "Reduced partnership onboarding time from 60 to 14 days",
      "Achieved 92% partner retention rate"
    ]
  },
  'uef-social-media-content': {
    title: "Social Media Content Marketing for International Outreach",
    client: "University of Eastern Finland",
    category: "Digital Marketing",
    duration: "2 months (Apr-May 2025)",
    image: "https://i.ibb.co/bMt5R67x/university-of-eastern-finland-logo.jpg",
    challenge: "University of Eastern Finland needed to increase international student awareness of its programs and learning opportunities through engaging English-language social media content on TikTok and Instagram.",
    solution: "We designed and produced high-quality, culturally resonant English-language social media content specifically optimized for TikTok and Instagram, including short-form videos, Stories, and reels that showcased university life and academic opportunities.",
    results: [
      { metric: "Reach Growth", value: "31.6% increase in total reach" },
      { metric: "Engagement Growth", value: "49.9% increase in engagement rates" },
      { metric: "Video Views", value: "420K+ total views across platforms" }
    ],
    technologies: ["TikTok Creator Tools", "Instagram Reels", "CapCut Video Editor", "Adobe Premiere", "Analytics Dashboard"],
    learnings: [
      "Mastered short-form video content creation for Gen Z audience",
      "Developed cultural sensitivity in international content marketing",
      "Learned platform-specific storytelling techniques for maximum engagement",
      "Gained expertise in educational institution brand positioning"
    ],
    marketInsights: "2025 data confirms Gen Z (ages 18-24) prefers authentic, educational content delivered through short-form video. International students specifically respond to user-generated content showing real student experiences over traditional promotional materials.",
    highlights: [
      "Created 45+ short-form videos with 95% approval rate",
      "Achieved 8.2% engagement rate (vs 2.5% industry average)",
      "Featured in university's top 10 performing content ever",
      "Generated 2,000+ direct inquiries from international students"
    ]
  },
  'fonezone-tiktok-ads': {
    title: "TikTok Advertising Campaign Management & Optimization",
    client: "FoneZone.Ae",
    category: "Digital Marketing",
    duration: "4 months",
    image: "https://i.ibb.co/x8XWp2wR/1630642503926.jpg",
    challenge: "FoneZone.Ae needed to reach younger, trend-conscious consumers in the UAE with limited TikTok advertising experience and needed expert campaign management to maximize ROI on their advertising budget.",
    solution: "We planned, executed, and continuously optimized TikTok advertising campaigns using strategic audience targeting, compelling creative content, A/B testing, and real-time performance analysis to maximize return on ad spend.",
    results: [
      { metric: "ROAS", value: "4.8x return on ad spend achieved" },
      { metric: "Cost per Acquisition", value: "Reduced by 42%" },
      { metric: "Campaign Scale", value: "Grew budget from $5K to $45K/month profitably" }
    ],
    technologies: ["TikTok Ads Manager", "Analytics Dashboard", "Creative Studio", "Performance Tracking", "A/B Testing Framework"],
    learnings: [
      "Became expert in TikTok's unique algorithm and ad delivery system",
      "Developed advanced audience segmentation and targeting strategies",
      "Mastered creative optimization specifically for TikTok's user behavior",
      "Built predictive models for campaign performance forecasting"
    ],
    marketInsights: "TikTok's algorithm in 2023 favored authentic, non-polished content over traditional ads. We learned that product education content performed 3x better than direct selling approaches. Region-specific optimization was critical—Middle Eastern audiences showed 30% higher engagement with locally-relevant creative.",
    highlights: [
      "Launched 23 successful ad campaigns with 100% positive ROI",
      "Trained team on TikTok best practices resulting in 5x better performance",
      "Achieved #1 trending status for 2 product launch campaigns",
      "Generated 15,000+ qualified leads at $2.80 per lead"
    ]
  }
};

export default function CaseStudy() {
  const params = useParams();
  const study = caseStudies[params.slug];

  if (!study) {
    return (
      <>
        <Navbar />
        <section style={{ background: 'var(--midnight)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ textAlign: 'center' }}>
            <h1 style={{ fontSize: 48, color: 'var(--text-primary)', marginBottom: 16 }}>404</h1>
            <p style={{ color: 'var(--text-muted)', marginBottom: 32 }}>Case study not found</p>
            <Link href="/#portfolio">
              <button className="btn-primary">Back to Portfolio</button>
            </Link>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section style={{ background: 'var(--midnight)', padding: '120px 24px' }}>
      {/* Hero Image */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 1200,
          margin: '0 auto 60px',
          backgroundImage: `url(${study.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height: 400,
          borderRadius: 16,
          border: '1px solid var(--border)'
        }}
      />

      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{ marginBottom: 60 }}
        >
          <div style={{ display: 'flex', gap: 16, marginBottom: 24, flexWrap: 'wrap' }}>
            <span className="font-dm" style={{ fontSize: 12, background: 'rgba(0,229,255,0.1)', color: 'var(--aurora-cyan)', padding: '6px 12px', borderRadius: 4, textTransform: 'uppercase' }}>
              {study.category}
            </span>
            <span className="font-dm" style={{ fontSize: 12, color: 'var(--text-muted)' }}>Duration: {study.duration}</span>
          </div>
          <h1 className="font-syne" style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 800, color: 'var(--text-primary)', marginBottom: 16 }}>
            {study.title}
          </h1>
          <p className="font-dm" style={{ fontSize: 16, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            Client: <strong style={{ color: 'var(--text-primary)' }}>{study.client}</strong>
          </p>
        </motion.div>

        {/* Challenge & Solution */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 40, marginBottom: 60 }}
        >
          <div>
            <h2 className="font-syne" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>The Challenge</h2>
            <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {study.challenge}
            </p>
          </div>
          <div>
            <h2 className="font-syne" style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Our Solution</h2>
            <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
              {study.solution}
            </p>
          </div>
        </motion.div>

        {/* Results */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{ marginBottom: 60, padding: 32, background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.2)', borderRadius: 12 }}
        >
          <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 32 }}>Results Achieved</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 24 }}>
            {study.results.map((result, i) => (
              <div key={i}>
                <p className="font-dm" style={{ fontSize: 12, color: 'var(--aurora-cyan)', textTransform: 'uppercase', marginBottom: 8 }}>
                  {result.metric}
                </p>
                <p className="font-syne" style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {result.value}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learnings */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          style={{ marginBottom: 60 }}
        >
          <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Key Learnings</h2>
          <div style={{ display: 'grid', gap: 16 }}>
            {study.learnings.map((learning, i) => (
              <div key={i} style={{ padding: 16, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, borderLeft: '3px solid var(--aurora-cyan)' }}>
                <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-primary)' }}>
                  {learning}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Market Insights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          style={{ marginBottom: 60, padding: 32, background: 'rgba(123,97,255,0.05)', border: '1px solid rgba(123,97,255,0.2)', borderRadius: 12 }}
        >
          <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 16 }}>Market Insights & Gained Ideas</h2>
          <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.8 }}>
            {study.marketInsights}
          </p>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          style={{ marginBottom: 60 }}
        >
          <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Technologies & Tools Used</h2>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {study.technologies.map(tech => (
              <span key={tech} className="font-dm" style={{ fontSize: 12, background: 'rgba(0,229,255,0.1)', color: 'var(--aurora-cyan)', padding: '8px 16px', borderRadius: 6 }}>
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Highlights */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{ marginBottom: 60 }}
        >
          <h2 className="font-syne" style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 24 }}>Project Highlights</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {study.highlights.map((highlight, i) => (
              <div key={i} style={{ padding: 20, background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8 }}>
                <p className="font-dm" style={{ fontSize: 13, color: 'var(--text-primary)', lineHeight: 1.6 }}>
                  ✓ {highlight}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          style={{ textAlign: 'center', paddingTop: 40, borderTop: '1px solid var(--border)' }}
        >
          <p className="font-dm" style={{ fontSize: 14, color: 'var(--text-muted)', marginBottom: 24 }}>
            Ready to work on a similar project?
          </p>
          <Link href="/#work">
            <button className="btn-primary" style={{ padding: '14px 32px', fontSize: 14 }}>
              Start Your Project
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
    <Footer />
    </>
  );
}
