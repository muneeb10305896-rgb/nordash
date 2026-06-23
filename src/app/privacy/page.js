'use client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

export default function PrivacyPolicy() {
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
              Privacy Policy
            </h1>

            <div className="font-dm" style={{ fontSize: 14, lineHeight: 1.8, color: 'var(--text-muted)' }}>
              <p style={{ marginBottom: 24 }}>
                <strong style={{ color: 'var(--text-primary)' }}>Last updated: {new Date().toLocaleDateString()}</strong>
              </p>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>1. Introduction</h2>
                <p>
                  NORDASH (&quot;we,&quot; &quot;us,&quot; &quot;our,&quot; or &quot;Company&quot;) operates the nordash.agency website (the &quot;Service&quot;). This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>2. Information Collection and Use</h2>
                <p style={{ marginBottom: 12 }}>We collect several different types of information for various purposes to provide and improve our Service to you:</p>
                <ul style={{ paddingLeft: 24, marginBottom: 12 }}>
                  <li><strong>Personal Data:</strong> While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you (&quot;Personal Data&quot;). This may include:
                    <ul style={{ paddingLeft: 24, marginTop: 8 }}>
                      <li>Email address</li>
                      <li>Name</li>
                      <li>Phone number</li>
                      <li>Country</li>
                      <li>LinkedIn profile</li>
                      <li>Files (CV, cover letters)</li>
                    </ul>
                  </li>
                  <li><strong>Usage Data:</strong> We may also collect information about how the Service is accessed and used (&quot;Usage Data&quot;). This may include information such as your computer&apos;s Internet Protocol address, browser type, browser version, the pages you visit, the time and date of your visit, and other diagnostic data.</li>
                </ul>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>3. Use of Data</h2>
                <p>NORDASH uses the collected data for various purposes:</p>
                <ul style={{ paddingLeft: 24 }}>
                  <li>To provide and maintain our Service</li>
                  <li>To notify you about changes to our Service</li>
                  <li>To gather analysis or valuable information so that we can improve our Service</li>
                  <li>To monitor the usage of our Service</li>
                  <li>To detect, prevent and address technical issues</li>
                  <li>To respond to inquiries and provide customer support</li>
                  <li>To process job applications</li>
                  <li>To manage newsletter subscriptions</li>
                </ul>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>4. Security of Data</h2>
                <p>
                  The security of your data is important to us but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Data, we cannot guarantee its absolute security.
                </p>
              </section>

              <section style={{ marginBottom: 32 }}>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>5. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date at the top of this Privacy Policy.
                </p>
              </section>

              <section>
                <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 12 }}>6. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us at <a href="mailto:muneeb10305896@gmail.com" style={{ color: '#FFB300', textDecoration: 'none' }}>muneeb10305896@gmail.com</a>
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
