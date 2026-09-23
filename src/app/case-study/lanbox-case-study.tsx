const sectionClass = "space-y-4 border-t border-primary/10 pt-8";
const bodyClass = "text-sm sm:text-base leading-relaxed text-secondary";
const listClass =
  "list-none pl-0 sm:list-disc sm:pl-5 space-y-1 text-sm sm:text-base leading-relaxed text-secondary";
const headingClass = "text-lg sm:text-xl font-semibold text-primary";

const LanBoxCaseStudy = () => (
  <div className="space-y-10">
    <section className={sectionClass}>
      <h2 className={headingClass}>Executive Summary</h2>

      <p className={bodyClass}>
        LANBox is a self-hosted LAN file-sharing and file-management platform
        designed to allow devices on the same network to browse, upload,
        download, and manage files through a web browser without requiring a
        cloud storage service.
      </p>

      <p className={bodyClass}>
        The project was built as a practical systems and DevOps exercise,
        focusing on Linux deployment, Docker containerization, networking,
        firewall configuration, pre-built container distribution, and
        deployment automation.
      </p>

      <p className={bodyClass}>
        <span className="font-semibold text-primary">
          Technologies Used:
        </span>{" "}
        Linux, Docker, Docker Compose, Node.js, React, Nginx, GitHub Container
        Registry (GHCR), firewalld
      </p>

      <div>
        <p className="mb-2 text-sm sm:text-base font-semibold text-primary">
          Key Highlights:
        </p>

        <ul className={listClass}>
          <li>Self-hosted file management over a private LAN</li>
          <li>Browser-based access from phones, laptops, and other LAN devices</li>
          <li>Containerized frontend and backend using Docker</li>
          <li>Pre-built Docker images distributed through GHCR</li>
          <li>Automated Linux installation without requiring the source repository</li>
          <li>Deployed alongside another Docker Compose application on the same server</li>
        </ul>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>1. System Architecture</h2>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`LAN Device → Linux Server → Docker Compose → Nginx → LANBox Backend → Filesystem`}
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
            <tr className="border-b border-primary/10">
              <td className="p-2.5">Client</td>
              <td className="p-2.5">Web Browser</td>
              <td className="p-2.5">
                Access files and interact with LANBox
              </td>
            </tr>

            <tr className="border-b border-primary/10">
              <td className="p-2.5">Network</td>
              <td className="p-2.5">LAN + firewalld</td>
              <td className="p-2.5">
                Provides private network access to the application
              </td>
            </tr>

            <tr className="border-b border-primary/10">
              <td className="p-2.5">Host</td>
              <td className="p-2.5">Linux Server</td>
              <td className="p-2.5">
                Runs and manages the LANBox deployment
              </td>
            </tr>

            <tr className="border-b border-primary/10">
              <td className="p-2.5">Frontend</td>
              <td className="p-2.5">Docker + Nginx</td>
              <td className="p-2.5">
                Serves the web interface
              </td>
            </tr>

            <tr className="border-b border-primary/10">
              <td className="p-2.5">Backend</td>
              <td className="p-2.5">Node.js</td>
              <td className="p-2.5">
                Handles file and folder operations
              </td>
            </tr>

            <tr>
              <td className="p-2.5">Storage</td>
              <td className="p-2.5">Linux Filesystem</td>
              <td className="p-2.5">
                Stores files and folders managed through LANBox
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>2. Application Design</h2>

      <p className={bodyClass}>
        LANBox provides a browser-based interface for interacting with files
        stored on the Linux server. The application separates the frontend
        interface from the backend responsible for filesystem operations.
      </p>

      <div>
        <p className="mb-2 text-sm sm:text-base font-semibold text-primary">
          Core functionality:
        </p>

        <ul className={listClass}>
          <li>Browse files and folders</li>
          <li>Create folders</li>
          <li>Upload files</li>
          <li>Download files</li>
          <li>Delete files and folders</li>
          <li>Browse images, videos, music, and other file types</li>
          <li>Access the application from multiple devices on the LAN</li>
        </ul>
      </div>

      <p className={bodyClass}>
        The design keeps the client devices simple: users only need a modern
        web browser. The Linux server handles the application runtime and
        filesystem access.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>3. Docker Deployment</h2>

      <p className={bodyClass}>
        LANBox was containerized into separate frontend and backend services.
        Docker Compose is used to manage the application as a single
        deployment unit.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`LANBox
├── frontend container
│   └── Nginx
│
└── backend container
    └── Node.js
        └── Linux filesystem`}
      </pre>

      <ul className={listClass}>
        <li>
          Frontend image:{" "}
          <span className="font-semibold text-primary">
            ghcr.io/mrtuxcoder/lanbox-client:latest
          </span>
        </li>

        <li>
          Backend image:{" "}
          <span className="font-semibold text-primary">
            ghcr.io/mrtuxcoder/lanbox-server:latest
          </span>
        </li>

        <li>Frontend exposed on port 80</li>
        <li>Backend runs internally on port 3000</li>
        <li>Docker Compose manages both services together</li>
      </ul>

      <p className={bodyClass}>
        Using pre-built images means the production server does not need the
        LANBox source code or a local build environment to run the application.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>4. LAN Networking &amp; Firewall</h2>

      <p className={bodyClass}>
        LANBox was designed primarily for private network access. The Linux
        server exposes the frontend through port 80, allowing other devices
        connected to the same network to open the application directly using
        the server&apos;s LAN IP address.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`Phone / Laptop
      │
      │ HTTP :80
      ▼
Linux Server
      │
      ▼
LANBox Frontend
      │
      ▼
LANBox Backend
      │
      ▼
Filesystem`}
      </pre>

      <ul className={listClass}>
        <li>Configured Linux firewall rules for LANBox network access</li>
        <li>Frontend exposed through TCP port 80</li>
        <li>Backend remains an internal application service</li>
        <li>LAN devices can access LANBox without installing a client application</li>
        <li>Tested access from mobile and other connected devices</li>
      </ul>

      <p className={bodyClass}>
        This deployment also provided practical experience with the difference
        between an application listening on a server and a firewall allowing
        other machines to reach that service.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>5. Automated Linux Installation</h2>

      <p className={bodyClass}>
        A major DevOps-focused part of LANBox was the creation of an automated
        installation script. The goal was to make deployment possible on a
        fresh Linux machine without requiring the user to clone the LANBox
        source repository.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`Fresh Linux Machine
        │
        ▼
Verify / Install Docker
        │
        ▼
Pull LANBox Images from GHCR
        │
        ▼
Configure Deployment
        │
        ▼
Docker Compose
        │
        ▼
LANBox Running
        │
        ▼
Open LAN IP in Browser`}
      </pre>

      <div>
        <p className="mb-2 text-sm sm:text-base font-semibold text-primary">
          Installation workflow:
        </p>

        <ul className={listClass}>
          <li>Prepare the Linux environment</li>
          <li>Verify or install Docker dependencies</li>
          <li>Pull pre-built LANBox images from GHCR</li>
          <li>Configure the required deployment environment</li>
          <li>Start the application using Docker Compose</li>
          <li>Expose LANBox through the configured LAN interface</li>
          <li>Allow access through the required firewall configuration</li>
        </ul>
      </div>

      <p className={bodyClass}>
        This changes LANBox from simply being a project that can be deployed
        manually into a repeatable self-hosting deployment workflow.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>6. Running Multiple Services on One Server</h2>

      <p className={bodyClass}>
        LANBox was deployed on the same Linux homelab server that also runs
        Chronicle. The two applications use separate Docker Compose projects
        and expose different frontend ports.
      </p>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`Linux Homelab
│
├── Chronicle Compose Project
│   ├── Frontend → :8080
│   ├── Backend
│   └── MongoDB
│
└── LANBox Compose Project
    ├── Frontend → :80
    └── Backend → internal :3000`}
      </pre>

      <p className={bodyClass}>
        This deployment required understanding port publishing, container
        networking, service isolation, and how multiple Compose applications
        can coexist on the same Linux host.
      </p>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>7. Deployment Challenges</h2>

      <div className="space-y-5 text-sm sm:text-base leading-relaxed text-secondary">
        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">
            LAN Connectivity
          </h3>

          <p>
            Access from another device required the application to be reachable
            through the server&apos;s LAN interface rather than only through
            localhost. Firewall and port configuration were part of validating
            this behavior.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">
            Multiple Docker Applications
          </h3>

          <p>
            LANBox and Chronicle needed to run simultaneously on the same
            server. Different published ports and separate Compose projects
            allowed both deployments to operate without conflicting with each
            other.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">
            Source-Free Deployment
          </h3>

          <p>
            The installation workflow was designed around published container
            images rather than requiring a source-code checkout on the target
            machine. This made the deployment process smaller and more
            reproducible.
          </p>
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-semibold text-primary">
            Deployment Automation
          </h3>

          <p>
            Replacing multiple manual setup steps with a single installation
            workflow required thinking about dependencies, Docker availability,
            image distribution, configuration, and service startup as one
            deployment process.
          </p>
        </div>
      </div>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>8. Deployment Validation</h2>

      <ul className={listClass}>
        <li>LANBox frontend successfully running on port 80</li>
        <li>LANBox backend running as a separate Docker container</li>
        <li>Pre-built frontend and backend images available through GHCR</li>
        <li>LANBox accessible from a mobile device on the same network</li>
        <li>File browsing and management operations tested through the browser</li>
        <li>LANBox and Chronicle verified running simultaneously on the same server</li>
        <li>Docker Compose deployment verified on the Linux homelab</li>
      </ul>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>9. DevOps &amp; Systems Lessons</h2>

      <ul className={listClass}>
        <li>
          <span className="font-semibold text-primary">
            Linux Administration:
          </span>{" "}
          Running a real service on a Linux host requires understanding
          processes, ports, networking, permissions, and system services.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Containerization:
          </span>{" "}
          Docker provides a consistent packaging and deployment environment for
          the application.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Networking:
          </span>{" "}
          Application connectivity depends on interfaces, ports, Docker
          networking, and host firewall rules working together.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Image Distribution:
          </span>{" "}
          GHCR allows deployment machines to consume pre-built application
          artifacts without requiring the source repository.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Infrastructure Automation:
          </span>{" "}
          Installation scripts turn a collection of manual deployment steps
          into a repeatable workflow.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Self-Hosting:
          </span>{" "}
          LANBox demonstrates how an application can be deployed and operated
          independently on user-controlled infrastructure.
        </li>

        <li>
          <span className="font-semibold text-primary">
            Troubleshooting:
          </span>{" "}
          Debugging LAN connectivity, firewall rules, Docker services, and
          application access provided practical systems-level experience.
        </li>
      </ul>
    </section>

    <section className={sectionClass}>
      <h2 className={headingClass}>10. Final Deployment</h2>

      <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/50 p-4 text-sm leading-relaxed text-secondary">
{`Source Code
     │
     ▼
Docker Build
     │
     ▼
GitHub Container Registry
     │
     ▼
Linux Installation Script
     │
     ▼
Docker Compose
     │
     ▼
Linux Homelab
     │
     ├── Firewall / LAN Networking
     │
     ▼
LANBox
     │
     ▼
Phone / Laptop / PC`}
      </pre>

      <p className={bodyClass}>
        LANBox evolved from a file-management application into a practical
        self-hosting project covering application packaging, container
        deployment, Linux administration, LAN networking, firewall
        configuration, container registries, and installation automation.
      </p>
    </section>

    <footer className="border-t border-primary/10 pt-8 text-sm sm:text-base leading-relaxed text-secondary">
      <p className="italic">
        &quot;Build it, deploy it, break it, understand it.&quot;
      </p>

      <p className="mt-2 font-semibold text-primary">
        — Guganraj Rengaraju
      </p>
    </footer>
  </div>
);

export default LanBoxCaseStudy;