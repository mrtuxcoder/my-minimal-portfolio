import Image from "next/image";

const sectionClass = "space-y-4 border-t border-primary/10 pt-8";

const bodyClass = "text-sm sm:text-base leading-relaxed text-secondary";

const listClass =
    "list-disc pl-5 space-y-1.5 text-sm sm:text-base leading-relaxed text-secondary";

const headingClass = "text-lg sm:text-2xl font-semibold text-primary";

type CaseStudyImageProps = {
    src?: string;
    alt: string;
};

/**
 * Keeps visuals optional so sections without an asset retain their current
 * text-only layout. Add an image path to a section when a matching visual is
 * available.
 */
const CaseStudyImage = ({ src, alt }: CaseStudyImageProps) => {
    if (!src) return null;

    return (
        <figure className="overflow-hidden rounded-lg border border-primary/10 bg-muted/40">
            <Image
                src={src}
                alt={alt}
                width={1920}
                height={1080}
                className="h-auto w-full"
            />
        </figure>
    );
};

const ChronicleCaseStudy = () => (
    <div className="space-y-10">

        {/* 1. Overview */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                1. From Application to Deployment
            </h2>

            <p className={bodyClass}>
                Chronicle started as a full-stack blogging platform built with
                React, Node.js, Express, and MongoDB. The application follows a
                simple publishing model: anyone can read published articles,
                while only the authenticated Chronicle administrator can create,
                edit, publish, and delete articles.
            </p>

            <p className={bodyClass}>
                Once the application was working locally, I wanted to go beyond
                application development and learn how to package, deploy, update,
                troubleshoot, and recover the entire system on a Linux homelab
                server.
            </p>

            <CaseStudyImage
                src="/images/case-study/chronicle/chronicle-app.png"
                alt="Chronicle blogging application running in the browser"
            />

            <div>
                <p className="mb-2 text-sm sm:text-base font-semibold text-primary">
                    Final deployment stack:
                </p>

                <ul className={listClass}>
                    <li>React frontend served by Nginx</li>
                    <li>Node.js + Express backend API</li>
                    <li>MongoDB running as a container</li>
                    <li>Docker Compose for service orchestration</li>
                    <li>GitHub Actions for CI/CD</li>
                    <li>GitHub Container Registry for application images</li>
                    <li>Tailscale for private server connectivity and deployment</li>
                    <li>Cloudflare Tunnel for public HTTPS access</li>
                    <li>Docker named volume for persistent MongoDB data</li>
                </ul>
            </div>
        </section>

        {/* 2. Architecture */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                2. The Final Architecture
            </h2>

            <p className={bodyClass}>
                The deployment is defined by a Docker Compose configuration.
                The Linux homelab server runs the frontend, backend, and
                MongoDB as separate containers. Public traffic reaches the
                homelab through Cloudflare Tunnel.
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`                         Public Internet
                               │
                               ▼
                         Cloudflare
                               │
                      Cloudflare Tunnel
                               │
                               ▼
                         cloudflared
                               │
                               ▼
                        Linux Homelab
                               │
                        Docker Compose
                               │
                        ┌──────┴──────┐
                        │             │
                    frontend       backend
                    Nginx :80     Node.js :5000
                        │             │
                        │             ▼
                        │          MongoDB
                        │
                        └── /api/* → backend`}
            </pre>

            <div className="overflow-x-auto">
                <table className="w-full text-sm text-secondary">
                    <thead>
                        <tr className="border-b border-primary/10 text-left text-primary">
                            <th className="p-2.5 font-semibold">Service</th>
                            <th className="p-2.5 font-semibold">Technology</th>
                            <th className="p-2.5 font-semibold">Responsibility</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr className="border-b border-primary/10">
                            <td className="p-2.5">frontend</td>
                            <td className="p-2.5">React + Nginx</td>
                            <td className="p-2.5">
                                Serves the frontend and proxies API requests
                            </td>
                        </tr>

                        <tr className="border-b border-primary/10">
                            <td className="p-2.5">backend</td>
                            <td className="p-2.5">Node.js + Express</td>
                            <td className="p-2.5">
                                REST API, authentication, and application logic
                            </td>
                        </tr>

                        <tr>
                            <td className="p-2.5">mongodb</td>
                            <td className="p-2.5">MongoDB</td>
                            <td className="p-2.5">
                                Application and credential data
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>

        {/* 3. Docker */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                3. Containerizing the Application
            </h2>

            <p className={bodyClass}>
                Instead of installing the application runtime and dependencies
                directly on the server, I created Docker images for the frontend
                and backend. MongoDB runs from the official MongoDB image.
            </p>

            <p className={bodyClass}>
                Docker Compose defines how these services work together. The
                containers share a private Docker network and communicate using
                Compose service names instead of hard-coded container IP
                addresses.
            </p>

            <p className={bodyClass}>
                The frontend can reach the backend through the internal hostname{" "}
                <span className="font-semibold text-primary">backend</span>,
                while the backend reaches MongoDB through{" "}
                <span className="font-semibold text-primary">mongodb</span>.
            </p>

            <p className={bodyClass}>
                MongoDB uses a named Docker volume mounted at{" "}
                <span className="font-semibold text-primary">/data/db</span>.
                This keeps database data independent from the lifecycle of the
                MongoDB container, allowing the container to be recreated without
                losing the stored data.
            </p>
             <CaseStudyImage
                src="/images/case-study/chronicle/chronicle-terminal.png"
                alt="Chronicle Docker containers in the terminal"
            />
        </section>

        {/* 4. Nginx */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                4. Nginx as the Application Entry Point
            </h2>

            <p className={bodyClass}>
                Nginx runs inside the frontend container and acts as the local
                entry point for Chronicle. It serves the compiled React
                application and forwards requests under{" "}
                <span className="font-semibold text-primary">/api/</span> to
                the backend service.
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`Cloudflare Tunnel
        │
        ▼
    Nginx :80
        │
        ├── /       → React application
        │
        └── /api/*  → backend:5000`}
            </pre>

            <p className={bodyClass}>
                This gives the application a single internal entry point. The
                browser does not need to know the backend container's internal
                address, while Docker's internal DNS handles service discovery
                between containers.
            </p>
        </section>

        {/* 5. CI/CD */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                5. CI/CD with GitHub Actions
            </h2>

            <p className={bodyClass}>
                After the Docker deployment was working, I changed the workflow
                so the server no longer needed the frontend and backend source
                directories. GitHub Actions became responsible for building and
                publishing the application images.
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`git push
   │
   ▼
GitHub Actions
   │
   ├── Build frontend image
   ├── Build backend image
   └── Publish images
          │
          ▼
        GHCR
          │
          ▼
   Homelab server
          │
          ├── docker compose pull
          └── docker compose up -d`}
            </pre>

            <p className={bodyClass}>
                The application images are published to GitHub Container Registry.
                During deployment, the server pulls the new images and recreates
                the services using the Docker Compose configuration already
                present on the server.
            </p>

            <p className={bodyClass}>
                This separates the application source code from the deployment
                environment. The server needs the Compose configuration,
                environment configuration, Docker, and the required secrets,
                while the application itself is packaged inside the images.
            </p>

            <CaseStudyImage
                src="/images/case-study/chronicle/chronicle-workflow.png"
                alt="Chronicle CI/CD workflow from GitHub Actions to deployment"
            />
        </section>

        {/* 6. Cloudflare Tunnel */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                6. Public Access with Cloudflare Tunnel
            </h2>

            <p className={bodyClass}>
                Chronicle runs on a Linux homelab server and is made publicly
                accessible through Cloudflare Tunnel. The{" "}
                <span className="font-semibold text-primary">cloudflared</span>{" "}
                daemon runs on the homelab and maintains an outbound connection
                to Cloudflare, allowing the application to be accessed from the
                internet without directly exposing the homelab server.
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`Internet
    │
    ▼
Cloudflare
    │
    │ Cloudflare Tunnel
    ▼
cloudflared
    │
    ▼
Chronicle frontend :80
    │
    ▼
Nginx
    │
    └── /api/* → backend:5000`}
            </pre>

            <p className={bodyClass}>
                The public application is available at{" "}
                <span className="font-semibold text-primary">
                    chronicle.guganraj.me
                </span>{" "}
                through Cloudflare-managed HTTPS. The homelab does not require
                an inbound public port to be opened for the application.
            </p>

            <p className={bodyClass}>
                Tailscale remains separate from the public access path and is used
                for private server connectivity and deployment access.
            </p>
        </section>

        {/* 7. Admin credentials */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                7. Admin Credential Initialization
            </h2>

            <p className={bodyClass}>
                Chronicle uses an admin-only publishing model. Public visitors
                can read published articles, while only the authenticated
                administrator can create, edit, publish, or delete articles.
            </p>

            <p className={bodyClass}>
                The backend includes a credential-generation script that creates
                the administrator credential directly in MongoDB. The script
                accepts a username, password, and optional role, hashes the
                password with bcrypt, and stores the resulting credential.
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`node scripts/createCredential.js <username> <password> [role]`}
            </pre>

            <p className={bodyClass}>
                Because the script is included in the backend image, it can be
                executed inside the backend container on the server. The script
                can then communicate with MongoDB through the Docker Compose
                network using the MongoDB service name.
            </p>
        </section>

        {/* 8. Deployment failure */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                8. Debugging a Real Deployment Failure
            </h2>

            <p className={bodyClass}>
                One automated deployment exposed a Docker networking problem.
                The frontend container exited because Nginx could not resolve
                the backend service:
            </p>

            <pre className="overflow-x-auto rounded-lg border border-primary/10 bg-muted/40 p-4 text-sm leading-relaxed text-secondary">
{`host not found in upstream "backend"`}
            </pre>

            <p className={bodyClass}>
                I inspected the actual Docker state using commands such as{" "}
                <span className="font-semibold text-primary">
                    docker inspect
                </span>
                ,{" "}
                <span className="font-semibold text-primary">
                    docker network inspect
                </span>
                , and{" "}
                <span className="font-semibold text-primary">
                    docker compose config
                </span>.
            </p>

            <p className={bodyClass}>
                The investigation showed that the backend was attached to the
                expected{" "}
                <span className="font-semibold text-primary">
                    chronicle_default
                </span>{" "}
                network, while the failed frontend container was not attached to
                a Docker network.
            </p>

            <p className={bodyClass}>
                Recreating the frontend through Docker Compose attached it to the
                correct network. Docker's internal DNS could then resolve{" "}
                <span className="font-semibold text-primary">backend</span>,
                Nginx started successfully, and the application became available.
            </p>
        </section>

        {/* 9. Recovery */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                9. Deployment and Recovery Testing
            </h2>

            <p className={bodyClass}>
                After deployment was working, I tested the system beyond a normal
                successful deployment. The server was rebooted to verify that
                Docker services could return to a working state without manually
                rebuilding the application.
            </p>

            <p className={bodyClass}>
                The MongoDB named volume preserved database data across container
                recreation, while Docker and Compose restored the application
                services after the server came back online.
            </p>

            <p className={bodyClass}>
                This validated an important part of the deployment: the system
                was not only able to run successfully, but could also recover
                after a server restart.
            </p>
        </section>

        {/* 10. Lessons */}
        <section className={sectionClass}>
            <h2 className={headingClass}>
                10. What I Learned
            </h2>

            <ul className={listClass}>
                <li>
                    <span className="font-semibold text-primary">
                        Docker images:
                    </span>{" "}
                    package application dependencies and runtime requirements so
                    the server does not need to reproduce the development
                    environment.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Docker Compose:
                    </span>{" "}
                    defines how containers, networks, volumes, and service
                    dependencies work together.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Container networking:
                    </span>{" "}
                    service names such as <code>backend</code> and{" "}
                    <code>mongodb</code> can be resolved through Docker's
                    internal DNS.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Persistent storage:
                    </span>{" "}
                    databases need storage that is independent from the lifecycle
                    of their containers.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        CI/CD:
                    </span>{" "}
                    application images can be built and published automatically,
                    allowing the server to deploy new versions without copying
                    source code manually.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Cloudflare Tunnel:
                    </span>{" "}
                    a homelab service can be made publicly accessible through an
                    outbound tunnel without directly exposing the server to
                    inbound internet traffic.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Debugging:
                    </span>{" "}
                    inspecting the actual container and network state is more
                    reliable than assuming the current Docker state matches the
                    intended Compose configuration.
                </li>

                <li>
                    <span className="font-semibold text-primary">
                        Reliability:
                    </span>{" "}
                    reboot and recovery testing can reveal deployment problems
                    that are invisible during a normal successful deployment.
                </li>
            </ul>
        </section>

        <footer className="border-t border-primary/10 pt-8 text-sm sm:text-base leading-relaxed text-secondary">
            <p>
                Chronicle started as a blogging application, but the deployment
                process became the more valuable part of the project. It provided
                a practical environment for understanding how application code,
                containers, networking, CI/CD, storage, Cloudflare, and a Linux
                server fit together as one system.
            </p>
        </footer>
    </div>
);

export default ChronicleCaseStudy;
