'use client';
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error(`[ErrorBoundary] ${this.props.fallback || 'Section'}:`, error, errorInfo);
    if (typeof window !== 'undefined') {
      // Fire a custom event so analytics or global handlers can pick it up
      window.dispatchEvent(new CustomEvent('boundary-error', {
        detail: { section: this.props.fallback || 'unknown', message: error.message },
      }));
    }
  }

  render() {
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.customFallback) {
        return this.props.customFallback(this.state.error, () => {
          this.setState({ hasError: false, error: null });
        });
      }

      // Default fallback: a subtle inline placeholder
      return (
        <div style={{
          padding: this.props.padding !== undefined ? this.props.padding : '80px 24px',
          textAlign: 'center',
          background: 'var(--surface)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div className="truck-pattern-dense" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} />
          <div style={{ position: 'relative', zIndex: 1, maxWidth: 400, margin: '0 auto' }}>
            <div className="font-syne" style={{
              fontSize: 32, fontWeight: 800,
              background: 'linear-gradient(135deg, #FF6B6B, #FFB300)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: 12,
            }}>
              ✦
            </div>
            <p className="font-dm" style={{
              fontSize: 13,
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: 20,
            }}>
              {this.props.message || 'This section couldn\'t load right now.'}
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-ghost"
              style={{
                padding: '10px 24px', fontSize: 11, cursor: 'pointer',
                color: 'var(--aurora-cyan)', border: '1px solid rgba(0,229,255,0.3)',
                background: 'rgba(0,229,255,0.05)', borderRadius: 8,
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
