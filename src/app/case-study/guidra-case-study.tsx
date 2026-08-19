const sectionClass = "space-y-4 border-t border-primary/10 pt-8";
const bodyClass = "text-base leading-relaxed text-secondary";
const listClass = "list-disc pl-5 space-y-1 text-base leading-relaxed text-secondary";
const headingClass = "text-xl sm:text-2xl font-semibold text-primary";

const GuidraCaseStudy = () => (
  <div className="space-y-10">
    <section className={sectionClass}>
      <h2 className={headingClass}>Executive Summary</h2>
      <p className={bodyClass}>
        This case study documents the production deployment of the Guidra backend API on Microsoft Azure infrastructure. The implementation demonstrates production-oriented deployment practices including security hardening, reverse proxy configuration, SSL termination, process management, and cloud database integration.
      </p>
      <p className={bodyClass}>
        <span className="font-semibold text-primary">Technologies Used:</span> Azure VM (Ubuntu 24.04), Nginx, Node.js, PM2, MongoDB Atlas, Let&apos;s Encrypt
      </p>
      <div>
        <p className="mb-2 text-base font-semibold text-primary">Key Metrics:</p>
        <ul className={listClass}>
          <li>API latency: ~150–230ms</li>
          <li>Memory usage: ~600MB (idle)</li>
          <li>Uptime tested: 7+ days</li>
          <li>SSL rating: A (Qualys SSL Labs)</li>
          <li>Deployment time: less than 30 seconds (automated script)</li>
          <li>Availability: verified during deployment and validation testing</li>
        </ul>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>1. System Architecture</h2>
      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`Internet → Azure NSG → UFW → Nginx (reverse proxy) → PM2 → Node.js App → MongoDB Atlas`}
      </pre>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-secondary">
          <thead>
            <tr className="border-b border-primary/10 text-left text-primary">
              <th className="p-2.5 font-semibold">Layer</th>
              <th className="p-2.5 font-semibold">Technology</th>
              <th className="p-2.5 font-semibold">Purpose</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-primary/10"><td className="p-2.5">Cloud</td><td className="p-2.5">Azure VM (B2als v2)</td><td className="p-2.5">Compute infrastructure</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Network</td><td className="p-2.5">Azure NSG + UFW</td><td className="p-2.5">Defense-in-depth firewall</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Web Server</td><td className="p-2.5">Nginx</td><td className="p-2.5">Reverse proxy, SSL termination</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Runtime</td><td className="p-2.5">Node.js 20 LTS</td><td className="p-2.5">Application execution</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Process</td><td className="p-2.5">PM2</td><td className="p-2.5">Process management, auto-restart</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Database</td><td className="p-2.5">MongoDB Atlas</td><td className="p-2.5">Cloud database service</td></tr>
            <tr className="border-b border-primary/10"><td className="p-2.5">Security</td><td className="p-2.5">fail2ban, SSH hardening</td><td className="p-2.5">Intrusion prevention</td></tr>
            <tr><td className="p-2.5">SSL</td><td className="p-2.5">Let&apos;s Encrypt</td><td className="p-2.5">Free automated certificates</td></tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>2. Deployment Phases</h2>
      <div className="space-y-5 text-base leading-relaxed text-secondary">
        <div>
          <h3 className="text-lg font-semibold text-primary">Infrastructure Foundation</h3>
          <ul className={listClass}><li>Azure VM provisioning with static public IP</li><li>SSH key authentication (password-less)</li><li>Deploy user creation (non-root)</li><li>UFW configuration (ports 22, 80, 443 only)</li></ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Security Implementation</h3>
          <ul className={listClass}><li>SSH hardening (/etc/ssh/sshd_config modifications)</li><li>fail2ban configuration with custom jail</li><li>Automatic security updates enabled</li><li>Azure NSG rules configured</li></ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Application Stack</h3>
          <ul className={listClass}><li>NVM + Node.js LTS installation</li><li>PM2 process manager setup</li><li>MongoDB Atlas connection with SRV string</li><li>Environment variable management</li></ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-primary">Web Server Configuration</h3>
          <ul className={listClass}><li>Nginx reverse proxy setup</li><li>SSL certificates via Let&apos;s Encrypt</li><li>HTTP → HTTPS redirection</li><li>Custom domain configuration</li></ul>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>3. Challenges &amp; Solutions</h2>
      <p className={bodyClass}>
        <span className="font-semibold text-primary">Key Incident:</span> Self-inflicted SSH ban due to fail2ban testing led to Azure emergency recovery—validated both fail2ban functionality and cloud provider fallback mechanisms. Nginx IPv6-only binding required explicit listen 0.0.0.0:80 directive. Domain DNS propagation delays necessitated verification tools for troubleshooting.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>4. Security Hardening</h2>
      <p className={bodyClass}>
        Defense-in-depth approach with multiple security layers: Azure NSG firewall restricts inbound to ports 22, 80, 443. UFW provides host-level firewall. fail2ban blocks brute force attempts (3 strikes = 1 hour ban). SSH hardened with key-only authentication and root login disabled. Automatic security updates via unattended-upgrades. SSL certificates auto-renewed via Let&apos;s Encrypt.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>5. Production Validation</h2>
      <ul className={listClass}>
        <li>Server reboot persistence: PM2 auto-restart verified</li>
        <li>Process crash recovery: PM2 respawned within 2 seconds</li>
        <li>Nginx auto-start: Active post-reboot confirmed</li>
        <li>SSL auto-renewal: certbot renew dry-run successful</li>
        <li>Firewall validation: nmap verified only specified ports open</li>
      </ul>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>6. Lessons Learned</h2>
      <ul className={listClass}>
        <li><span className="font-semibold text-primary">Cloud Infrastructure:</span> Azure VMs require explicit NSG configuration for security</li>
        <li><span className="font-semibold text-primary">Network Security:</span> Defense-in-depth with multiple firewall layers is essential</li>
        <li><span className="font-semibold text-primary">Process Management:</span> PM2 provides reliable process supervision and auto-restart</li>
        <li><span className="font-semibold text-primary">SSL/TLS:</span> Let&apos;s Encrypt + Certbot simplifies certificate management</li>
        <li><span className="font-semibold text-primary">Intrusion Prevention:</span> fail2ban requires careful testing to avoid self-lockout</li>
        <li><span className="font-semibold text-primary">Automation:</span> Deployment scripts reduce manual steps and human error</li>
        <li><span className="font-semibold text-primary">Monitoring:</span> Regular testing (reboots, restarts) validates production readiness</li>
      </ul>
    </section>

    <footer className="border-t border-primary/10 pt-8 text-base leading-relaxed text-secondary">
      <p className="italic">&quot;Documentation is the difference between experience and expertise.&quot;</p>
      <p className="mt-2 font-semibold text-primary">— Guganraj Rengaraju</p>
    </footer>
  </div>
);

export default GuidraCaseStudy;
