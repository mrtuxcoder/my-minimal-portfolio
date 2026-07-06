type CaseStudyPageProps = {
  searchParams: Promise<{
    title?: string;
  }>;
};

const CaseStudyPage = async ({ searchParams }: CaseStudyPageProps) => {
  const params = await searchParams;
  const title =
    params?.title || "End-to-End Deployment of Guidra Backend on Azure VM";

  return (
    <main>
      <section>
        <div className="container">
          <div className="border-x border-primary/10">
            <article className="max-w-4xl mx-auto px-4 sm:px-7 py-12 md:py-16 space-y-12">
              <header className="space-y-4">
                <p className="text-sm tracking-[2px] text-primary uppercase font-medium">
                  Case Study
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{title}</h1>
                <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300">
                  Azure VM → Nginx → Node.js → MongoDB Atlas
                </p>
              </header>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">Executive Summary</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This case study documents the production deployment of the Guidra backend API on Microsoft Azure infrastructure. The implementation demonstrates production-oriented deployment practices including security hardening, reverse proxy configuration, SSL termination, process management, and cloud database integration.
                </p>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Technologies Used:</span> Azure VM (Ubuntu 24.04), Nginx, Node.js, PM2, MongoDB Atlas, Let&apos;s Encrypt
                </p>
                <div>
                  <p className="font-medium mb-2">Key Metrics:</p>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                    <li>API latency: ~150–230ms</li>
                    <li>Memory usage: ~600MB (idle)</li>
                    <li>Uptime tested: 7+ days</li>
                    <li>SSL rating: A (Qualys SSL Labs)</li>
                    <li>Deployment time: less than 30 seconds (automated script)</li>
                    <li>Availability: verified during deployment and validation testing</li>
                  </ul>
                </div>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">1. System Architecture</h2>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`Internet → Azure NSG → UFW → Nginx (reverse proxy) → PM2 → Node.js App → MongoDB Atlas`}
                </pre>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-primary/10">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-2.5">Layer</th>
                        <th className="text-left p-2.5">Technology</th>
                        <th className="text-left p-2.5">Purpose</th>
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

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">2. Deployment Phases</h2>
                <div className="space-y-5 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium">Infrastructure Foundation</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Azure VM provisioning with static public IP</li>
                      <li>SSH key authentication (password-less)</li>
                      <li>Deploy user creation (non-root)</li>
                      <li>UFW configuration (ports 22, 80, 443 only)</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Security Implementation</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>SSH hardening (/etc/ssh/sshd_config modifications)</li>
                      <li>fail2ban configuration with custom jail</li>
                      <li>Automatic security updates enabled</li>
                      <li>Azure NSG rules configured</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Application Stack</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>NVM + Node.js LTS installation</li>
                      <li>PM2 process manager setup</li>
                      <li>MongoDB Atlas connection with SRV string</li>
                      <li>Environment variable management</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Web Server Configuration</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Nginx reverse proxy setup</li>
                      <li>SSL certificates via Let&apos;s Encrypt</li>
                      <li>HTTP → HTTPS redirection</li>
                      <li>Custom domain configuration</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Deployment Automation</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Git-based deployment script</li>
                      <li>SSH config for GitHub authentication</li>
                    </ul>
                  </div>
                </div>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">3. Challenges &amp; Solutions</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-primary/10">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-2.5">Challenge</th>
                        <th className="text-left p-2.5">Solution</th>
                        <th className="text-left p-2.5">Engineering Impact</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/10"><td className="p-2.5">SSH lockout during fail2ban testing</td><td className="p-2.5">Azure portal emergency SSH key reset</td><td className="p-2.5">Understood cloud recovery paths</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Nginx only listening on IPv6</td><td className="p-2.5">Added listen 0.0.0.0:80; directive</td><td className="p-2.5">Learned socket binding nuances</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Domain DNS propagation delay</td><td className="p-2.5">Used dnschecker.org for verification</td><td className="p-2.5">Real-world DNS debugging</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Azure NSG blocking port 80</td><td className="p-2.5">Added inbound rule in portal</td><td className="p-2.5">Cloud firewall configuration</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">GitHub SSH key confusion</td><td className="p-2.5">Created ~/.ssh/config with explicit IdentityFile</td><td className="p-2.5">SSH client mastery</td></tr>
                      <tr><td className="p-2.5">fail2ban config overwrite risk</td><td className="p-2.5">Used jail.local instead of modifying jail.conf</td><td className="p-2.5">Configuration best practices</td></tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">Key Incident:</span> Self-inflicted SSH ban led to Azure emergency recovery-validated both fail2ban functionality and cloud provider fallback mechanisms.
                </p>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">4. Security Hardening</h2>

                <h3 className="text-lg font-medium">Defense in Depth Implementation</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-primary/10">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-2.5">Layer</th>
                        <th className="text-left p-2.5">Technology</th>
                        <th className="text-left p-2.5">Configuration</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Network Edge</td><td className="p-2.5">Azure NSG</td><td className="p-2.5">Inbound rules: 22,80,443 only</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Host Firewall</td><td className="p-2.5">UFW</td><td className="p-2.5">Default deny, explicit allow</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Intrusion Prevention</td><td className="p-2.5">fail2ban</td><td className="p-2.5">3 strikes → 1 hour ban</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Access Control</td><td className="p-2.5">SSH</td><td className="p-2.5">Keys only, root disabled</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Updates</td><td className="p-2.5">unattended-upgrades</td><td className="p-2.5">Automatic security patches</td></tr>
                      <tr><td className="p-2.5">Encryption</td><td className="p-2.5">Let&apos;s Encrypt</td><td className="p-2.5">90-day certs, auto-renewal</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-medium">SSH Hardening Parameters</h3>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`PermitRootLogin no
PasswordAuthentication no
PubkeyAuthentication yes
MaxAuthTries 3
AllowUsers deploy`}
                </pre>

                <h3 className="text-lg font-medium">fail2ban Configuration</h3>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`[sshd]
enabled = true
maxretry = 3
bantime = 3600
findtime = 600`}
                </pre>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">5. Production Validation</h2>
                <h3 className="text-lg font-medium">Tests Performed</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-primary/10">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-2.5">Test</th>
                        <th className="text-left p-2.5">Method</th>
                        <th className="text-left p-2.5">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Server reboot persistence</td><td className="p-2.5">sudo reboot followed by SSH</td><td className="p-2.5">✅ PM2 auto-restart verified</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Process crash recovery</td><td className="p-2.5">kill -9 &lt;node-pid&gt;</td><td className="p-2.5">✅ PM2 respawned within 2s</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Nginx auto-start</td><td className="p-2.5">Server reboot check</td><td className="p-2.5">✅ Nginx active post-reboot</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">SSL auto-renewal</td><td className="p-2.5">certbot renew --dry-run</td><td className="p-2.5">✅ Successful</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Firewall rules</td><td className="p-2.5">nmap -p 22,80,443 from external</td><td className="p-2.5">✅ Only specified ports open</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">DNS resolution</td><td className="p-2.5">dig guidra.tech</td><td className="p-2.5">✅ Correct A record</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Reverse proxy</td><td className="p-2.5">Direct port 3000 vs 443</td><td className="p-2.5">✅ Headers preserved</td></tr>
                      <tr><td className="p-2.5">Health endpoint</td><td className="p-2.5">Continuous monitoring</td><td className="p-2.5">✅ 200 OK response</td></tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-medium">Logging Infrastructure</h3>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`/var/www/guidra/logs/      # Application logs (out/err/combined)
/var/log/nginx/            # Web server access/error logs
/var/log/fail2ban.log      # Intrusion attempts
/var/log/auth.log          # Authentication events`}
                </pre>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">6. Deployment Workflow</h2>
                <h3 className="text-lg font-medium">Simple, Reliable Deployment</h3>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`# Local development
git add .
git commit -m "feature update"
git push

# Server deployment (single command)
ssh deploy@guidra.tech './deploy-guidra.sh'`}
                </pre>

                <h3 className="text-lg font-medium">Deploy Script Logic</h3>
                <pre className="bg-muted/50 border border-primary/10 rounded-lg p-4 overflow-x-auto text-sm">
{`cd /var/www/guidra/current
git pull
npm ci --only=production || npm install --production
pm2 restart guidra-api --update-env`}
                </pre>

                <p className="text-gray-700 dark:text-gray-300">
                  <span className="font-medium">CI/CD Philosophy:</span> Manual trigger with automation-balance of control and efficiency for solo development.
                </p>

   <p className="text-gray-700 dark:text-gray-300">
         Deployment is triggered manually from the local machine using SSH and a deployment script.
                </p>

                
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">7. Key Lessons &amp; Engineering Insights</h2>
                <div className="space-y-4 text-gray-700 dark:text-gray-300">
                  <div>
                    <h3 className="text-lg font-medium">Technical Mastery Gained</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li><span className="font-medium">Network layering:</span> NSG vs UFW vs application-level filtering</li>
                      <li><span className="font-medium">DNS mechanics:</span> Propagation, TTL, record types</li>
                      <li><span className="font-medium">Socket binding:</span> localhost vs 0.0.0.0 implications</li>
                      <li><span className="font-medium">Process management:</span> PM2&apos;s role in production reliability</li>
                      <li><span className="font-medium">Configuration management:</span> Never edit original config files</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium">Operational Wisdom</h3>
                    <ul className="list-disc pl-5 mt-1 space-y-1">
                      <li>Always test security features with backup access</li>
                      <li>Document recovery procedures before needing them</li>
                      <li>Monitor logs before monitoring metrics</li>
                      <li>Simple automation beats complex tooling</li>
                    </ul>
                  </div>

                  <blockquote className="border-l-2 border-primary/30 pl-4 italic text-gray-700 dark:text-gray-300">
                    &quot;The day I banned myself from my own server taught me more about fail2ban, Azure recovery, and SSH than any tutorial could.&quot;
                  </blockquote>
                </div>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">8. Future Improvements</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-primary/10">
                    <thead>
                      <tr className="border-b border-primary/10">
                        <th className="text-left p-2.5">Priority</th>
                        <th className="text-left p-2.5">Improvement</th>
                        <th className="text-left p-2.5">Rationale</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-primary/10"><td className="p-2.5">High</td><td className="p-2.5">Automated backups to S3</td><td className="p-2.5">Data durability</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">High</td><td className="p-2.5">Rate limiting implementation</td><td className="p-2.5">API abuse prevention</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Medium</td><td className="p-2.5">PM2 monitoring dashboard</td><td className="p-2.5">Visual metrics</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Medium</td><td className="p-2.5">GitHub Actions CI/CD</td><td className="p-2.5">Fully automated deploys</td></tr>
                      <tr className="border-b border-primary/10"><td className="p-2.5">Low</td><td className="p-2.5">Docker containerization</td><td className="p-2.5">Environment consistency</td></tr>
                      <tr><td className="p-2.5">Low</td><td className="p-2.5">Multi-instance scaling</td><td className="p-2.5">Horizontal scalability</td></tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">Hosted Domains</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  These endpoints were previously hosted as part of the deployment. They are shown here as deployment references rather than active live services.
                </p>
                <div className="space-y-3 text-gray-700 dark:text-gray-300">
                  <p>
                    <span className="font-medium">Frontend:</span> previously hosted at https://guidra.tech
                  </p>
                  <p>
                    <span className="font-medium">Backend API:</span> previously hosted at https://api.guidra.tech
                  </p>
                  <p>
                    <span className="font-medium">Health Endpoint:</span> previously hosted at https://api.guidra.tech/health
                  </p>
                </div>
              </section>

              <section className="space-y-4 border-t border-primary/10 pt-8">
                <h2 className="text-2xl font-semibold">9. Conclusion</h2>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  This deployment transformed a fresh Azure VM into a production-tested backend environment that hosted the Guidra API on custom domains during the deployment period. The implementation encompasses security hardening, reverse proxy configuration, SSL termination, process management, and cloud database integration-all providing a reliable and maintainable production setup.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  The experience provided invaluable hands-on learning in system administration, networking, and DevOps that textbooks cannot replicate. From recovering from self-inflicted SSH bans to debugging Nginx listen directives, each challenge reinforced practical engineering skills.
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-medium">The experience provided hands-on learning in system administration, networking, and DevOps beyond textbook environments.</span>
                </p>
              </section>

              <section className="space-y-3 border-t border-primary/10 pt-8">
                <h3 className="text-xl font-semibold">Engineering Competencies Demonstrated</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700 dark:text-gray-300">
                  <li>Linux System Administration</li>
                  <li>Cloud Infrastructure (Azure)</li>
                  <li>Network Security (NSG, UFW, fail2ban)</li>
                  <li>Web Server Configuration (Nginx)</li>
                  <li>Process Management (PM2)</li>
                  <li>Database Integration (MongoDB Atlas)</li>
                  <li>SSL/TLS Implementation</li>
                  <li>DNS Configuration</li>
                  <li>Deployment Automation</li>
                  <li>Incident Recovery</li>
                </ul>
              </section>

              <footer className="pt-2 space-y-2 text-gray-700 dark:text-gray-300">
                <p className="italic">&quot;Documentation is the difference between experience and expertise.&quot;</p>
                <p className="font-medium">— Guganraj Rengaraju</p>
              </footer>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CaseStudyPage;
