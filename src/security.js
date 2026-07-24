// WholeUp QuantTerminal Pro Security & Anti-Crash Protection Module

export function initSecurityProtection() {
  // 1. Anti-Crash Global Error Boundary
  window.onerror = function (msg, url, lineNo, columnNo, error) {
    console.warn('[SECURITY GUARD Capturing Error & Auto-Healing]', msg);
    return true; // Prevents crash dialogs / browser halts
  };

  window.addEventListener('unhandledrejection', function (event) {
    console.warn('[SECURITY GUARD Capturing Unhandled Promise Rejection]', event.reason);
    event.preventDefault(); // Prevents app freeze
  });

  // 2. Anti-Steal: Disable Right-Click Context Menu
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    showSecurityToast('🛡️ Security Shield Active: Code Copying & Context Menu Disabled');
  });

  // 3. Anti-Inspect: Block DevTools Shortcuts (F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S)
  document.addEventListener('keydown', function (e) {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      showSecurityToast('🔒 WholeUp Protection: Developer Tools Access Restricted');
      return false;
    }

    // Ctrl + Shift + I / J / C
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j' || e.key === 'C' || e.key === 'c')) {
      e.preventDefault();
      showSecurityToast('🔒 WholeUp Protection: Source Inspection Disabled');
      return false;
    }

    // Ctrl + U (View Source)
    if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
      e.preventDefault();
      showSecurityToast('🔒 WholeUp Protection: Page Source View Restricted');
      return false;
    }

    // Ctrl + S (Save Page)
    if (e.ctrlKey && (e.key === 's' || e.key === 'S')) {
      e.preventDefault();
      showSecurityToast('🔒 WholeUp Protection: Saving Page Source Restricted');
      return false;
    }
  });

  // 4. Anti-Tamper: Clear Sensitive Logs from Production Console
  if (window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const noop = () => {};
    window.console.log = noop;
    window.console.debug = noop;
    window.console.info = noop;
  }
}

function showSecurityToast(msg) {
  let toast = document.getElementById('security-toast-msg');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'security-toast-msg';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(239, 68, 68, 0.95);
      color: #ffffff;
      border: 1px solid #ef4444;
      box-shadow: 0 10px 30px rgba(239, 68, 68, 0.5);
      padding: 0.75rem 1.5rem;
      border-radius: 999px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 0.82rem;
      font-weight: 800;
      letter-spacing: 0.03em;
      z-index: 999999;
      pointer-events: none;
      transition: all 0.3s ease;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(window.__secToastTimer);
  window.__secToastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
  }, 2500);
}
