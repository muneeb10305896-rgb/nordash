'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function CookiesPolicy() {
  return (
    <>
      <Navbar />
      <main style={{ background: 'var(--midnight)', minHeight: '100vh', paddingTop: 100 }}>
        <div style={{ maxWidth: 900, margin: '0 auto', padding: '60px 24px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-syne" style={{ fontSize: 48, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 32 }}>
              Cookies Policy
            </h1>

            <div className="font-dm" style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Last updated: {new Date().toLocaleDateString()}</strong>
              </p>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>1. What Are Cookies?</h2>
                <p>
                  Cookies are small text files that are placed on your computer or mobile device when you visit our website. They are widely used in order to make websites work, or work more efficiently, as well as to provide information to the owners of the site.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>2. How We Use Cookies</h2>
                <p style={{ marginBottom: 12 }}>We use cookies for the following purposes:</p>
                <ul style={{ paddingLeft: 24 }}>
                  <li><strong>Analytics:</strong> We use Vercel Analytics to understand how visitors use our website, which helps us improve our services.</li>
                  <li><strong>Functionality:</strong> Some cookies are necessary to ensure that our website functions properly.</li>
                  <li><strong>Performance:</strong> We use cookies to monitor and improve the performance of our website.</li>
                </ul>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>3. Types of Cookies We Use</h2>
                <ul style={{ paddingLeft: 24 }}>
                  <li><strong>Essential Cookies:</strong> These cookies are necessary for the website to function and cannot be switched off in our systems.</li>
                  <li><strong>Analytics Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                  <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide personalized features and remember choices you make.</li>
                </ul>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>4. Managing Your Cookies</h2>
                <p>
                  Most web browsers allow some control of most cookies through the browser settings. To find out more about cookies, including how to see what cookies have been set and how to manage and delete them, visit allaboutcookies.org.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>5. Third-Party Services</h2>
                <p>
                  Our website uses Vercel Analytics, which may place cookies on your device. We are not responsible for the cookies, privacy policies, or practices of any third-party services.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>6. Changes to This Policy</h2>
                <p>
                  We may update this Cookies Policy from time to time. We will notify you of any changes by posting the new policy on this page.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>7. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies, please contact us at <a href="mailto:hello@nordash.agency" style={{ color: '#FFB300', textDecoration: 'none' }}>hello@nordash.agency</a>
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
