'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function TermsOfService() {
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
              Terms of Service
            </h1>

            <div className="font-dm" style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Last updated: {new Date().toLocaleDateString()}</strong>
              </p>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>1. Agreement to Terms</h2>
                <p>
                  By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>2. Use License</h2>
                <p style={{ marginBottom: 12 }}>Permission is granted to temporarily download one copy of the materials (information or software) on NORDASH&apos;s website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
                <ul style={{ paddingLeft: 24 }}>
                  <li>Modifying or copying the materials</li>
                  <li>Using the materials for any commercial purpose or for any public display</li>
                  <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                  <li>Removing any copyright or other proprietary notations from the materials</li>
                  <li>Transferring the materials to another person or &quot;mirroring&quot; the materials on any other server</li>
                </ul>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>3. Disclaimer</h2>
                <p>
                  The materials on NORDASH&apos;s website are provided on an &apos;as is&apos; basis. NORDASH makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>4. Limitations</h2>
                <p>
                  In no event shall NORDASH or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on NORDASH&apos;s website.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>5. Accuracy of Materials</h2>
                <p>
                  The materials appearing on NORDASH&apos;s website could include technical, typographical, or photographic errors. NORDASH does not warrant that any of the materials on the website are accurate, complete, or current. NORDASH may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>6. Links</h2>
                <p>
                  NORDASH has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by NORDASH of the site. Use of any such linked website is at the user&apos;s own risk.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>7. Modifications</h2>
                <p>
                  NORDASH may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>8. Contact Information</h2>
                <p>
                  If you have any questions about these Terms of Service, please contact us at <a href="mailto:muneeb10305896@gmail.com" style={{ color: '#FFB300', textDecoration: 'none' }}>muneeb10305896@gmail.com</a>
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
